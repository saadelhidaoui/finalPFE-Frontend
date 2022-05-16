import {Component, OnInit} from '@angular/core';
import {EnfantService} from '../../../../../../controller/service/Enfant.service';
import {EnfantVo} from '../../../../../../controller/model/Enfant.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';

@Component({
  selector: 'app-enfant-edit-moderateur',
  templateUrl: './enfant-edit-moderateur.component.html',
  styleUrls: ['./enfant-edit-moderateur.component.css']
})
export class EnfantEditModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private enfantService: EnfantService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private adherentService: AdherentService
 ,       private qualiteService: QualiteService
) {
}

// methods
ngOnInit(): void {
    this.selectedQualite = new QualiteVo();
    this.qualiteService.findAll().subscribe((data) => this.qualites = data);
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedEnfant.dateNaissance = DateUtils.toDate(this.selectedEnfant.dateNaissance);
            this.selectedEnfant.dateArchivage = DateUtils.toDate(this.selectedEnfant.dateArchivage);
            this.selectedEnfant.dateCreation = DateUtils.toDate(this.selectedEnfant.dateCreation);
    this.enfantService.edit().subscribe(enfant=>{
    const myIndex = this.enfants.findIndex(e => e.id === this.selectedEnfant.id);
    this.enfants[myIndex] = this.selectedEnfant;
    this.editEnfantDialog = false;
    this.selectedEnfant = new EnfantVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatequalite(qualite: string) {
                      const isPermistted = await this.roleService.isPermitted('Qualite', 'add');
                       if(isPermistted){
         this.selectedQualite = new QualiteVo();
        this.createQualiteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateadherent(adherent: string) {
                      const isPermistted = await this.roleService.isPermitted('Adherent', 'add');
                       if(isPermistted){
         this.selectedAdherent = new AdherentVo();
        this.createAdherentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEnfantDialog  = false;
}

// getters and setters

get enfants(): Array<EnfantVo> {
    return this.enfantService.enfants;
       }
set enfants(value: Array<EnfantVo>) {
        this.enfantService.enfants = value;
       }

 get selectedEnfant(): EnfantVo {
           return this.enfantService.selectedEnfant;
       }
    set selectedEnfant(value: EnfantVo) {
        this.enfantService.selectedEnfant = value;
       }

   get editEnfantDialog(): boolean {
           return this.enfantService.editEnfantDialog;

       }
    set editEnfantDialog(value: boolean) {
        this.enfantService.editEnfantDialog = value;
       }

       get selectedQualite(): QualiteVo {
           return this.qualiteService.selectedQualite;
       }
      set selectedQualite(value: QualiteVo) {
        this.qualiteService.selectedQualite = value;
       }
       get qualites(): Array<QualiteVo> {
           return this.qualiteService.qualites;
       }
       set qualites(value: Array<QualiteVo>) {
        this.qualiteService.qualites = value;
       }
       get createQualiteDialog(): boolean {
           return this.qualiteService.createQualiteDialog;
       }
      set createQualiteDialog(value: boolean) {
        this.qualiteService.createQualiteDialog= value;
       }
       get selectedAdherent(): AdherentVo {
           return this.adherentService.selectedAdherent;
       }
      set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }
       get adherents(): Array<AdherentVo> {
           return this.adherentService.adherents;
       }
       set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }
       get createAdherentDialog(): boolean {
           return this.adherentService.createAdherentDialog;
       }
      set createAdherentDialog(value: boolean) {
        this.adherentService.createAdherentDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
