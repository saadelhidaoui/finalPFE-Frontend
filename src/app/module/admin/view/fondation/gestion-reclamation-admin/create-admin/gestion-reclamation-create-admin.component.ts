import {Component, OnInit, Input} from '@angular/core';
import {GestionReclamationService} from '../../../../../../controller/service/GestionReclamation.service';
import {GestionReclamationVo} from '../../../../../../controller/model/GestionReclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';
@Component({
  selector: 'app-gestion-reclamation-create-admin',
  templateUrl: './gestion-reclamation-create-admin.component.html',
  styleUrls: ['./gestion-reclamation-create-admin.component.css']
})
export class GestionReclamationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validGestionReclamationModerateur = true;
   _validGestionReclamationReclamation = true;

    _validModerateurSituationModerateur = true;
    _validModerateurProfil = true;
    _validReclamationLibelle = true;
    _validReclamationDescription = true;
    _validReclamationAdherent = true;



constructor(private datePipe: DatePipe, private gestionReclamationService: GestionReclamationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private moderateurService :ModerateurService
,       private reclamationService :ReclamationService
) {

}


// methods
ngOnInit(): void {

    this.selectedModerateur = new ModerateurVo();
    this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
    this.selectedReclamation = new ReclamationVo();
    this.reclamationService.findAll().subscribe((data) => this.reclamations = data);
}




private setValidation(value : boolean){
    this.validGestionReclamationModerateur = value;
    this.validGestionReclamationReclamation = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.gestionReclamationService.save().subscribe(gestionReclamation=>{
       this.gestionReclamations.push({...gestionReclamation});
       this.createGestionReclamationDialog = false;
       this.submitted = false;
       this.selectedGestionReclamation = new GestionReclamationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateGestionReclamationModerateur();
this.validateGestionReclamationReclamation();

    }

private validateGestionReclamationModerateur(){
        if (this.stringUtilService.isEmpty(this.selectedGestionReclamation.moderateurVo)) {
            this.errorMessages.push('Moderateur non valide');
            this.validGestionReclamationModerateur = false;
        } else {
            this.validGestionReclamationModerateur = true;
        }
    }
private validateGestionReclamationReclamation(){
        if (this.stringUtilService.isEmpty(this.selectedGestionReclamation.reclamationVo)) {
            this.errorMessages.push('Reclamation non valide');
            this.validGestionReclamationReclamation = false;
        } else {
            this.validGestionReclamationReclamation = true;
        }
    }








//openPopup
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

hideCreateDialog(){
    this.createGestionReclamationDialog  = false;
    this.setValidation(true);
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

   get createGestionReclamationDialog(): boolean {
           return this.gestionReclamationService.createGestionReclamationDialog;

       }
    set createGestionReclamationDialog(value: boolean) {
        this.gestionReclamationService.createGestionReclamationDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validGestionReclamationModerateur(): boolean {
    return this._validGestionReclamationModerateur;
    }

    set validGestionReclamationModerateur(value: boolean) {
    this._validGestionReclamationModerateur = value;
    }
    get validGestionReclamationReclamation(): boolean {
    return this._validGestionReclamationReclamation;
    }

    set validGestionReclamationReclamation(value: boolean) {
    this._validGestionReclamationReclamation = value;
    }

    get validModerateurSituationModerateur(): boolean {
    return this._validModerateurSituationModerateur;
    }

    set validModerateurSituationModerateur(value: boolean) {
    this._validModerateurSituationModerateur = value;
    }
    get validModerateurProfil(): boolean {
    return this._validModerateurProfil;
    }

    set validModerateurProfil(value: boolean) {
    this._validModerateurProfil = value;
    }
    get validReclamationLibelle(): boolean {
    return this._validReclamationLibelle;
    }

    set validReclamationLibelle(value: boolean) {
    this._validReclamationLibelle = value;
    }
    get validReclamationDescription(): boolean {
    return this._validReclamationDescription;
    }

    set validReclamationDescription(value: boolean) {
    this._validReclamationDescription = value;
    }
    get validReclamationAdherent(): boolean {
    return this._validReclamationAdherent;
    }

    set validReclamationAdherent(value: boolean) {
    this._validReclamationAdherent = value;
    }

}
