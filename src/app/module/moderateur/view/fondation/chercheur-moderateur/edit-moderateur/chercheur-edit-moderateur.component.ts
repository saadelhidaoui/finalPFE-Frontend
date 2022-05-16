import {Component, OnInit} from '@angular/core';
import {ChercheurService} from '../../../../../../controller/service/Chercheur.service';
import {ChercheurVo} from '../../../../../../controller/model/Chercheur.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import {ProfilService} from '../../../../../../controller/service/Profil.service';
import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
import {SituationModerateurService} from '../../../../../../controller/service/SituationModerateur.service';

@Component({
  selector: 'app-chercheur-edit-moderateur',
  templateUrl: './chercheur-edit-moderateur.component.html',
  styleUrls: ['./chercheur-edit-moderateur.component.css']
})
export class ChercheurEditModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private profilService: ProfilService
 ,       private situationModerateurService: SituationModerateurService
) {
}

// methods
ngOnInit(): void {
    this.selectedSituationModerateur = new SituationModerateurVo();
    this.situationModerateurService.findAll().subscribe((data) => this.situationModerateurs = data);
    this.selectedProfil = new ProfilVo();
    this.profilService.findAll().subscribe((data) => this.profils = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedChercheur.createdAt = DateUtils.toDate(this.selectedChercheur.createdAt);
            this.selectedChercheur.updatedAt = DateUtils.toDate(this.selectedChercheur.updatedAt);
    this.chercheurService.edit().subscribe(chercheur=>{
    const myIndex = this.chercheurs.findIndex(e => e.id === this.selectedChercheur.id);
    this.chercheurs[myIndex] = this.selectedChercheur;
    this.editChercheurDialog = false;
    this.selectedChercheur = new ChercheurVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatesituationModerateur(situationModerateur: string) {
                      const isPermistted = await this.roleService.isPermitted('SituationModerateur', 'add');
                       if(isPermistted){
         this.selectedSituationModerateur = new SituationModerateurVo();
        this.createSituationModerateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateprofil(profil: string) {
                      const isPermistted = await this.roleService.isPermitted('Profil', 'add');
                       if(isPermistted){
         this.selectedProfil = new ProfilVo();
        this.createProfilDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editChercheurDialog  = false;
}

// getters and setters

get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
       }
set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

 get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }

   get editChercheurDialog(): boolean {
           return this.chercheurService.editChercheurDialog;

       }
    set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog = value;
       }

       get selectedSituationModerateur(): SituationModerateurVo {
           return this.situationModerateurService.selectedSituationModerateur;
       }
      set selectedSituationModerateur(value: SituationModerateurVo) {
        this.situationModerateurService.selectedSituationModerateur = value;
       }
       get situationModerateurs(): Array<SituationModerateurVo> {
           return this.situationModerateurService.situationModerateurs;
       }
       set situationModerateurs(value: Array<SituationModerateurVo>) {
        this.situationModerateurService.situationModerateurs = value;
       }
       get createSituationModerateurDialog(): boolean {
           return this.situationModerateurService.createSituationModerateurDialog;
       }
      set createSituationModerateurDialog(value: boolean) {
        this.situationModerateurService.createSituationModerateurDialog= value;
       }
       get selectedProfil(): ProfilVo {
           return this.profilService.selectedProfil;
       }
      set selectedProfil(value: ProfilVo) {
        this.profilService.selectedProfil = value;
       }
       get profils(): Array<ProfilVo> {
           return this.profilService.profils;
       }
       set profils(value: Array<ProfilVo>) {
        this.profilService.profils = value;
       }
       get createProfilDialog(): boolean {
           return this.profilService.createProfilDialog;
       }
      set createProfilDialog(value: boolean) {
        this.profilService.createProfilDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
