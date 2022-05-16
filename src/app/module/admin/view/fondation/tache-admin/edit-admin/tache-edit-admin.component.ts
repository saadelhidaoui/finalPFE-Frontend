import {Component, OnInit} from '@angular/core';
import {TacheService} from '../../../../../../controller/service/Tache.service';
import {TacheVo} from '../../../../../../controller/model/Tache.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
import {EtatTacheService} from '../../../../../../controller/service/EtatTache.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';

@Component({
  selector: 'app-tache-edit-admin',
  templateUrl: './tache-edit-admin.component.html',
  styleUrls: ['./tache-edit-admin.component.css']
})
export class TacheEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private tacheService: TacheService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etatTacheService: EtatTacheService
 ,       private moderateurService: ModerateurService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtatTache = new EtatTacheVo();
    this.etatTacheService.findAll().subscribe((data) => this.etatTaches = data);
    this.selectedModerateur = new ModerateurVo();
    this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedTache.dateTache = DateUtils.toDate(this.selectedTache.dateTache);
    this.tacheService.edit().subscribe(tache=>{
    const myIndex = this.taches.findIndex(e => e.id === this.selectedTache.id);
    this.taches[myIndex] = this.selectedTache;
    this.editTacheDialog = false;
    this.selectedTache = new TacheVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetatTache(etatTache: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatTache', 'add');
                       if(isPermistted){
         this.selectedEtatTache = new EtatTacheVo();
        this.createEtatTacheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatemoderateur(moderateur: string) {
                      const isPermistted = await this.roleService.isPermitted('Moderateur', 'add');
                       if(isPermistted){
         this.selectedModerateur = new ModerateurVo();
        this.createModerateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editTacheDialog  = false;
}

// getters and setters

get taches(): Array<TacheVo> {
    return this.tacheService.taches;
       }
set taches(value: Array<TacheVo>) {
        this.tacheService.taches = value;
       }

 get selectedTache(): TacheVo {
           return this.tacheService.selectedTache;
       }
    set selectedTache(value: TacheVo) {
        this.tacheService.selectedTache = value;
       }

   get editTacheDialog(): boolean {
           return this.tacheService.editTacheDialog;

       }
    set editTacheDialog(value: boolean) {
        this.tacheService.editTacheDialog = value;
       }

       get selectedEtatTache(): EtatTacheVo {
           return this.etatTacheService.selectedEtatTache;
       }
      set selectedEtatTache(value: EtatTacheVo) {
        this.etatTacheService.selectedEtatTache = value;
       }
       get etatTaches(): Array<EtatTacheVo> {
           return this.etatTacheService.etatTaches;
       }
       set etatTaches(value: Array<EtatTacheVo>) {
        this.etatTacheService.etatTaches = value;
       }
       get createEtatTacheDialog(): boolean {
           return this.etatTacheService.createEtatTacheDialog;
       }
      set createEtatTacheDialog(value: boolean) {
        this.etatTacheService.createEtatTacheDialog= value;
       }
       get selectedModerateur(): ModerateurVo {
           return this.moderateurService.selectedModerateur;
       }
      set selectedModerateur(value: ModerateurVo) {
        this.moderateurService.selectedModerateur = value;
       }
       get moderateurs(): Array<ModerateurVo> {
           return this.moderateurService.moderateurs;
       }
       set moderateurs(value: Array<ModerateurVo>) {
        this.moderateurService.moderateurs = value;
       }
       get createModerateurDialog(): boolean {
           return this.moderateurService.createModerateurDialog;
       }
      set createModerateurDialog(value: boolean) {
        this.moderateurService.createModerateurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
