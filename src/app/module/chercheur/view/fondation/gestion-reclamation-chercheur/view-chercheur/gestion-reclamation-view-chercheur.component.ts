import {Component, OnInit} from '@angular/core';
import {GestionReclamationService} from '../../../../../../controller/service/GestionReclamation.service';
import {GestionReclamationVo} from '../../../../../../controller/model/GestionReclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';

@Component({
  selector: 'app-gestion-reclamation-view-chercheur',
  templateUrl: './gestion-reclamation-view-chercheur.component.html',
  styleUrls: ['./gestion-reclamation-view-chercheur.component.css']
})
export class GestionReclamationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private gestionReclamationService: GestionReclamationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private reclamationService :ReclamationService
    ,private moderateurService :ModerateurService
) {
}

// methods
ngOnInit(): void {
    this.selectedModerateur = new ModerateurVo();
    this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
    this.selectedReclamation = new ReclamationVo();
    this.reclamationService.findAll().subscribe((data) => this.reclamations = data);
}

hideViewDialog(){
    this.viewGestionReclamationDialog  = false;
}

// getters and setters

get gestionReclamations(): Array<GestionReclamationVo> {
    return this.gestionReclamationService.gestionReclamations;
       }
set gestionReclamations(value: Array<GestionReclamationVo>) {
        this.gestionReclamationService.gestionReclamations = value;
       }

 get selectedGestionReclamation():GestionReclamationVo {
           return this.gestionReclamationService.selectedGestionReclamation;
       }
    set selectedGestionReclamation(value: GestionReclamationVo) {
        this.gestionReclamationService.selectedGestionReclamation = value;
       }

   get viewGestionReclamationDialog():boolean {
           return this.gestionReclamationService.viewGestionReclamationDialog;

       }
    set viewGestionReclamationDialog(value: boolean) {
        this.gestionReclamationService.viewGestionReclamationDialog= value;
       }

       get selectedReclamation():ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
      set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }
       get reclamations():Array<ReclamationVo> {
           return this.reclamationService.reclamations;
       }
       set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }
       get editReclamationDialog():boolean {
           return this.reclamationService.editReclamationDialog;
       }
      set editReclamationDialog(value: boolean) {
        this.reclamationService.editReclamationDialog= value;
       }
       get selectedModerateur():ModerateurVo {
           return this.moderateurService.selectedModerateur;
       }
      set selectedModerateur(value: ModerateurVo) {
        this.moderateurService.selectedModerateur = value;
       }
       get moderateurs():Array<ModerateurVo> {
           return this.moderateurService.moderateurs;
       }
       set moderateurs(value: Array<ModerateurVo>) {
        this.moderateurService.moderateurs = value;
       }
       get editModerateurDialog():boolean {
           return this.moderateurService.editModerateurDialog;
       }
      set editModerateurDialog(value: boolean) {
        this.moderateurService.editModerateurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
