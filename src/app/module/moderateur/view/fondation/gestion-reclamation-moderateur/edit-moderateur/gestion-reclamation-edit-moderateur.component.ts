import {Component, OnInit} from '@angular/core';
import {GestionReclamationService} from '../../../../../../controller/service/GestionReclamation.service';
import {GestionReclamationVo} from '../../../../../../controller/model/GestionReclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';

@Component({
  selector: 'app-gestion-reclamation-edit-moderateur',
  templateUrl: './gestion-reclamation-edit-moderateur.component.html',
  styleUrls: ['./gestion-reclamation-edit-moderateur.component.css']
})
export class GestionReclamationEditModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private gestionReclamationService: GestionReclamationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private reclamationService: ReclamationService
 ,       private moderateurService: ModerateurService
) {
}

// methods
ngOnInit(): void {
    this.selectedModerateur = new ModerateurVo();
    this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
    this.selectedReclamation = new ReclamationVo();
    this.reclamationService.findAll().subscribe((data) => this.reclamations = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedGestionReclamation.dateTraitement = DateUtils.toDate(this.selectedGestionReclamation.dateTraitement);
    this.gestionReclamationService.edit().subscribe(gestionReclamation=>{
    const myIndex = this.gestionReclamations.findIndex(e => e.id === this.selectedGestionReclamation.id);
    this.gestionReclamations[myIndex] = this.selectedGestionReclamation;
    this.editGestionReclamationDialog = false;
    this.selectedGestionReclamation = new GestionReclamationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatereclamation(reclamation: string) {
                      const isPermistted = await this.roleService.isPermitted('Reclamation', 'add');
                       if(isPermistted){
         this.selectedReclamation = new ReclamationVo();
        this.createReclamationDialog = true;
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
    this.editGestionReclamationDialog  = false;
}

// getters and setters

get gestionReclamations(): Array<GestionReclamationVo> {
    return this.gestionReclamationService.gestionReclamations;
       }
set gestionReclamations(value: Array<GestionReclamationVo>) {
        this.gestionReclamationService.gestionReclamations = value;
       }

 get selectedGestionReclamation(): GestionReclamationVo {
           return this.gestionReclamationService.selectedGestionReclamation;
       }
    set selectedGestionReclamation(value: GestionReclamationVo) {
        this.gestionReclamationService.selectedGestionReclamation = value;
       }

   get editGestionReclamationDialog(): boolean {
           return this.gestionReclamationService.editGestionReclamationDialog;

       }
    set editGestionReclamationDialog(value: boolean) {
        this.gestionReclamationService.editGestionReclamationDialog = value;
       }

       get selectedReclamation(): ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
      set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }
       get reclamations(): Array<ReclamationVo> {
           return this.reclamationService.reclamations;
       }
       set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }
       get createReclamationDialog(): boolean {
           return this.reclamationService.createReclamationDialog;
       }
      set createReclamationDialog(value: boolean) {
        this.reclamationService.createReclamationDialog= value;
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
