import {Component, OnInit, Input} from '@angular/core';
import {EnfantService} from '../../../../../../controller/service/Enfant.service';
import {EnfantVo} from '../../../../../../controller/model/Enfant.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';
import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
@Component({
  selector: 'app-enfant-create-chercheur',
  templateUrl: './enfant-create-chercheur.component.html',
  styleUrls: ['./enfant-create-chercheur.component.css']
})
export class EnfantCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEnfantNom = true;
   _validEnfantQualite = true;
   _validEnfantAdherent = true;

    _validAdherentNumAdhesion = true;
    _validAdherentCin = true;
    _validAdherentNom = true;
    _validAdherentPrenom = true;
    _validAdherentOrigine = true;
    _validAdherentVille = true;
    _validAdherentTelephone = true;
    _validAdherentQualite = true;
    _validAdherentAdresse = true;
    _validAdherentPpr = true;
    _validAdherentDateNaissance = true;
    _validAdherentStatut = true;
    _validAdherentFonction = true;



constructor(private datePipe: DatePipe, private enfantService: EnfantService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private qualiteService :QualiteService
,       private adherentService :AdherentService
) {

}


// methods
ngOnInit(): void {

    this.selectedQualite = new QualiteVo();
    this.qualiteService.findAll().subscribe((data) => this.qualites = data);
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
}




private setValidation(value : boolean){
    this.validEnfantNom = value;
    this.validEnfantQualite = value;
    this.validEnfantAdherent = value;
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
     this.enfantService.save().subscribe(enfant=>{
       this.enfants.push({...enfant});
       this.createEnfantDialog = false;
       this.submitted = false;
       this.selectedEnfant = new EnfantVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEnfantNom();
this.validateEnfantQualite();
this.validateEnfantAdherent();

    }

private validateEnfantNom(){
        if (this.stringUtilService.isEmpty(this.selectedEnfant.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validEnfantNom = false;
        } else {
            this.validEnfantNom = true;
        }
    }
private validateEnfantQualite(){
        if (this.stringUtilService.isEmpty(this.selectedEnfant.qualiteVo)) {
            this.errorMessages.push('Qualite non valide');
            this.validEnfantQualite = false;
        } else {
            this.validEnfantQualite = true;
        }
    }
private validateEnfantAdherent(){
        if (this.stringUtilService.isEmpty(this.selectedEnfant.adherentVo)) {
            this.errorMessages.push('Adherent non valide');
            this.validEnfantAdherent = false;
        } else {
            this.validEnfantAdherent = true;
        }
    }

















//openPopup
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

hideCreateDialog(){
    this.createEnfantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get enfants(): Array<EnfantVo> {
    return this.enfantService.enfants;
       }
set enfants(value: Array<EnfantVo>) {
        this.enfantService.enfants = value;
       }

 get selectedEnfant():EnfantVo {
           return this.enfantService.selectedEnfant;
       }
    set selectedEnfant(value: EnfantVo) {
        this.enfantService.selectedEnfant = value;
       }

   get createEnfantDialog(): boolean {
           return this.enfantService.createEnfantDialog;

       }
    set createEnfantDialog(value: boolean) {
        this.enfantService.createEnfantDialog= value;
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

    get validEnfantNom(): boolean {
    return this._validEnfantNom;
    }

    set validEnfantNom(value: boolean) {
    this._validEnfantNom = value;
    }
    get validEnfantQualite(): boolean {
    return this._validEnfantQualite;
    }

    set validEnfantQualite(value: boolean) {
    this._validEnfantQualite = value;
    }
    get validEnfantAdherent(): boolean {
    return this._validEnfantAdherent;
    }

    set validEnfantAdherent(value: boolean) {
    this._validEnfantAdherent = value;
    }

    get validAdherentNumAdhesion(): boolean {
    return this._validAdherentNumAdhesion;
    }

    set validAdherentNumAdhesion(value: boolean) {
    this._validAdherentNumAdhesion = value;
    }
    get validAdherentCin(): boolean {
    return this._validAdherentCin;
    }

    set validAdherentCin(value: boolean) {
    this._validAdherentCin = value;
    }
    get validAdherentNom(): boolean {
    return this._validAdherentNom;
    }

    set validAdherentNom(value: boolean) {
    this._validAdherentNom = value;
    }
    get validAdherentPrenom(): boolean {
    return this._validAdherentPrenom;
    }

    set validAdherentPrenom(value: boolean) {
    this._validAdherentPrenom = value;
    }
    get validAdherentOrigine(): boolean {
    return this._validAdherentOrigine;
    }

    set validAdherentOrigine(value: boolean) {
    this._validAdherentOrigine = value;
    }
    get validAdherentVille(): boolean {
    return this._validAdherentVille;
    }

    set validAdherentVille(value: boolean) {
    this._validAdherentVille = value;
    }
    get validAdherentTelephone(): boolean {
    return this._validAdherentTelephone;
    }

    set validAdherentTelephone(value: boolean) {
    this._validAdherentTelephone = value;
    }
    get validAdherentQualite(): boolean {
    return this._validAdherentQualite;
    }

    set validAdherentQualite(value: boolean) {
    this._validAdherentQualite = value;
    }
    get validAdherentAdresse(): boolean {
    return this._validAdherentAdresse;
    }

    set validAdherentAdresse(value: boolean) {
    this._validAdherentAdresse = value;
    }
    get validAdherentPpr(): boolean {
    return this._validAdherentPpr;
    }

    set validAdherentPpr(value: boolean) {
    this._validAdherentPpr = value;
    }
    get validAdherentDateNaissance(): boolean {
    return this._validAdherentDateNaissance;
    }

    set validAdherentDateNaissance(value: boolean) {
    this._validAdherentDateNaissance = value;
    }
    get validAdherentStatut(): boolean {
    return this._validAdherentStatut;
    }

    set validAdherentStatut(value: boolean) {
    this._validAdherentStatut = value;
    }
    get validAdherentFonction(): boolean {
    return this._validAdherentFonction;
    }

    set validAdherentFonction(value: boolean) {
    this._validAdherentFonction = value;
    }

}
