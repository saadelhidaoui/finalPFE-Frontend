import {Component, OnInit, Input} from '@angular/core';
import {ChercheurService} from '../../../../../../controller/service/Chercheur.service';
import {ChercheurVo} from '../../../../../../controller/model/Chercheur.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
import {SituationModerateurService} from '../../../../../../controller/service/SituationModerateur.service';
import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import {ProfilService} from '../../../../../../controller/service/Profil.service';
@Component({
  selector: 'app-chercheur-create-adherent',
  templateUrl: './chercheur-create-adherent.component.html',
  styleUrls: ['./chercheur-create-adherent.component.css']
})
export class ChercheurCreateAdherentComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validChercheurSituationModerateur = true;
   _validChercheurProfil = true;

    _validSituationModerateurLibelle = true;
    _validProfilGrade = true;
    _validProfilEchelle = true;



constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private situationModerateurService :SituationModerateurService
,       private profilService :ProfilService
) {

}


// methods
ngOnInit(): void {

    this.selectedSituationModerateur = new SituationModerateurVo();
    this.situationModerateurService.findAll().subscribe((data) => this.situationModerateurs = data);
    this.selectedProfil = new ProfilVo();
    this.profilService.findAll().subscribe((data) => this.profils = data);
}




private setValidation(value : boolean){
    this.validChercheurSituationModerateur = value;
    this.validChercheurProfil = value;
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
     this.chercheurService.save().subscribe(chercheur=>{
       this.chercheurs.push({...chercheur});
       this.createChercheurDialog = false;
       this.submitted = false;
       this.selectedChercheur = new ChercheurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateChercheurSituationModerateur();
this.validateChercheurProfil();

    }

private validateChercheurSituationModerateur(){
        if (this.stringUtilService.isEmpty(this.selectedChercheur.situationModerateurVo)) {
            this.errorMessages.push('Situation moderateur non valide');
            this.validChercheurSituationModerateur = false;
        } else {
            this.validChercheurSituationModerateur = true;
        }
    }
private validateChercheurProfil(){
        if (this.stringUtilService.isEmpty(this.selectedChercheur.profilVo)) {
            this.errorMessages.push('Profil non valide');
            this.validChercheurProfil = false;
        } else {
            this.validChercheurProfil = true;
        }
    }




















//openPopup
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

hideCreateDialog(){
    this.createChercheurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
       }
set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

 get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }

   get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;

       }
    set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
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

    get validChercheurSituationModerateur(): boolean {
    return this._validChercheurSituationModerateur;
    }

    set validChercheurSituationModerateur(value: boolean) {
    this._validChercheurSituationModerateur = value;
    }
    get validChercheurProfil(): boolean {
    return this._validChercheurProfil;
    }

    set validChercheurProfil(value: boolean) {
    this._validChercheurProfil = value;
    }

    get validSituationModerateurLibelle(): boolean {
    return this._validSituationModerateurLibelle;
    }

    set validSituationModerateurLibelle(value: boolean) {
    this._validSituationModerateurLibelle = value;
    }
    get validProfilGrade(): boolean {
    return this._validProfilGrade;
    }

    set validProfilGrade(value: boolean) {
    this._validProfilGrade = value;
    }
    get validProfilEchelle(): boolean {
    return this._validProfilEchelle;
    }

    set validProfilEchelle(value: boolean) {
    this._validProfilEchelle = value;
    }

}
