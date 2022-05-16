import {Component, OnInit, Input} from '@angular/core';
import {DemandeEstivageService} from '../../../../../../controller/service/DemandeEstivage.service';
import {DemandeEstivageVo} from '../../../../../../controller/model/DemandeEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EtatDemandeEstivageVo} from '../../../../../../controller/model/EtatDemandeEstivage.model';
import {EtatDemandeEstivageService} from '../../../../../../controller/service/EtatDemandeEstivage.service';
import {PieceJointeEstivageVo} from '../../../../../../controller/model/PieceJointeEstivage.model';
import {PieceJointeEstivageService} from '../../../../../../controller/service/PieceJointeEstivage.service';
import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';
import {EstivageCentreEstivageVo} from '../../../../../../controller/model/EstivageCentreEstivage.model';
import {EstivageCentreEstivageService} from '../../../../../../controller/service/EstivageCentreEstivage.service';
import {DemandeEstivageCentreVo} from '../../../../../../controller/model/DemandeEstivageCentre.model';
import {DemandeEstivageCentreService} from '../../../../../../controller/service/DemandeEstivageCentre.service';
@Component({
  selector: 'app-demande-estivage-create-adherent',
  templateUrl: './demande-estivage-create-adherent.component.html',
  styleUrls: ['./demande-estivage-create-adherent.component.css']
})
export class DemandeEstivageCreateAdherentComponent implements OnInit {

        selectedPieceJointeEstivages: PieceJointeEstivageVo = new PieceJointeEstivageVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDemandeEstivageDemandeEstivageCentre = true;
   _validDemandeEstivageDateDebutEstivage = true;
   _validDemandeEstivageDateFinEstivage = true;
   _validDemandeEstivageAdherent = true;
   _validDemandeEstivageDateTraitement = true;

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



constructor(private datePipe: DatePipe, private demandeEstivageService: DemandeEstivageService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatDemandeEstivageService :EtatDemandeEstivageService
,       private pieceJointeEstivageService :PieceJointeEstivageService
,       private demandeEstivageCentreService :DemandeEstivageCentreService
,       private adherentService :AdherentService
,       private estivageService :EstivageService
,       private estivageCentreEstivageService :EstivageCentreEstivageService
) {

}


// methods
ngOnInit(): void {


                this.selectedPieceJointeEstivages.estivageVo = new EstivageVo();
                this.estivageService.findAll().subscribe((data) => this.estivages = data);


    this.selectedDemandeEstivageCentre = new DemandeEstivageCentreVo();
    this.demandeEstivageCentreService.findAll().subscribe((data) => this.demandeEstivageCentres = data);
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
    this.selectedEtatDemandeEstivage = new EtatDemandeEstivageVo();
    this.etatDemandeEstivageService.findAll().subscribe((data) => this.etatDemandeEstivages = data);
    this.selectedEstivageCentreEstivage = new EstivageCentreEstivageVo();
    this.estivageCentreEstivageService.findAll().subscribe((data) => this.estivageCentreEstivages = data);
}


    validatePieceJointeEstivages(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validDemandeEstivageDemandeEstivageCentre = value;
    this.validDemandeEstivageDateDebutEstivage = value;
    this.validDemandeEstivageDateFinEstivage = value;
    this.validDemandeEstivageAdherent = value;
    this.validDemandeEstivageDateTraitement = value;
    }

        addPieceJointeEstivages() {
        if( this.selectedDemandeEstivage.pieceJointeEstivagesVo == null ){
            this.selectedDemandeEstivage.pieceJointeEstivagesVo = new Array<PieceJointeEstivageVo>();
        }
       this.validatePieceJointeEstivages();
       if (this.errorMessages.length === 0) {
              this.selectedDemandeEstivage.pieceJointeEstivagesVo.push(this.selectedPieceJointeEstivages);
              this.selectedPieceJointeEstivages = new PieceJointeEstivageVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePieceJointeEstivages(p: PieceJointeEstivageVo) {
        this.selectedDemandeEstivage.pieceJointeEstivagesVo.forEach((element, index) => {
            if (element === p) { this.selectedDemandeEstivage.pieceJointeEstivagesVo.splice(index, 1); }
        });
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
     this.demandeEstivageService.save().subscribe(demandeEstivage=>{
       this.demandeEstivages.push({...demandeEstivage});
       this.createDemandeEstivageDialog = false;
       this.submitted = false;
       this.selectedDemandeEstivage = new DemandeEstivageVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDemandeEstivageDemandeEstivageCentre();
this.validateDemandeEstivageDateDebutEstivage();
this.validateDemandeEstivageDateFinEstivage();
this.validateDemandeEstivageAdherent();
this.validateDemandeEstivageDateTraitement();

    }

private validateDemandeEstivageDemandeEstivageCentre(){
        if (this.stringUtilService.isEmpty(this.selectedDemandeEstivage.demandeEstivageCentreVo)) {
            this.errorMessages.push('Demande estivage centre non valide');
            this.validDemandeEstivageDemandeEstivageCentre = false;
        } else {
            this.validDemandeEstivageDemandeEstivageCentre = true;
        }
    }
private validateDemandeEstivageDateDebutEstivage(){
        if (this.stringUtilService.isEmpty(this.selectedDemandeEstivage.dateDebutEstivage)) {
            this.errorMessages.push('Date debut estivage non valide');
            this.validDemandeEstivageDateDebutEstivage = false;
        } else {
            this.validDemandeEstivageDateDebutEstivage = true;
        }
    }
private validateDemandeEstivageDateFinEstivage(){
        if (this.stringUtilService.isEmpty(this.selectedDemandeEstivage.dateFinEstivage)) {
            this.errorMessages.push('Date fin estivage non valide');
            this.validDemandeEstivageDateFinEstivage = false;
        } else {
            this.validDemandeEstivageDateFinEstivage = true;
        }
    }
private validateDemandeEstivageAdherent(){
        if (this.stringUtilService.isEmpty(this.selectedDemandeEstivage.adherentVo)) {
            this.errorMessages.push('Adherent non valide');
            this.validDemandeEstivageAdherent = false;
        } else {
            this.validDemandeEstivageAdherent = true;
        }
    }
private validateDemandeEstivageDateTraitement(){
        if (this.stringUtilService.isEmpty(this.selectedDemandeEstivage.dateTraitement)) {
            this.errorMessages.push('Date traitement non valide');
            this.validDemandeEstivageDateTraitement = false;
        } else {
            this.validDemandeEstivageDateTraitement = true;
        }
    }

























//openPopup
              public async openCreateestivage(estivage: string) {
                      const isPermistted = await this.roleService.isPermitted('Estivage', 'add');
                       if(isPermistted){
         this.selectedEstivage = new EstivageVo();
        this.createEstivageDialog = true;
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
              public async openCreateestivageCentreEstivage(estivageCentreEstivage: string) {
                      const isPermistted = await this.roleService.isPermitted('EstivageCentreEstivage', 'add');
                       if(isPermistted){
         this.selectedEstivageCentreEstivage = new EstivageCentreEstivageVo();
        this.createEstivageCentreEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedemandeEstivageCentre(demandeEstivageCentre: string) {
                      const isPermistted = await this.roleService.isPermitted('DemandeEstivageCentre', 'add');
                       if(isPermistted){
         this.selectedDemandeEstivageCentre = new DemandeEstivageCentreVo();
        this.createDemandeEstivageCentreDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatDemandeEstivage(etatDemandeEstivage: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDemandeEstivage', 'add');
                       if(isPermistted){
         this.selectedEtatDemandeEstivage = new EtatDemandeEstivageVo();
        this.createEtatDemandeEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createDemandeEstivageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get demandeEstivages(): Array<DemandeEstivageVo> {
    return this.demandeEstivageService.demandeEstivages;
       }
set demandeEstivages(value: Array<DemandeEstivageVo>) {
        this.demandeEstivageService.demandeEstivages = value;
       }

 get selectedDemandeEstivage():DemandeEstivageVo {
           return this.demandeEstivageService.selectedDemandeEstivage;
       }
    set selectedDemandeEstivage(value: DemandeEstivageVo) {
        this.demandeEstivageService.selectedDemandeEstivage = value;
       }

   get createDemandeEstivageDialog(): boolean {
           return this.demandeEstivageService.createDemandeEstivageDialog;

       }
    set createDemandeEstivageDialog(value: boolean) {
        this.demandeEstivageService.createDemandeEstivageDialog= value;
       }

       get selectedEstivage(): EstivageVo {
           return this.estivageService.selectedEstivage;
       }
      set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
       }
       get estivages(): Array<EstivageVo> {
           return this.estivageService.estivages;
       }
       set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }
       get createEstivageDialog(): boolean {
           return this.estivageService.createEstivageDialog;
       }
      set createEstivageDialog(value: boolean) {
        this.estivageService.createEstivageDialog= value;
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
       get selectedEstivageCentreEstivage(): EstivageCentreEstivageVo {
           return this.estivageCentreEstivageService.selectedEstivageCentreEstivage;
       }
      set selectedEstivageCentreEstivage(value: EstivageCentreEstivageVo) {
        this.estivageCentreEstivageService.selectedEstivageCentreEstivage = value;
       }
       get estivageCentreEstivages(): Array<EstivageCentreEstivageVo> {
           return this.estivageCentreEstivageService.estivageCentreEstivages;
       }
       set estivageCentreEstivages(value: Array<EstivageCentreEstivageVo>) {
        this.estivageCentreEstivageService.estivageCentreEstivages = value;
       }
       get createEstivageCentreEstivageDialog(): boolean {
           return this.estivageCentreEstivageService.createEstivageCentreEstivageDialog;
       }
      set createEstivageCentreEstivageDialog(value: boolean) {
        this.estivageCentreEstivageService.createEstivageCentreEstivageDialog= value;
       }
       get selectedDemandeEstivageCentre(): DemandeEstivageCentreVo {
           return this.demandeEstivageCentreService.selectedDemandeEstivageCentre;
       }
      set selectedDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this.demandeEstivageCentreService.selectedDemandeEstivageCentre = value;
       }
       get demandeEstivageCentres(): Array<DemandeEstivageCentreVo> {
           return this.demandeEstivageCentreService.demandeEstivageCentres;
       }
       set demandeEstivageCentres(value: Array<DemandeEstivageCentreVo>) {
        this.demandeEstivageCentreService.demandeEstivageCentres = value;
       }
       get createDemandeEstivageCentreDialog(): boolean {
           return this.demandeEstivageCentreService.createDemandeEstivageCentreDialog;
       }
      set createDemandeEstivageCentreDialog(value: boolean) {
        this.demandeEstivageCentreService.createDemandeEstivageCentreDialog= value;
       }
       get selectedEtatDemandeEstivage(): EtatDemandeEstivageVo {
           return this.etatDemandeEstivageService.selectedEtatDemandeEstivage;
       }
      set selectedEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this.etatDemandeEstivageService.selectedEtatDemandeEstivage = value;
       }
       get etatDemandeEstivages(): Array<EtatDemandeEstivageVo> {
           return this.etatDemandeEstivageService.etatDemandeEstivages;
       }
       set etatDemandeEstivages(value: Array<EtatDemandeEstivageVo>) {
        this.etatDemandeEstivageService.etatDemandeEstivages = value;
       }
       get createEtatDemandeEstivageDialog(): boolean {
           return this.etatDemandeEstivageService.createEtatDemandeEstivageDialog;
       }
      set createEtatDemandeEstivageDialog(value: boolean) {
        this.etatDemandeEstivageService.createEtatDemandeEstivageDialog= value;
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

    get validDemandeEstivageDemandeEstivageCentre(): boolean {
    return this._validDemandeEstivageDemandeEstivageCentre;
    }

    set validDemandeEstivageDemandeEstivageCentre(value: boolean) {
    this._validDemandeEstivageDemandeEstivageCentre = value;
    }
    get validDemandeEstivageDateDebutEstivage(): boolean {
    return this._validDemandeEstivageDateDebutEstivage;
    }

    set validDemandeEstivageDateDebutEstivage(value: boolean) {
    this._validDemandeEstivageDateDebutEstivage = value;
    }
    get validDemandeEstivageDateFinEstivage(): boolean {
    return this._validDemandeEstivageDateFinEstivage;
    }

    set validDemandeEstivageDateFinEstivage(value: boolean) {
    this._validDemandeEstivageDateFinEstivage = value;
    }
    get validDemandeEstivageAdherent(): boolean {
    return this._validDemandeEstivageAdherent;
    }

    set validDemandeEstivageAdherent(value: boolean) {
    this._validDemandeEstivageAdherent = value;
    }
    get validDemandeEstivageDateTraitement(): boolean {
    return this._validDemandeEstivageDateTraitement;
    }

    set validDemandeEstivageDateTraitement(value: boolean) {
    this._validDemandeEstivageDateTraitement = value;
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
