import {Component, OnInit, Input} from '@angular/core';
import {ConjointService} from '../../../../../../controller/service/Conjoint.service';
import {ConjointVo} from '../../../../../../controller/model/Conjoint.model';
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
  selector: 'app-conjoint-create-chercheur',
  templateUrl: './conjoint-create-chercheur.component.html',
  styleUrls: ['./conjoint-create-chercheur.component.css']
})
export class ConjointCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validConjointCin = true;
   _validConjointNom = true;
   _validConjointPrenom = true;
   _validConjointOrigin = true;
   _validConjointEmail = true;
   _validConjointTelephone = true;
   _validConjointQualite = true;
   _validConjointAdherent = true;

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



constructor(private datePipe: DatePipe, private conjointService: ConjointService
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
    this.validConjointCin = value;
    this.validConjointNom = value;
    this.validConjointPrenom = value;
    this.validConjointOrigin = value;
    this.validConjointEmail = value;
    this.validConjointTelephone = value;
    this.validConjointQualite = value;
    this.validConjointAdherent = value;
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
     this.conjointService.save().subscribe(conjoint=>{
       this.conjoints.push({...conjoint});
       this.createConjointDialog = false;
       this.submitted = false;
       this.selectedConjoint = new ConjointVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateConjointCin();
this.validateConjointNom();
this.validateConjointPrenom();
this.validateConjointOrigin();
this.validateConjointEmail();
this.validateConjointTelephone();
this.validateConjointQualite();
this.validateConjointAdherent();

    }

private validateConjointCin(){
        if (this.stringUtilService.isEmpty(this.selectedConjoint.cin)) {
            this.errorMessages.push('Cin non valide');
            this.validConjointCin = false;
        } else {
            this.validConjointCin = true;
        }
    }
private validateConjointNom(){
        if (this.stringUtilService.isEmpty(this.selectedConjoint.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validConjointNom = false;
        } else {
            this.validConjointNom = true;
        }
    }
private validateConjointPrenom(){
        if (this.stringUtilService.isEmpty(this.selectedConjoint.prenom)) {
            this.errorMessages.push('Prenom non valide');
            this.validConjointPrenom = false;
        } else {
            this.validConjointPrenom = true;
        }
    }
private validateConjointOrigin(){
        if (this.stringUtilService.isEmpty(this.selectedConjoint.origin)) {
            this.errorMessages.push('Origin non valide');
            this.validConjointOrigin = false;
        } else {
            this.validConjointOrigin = true;
        }
    }
private validateConjointEmail(){
        if (this.stringUtilService.isEmpty(this.selectedConjoint.email)) {
            this.errorMessages.push('Email non valide');
            this.validConjointEmail = false;
        } else {
            this.validConjointEmail = true;
        }
    }
private validateConjointTelephone(){
        if (this.stringUtilService.isEmpty(this.selectedConjoint.telephone)) {
            this.errorMessages.push('Telephone non valide');
            this.validConjointTelephone = false;
        } else {
            this.validConjointTelephone = true;
        }
    }
private validateConjointQualite(){
        if (this.stringUtilService.isEmpty(this.selectedConjoint.qualiteVo)) {
            this.errorMessages.push('Qualite non valide');
            this.validConjointQualite = false;
        } else {
            this.validConjointQualite = true;
        }
    }
private validateConjointAdherent(){
        if (this.stringUtilService.isEmpty(this.selectedConjoint.adherentVo)) {
            this.errorMessages.push('Adherent non valide');
            this.validConjointAdherent = false;
        } else {
            this.validConjointAdherent = true;
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
    this.createConjointDialog  = false;
    this.setValidation(true);
}

// getters and setters

get conjoints(): Array<ConjointVo> {
    return this.conjointService.conjoints;
       }
set conjoints(value: Array<ConjointVo>) {
        this.conjointService.conjoints = value;
       }

 get selectedConjoint():ConjointVo {
           return this.conjointService.selectedConjoint;
       }
    set selectedConjoint(value: ConjointVo) {
        this.conjointService.selectedConjoint = value;
       }

   get createConjointDialog(): boolean {
           return this.conjointService.createConjointDialog;

       }
    set createConjointDialog(value: boolean) {
        this.conjointService.createConjointDialog= value;
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

    get validConjointCin(): boolean {
    return this._validConjointCin;
    }

    set validConjointCin(value: boolean) {
    this._validConjointCin = value;
    }
    get validConjointNom(): boolean {
    return this._validConjointNom;
    }

    set validConjointNom(value: boolean) {
    this._validConjointNom = value;
    }
    get validConjointPrenom(): boolean {
    return this._validConjointPrenom;
    }

    set validConjointPrenom(value: boolean) {
    this._validConjointPrenom = value;
    }
    get validConjointOrigin(): boolean {
    return this._validConjointOrigin;
    }

    set validConjointOrigin(value: boolean) {
    this._validConjointOrigin = value;
    }
    get validConjointEmail(): boolean {
    return this._validConjointEmail;
    }

    set validConjointEmail(value: boolean) {
    this._validConjointEmail = value;
    }
    get validConjointTelephone(): boolean {
    return this._validConjointTelephone;
    }

    set validConjointTelephone(value: boolean) {
    this._validConjointTelephone = value;
    }
    get validConjointQualite(): boolean {
    return this._validConjointQualite;
    }

    set validConjointQualite(value: boolean) {
    this._validConjointQualite = value;
    }
    get validConjointAdherent(): boolean {
    return this._validConjointAdherent;
    }

    set validConjointAdherent(value: boolean) {
    this._validConjointAdherent = value;
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
