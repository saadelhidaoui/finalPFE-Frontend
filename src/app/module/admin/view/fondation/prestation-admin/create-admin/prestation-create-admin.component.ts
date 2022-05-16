import {Component, OnInit, Input} from '@angular/core';
import {PrestationService} from '../../../../../../controller/service/Prestation.service';
import {PrestationVo} from '../../../../../../controller/model/Prestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EtatPrestationVo} from '../../../../../../controller/model/EtatPrestation.model';
import {EtatPrestationService} from '../../../../../../controller/service/EtatPrestation.service';
import {PieceJointePrestationVo} from '../../../../../../controller/model/PieceJointePrestation.model';
import {PieceJointePrestationService} from '../../../../../../controller/service/PieceJointePrestation.service';
import {TypePrestationVo} from '../../../../../../controller/model/TypePrestation.model';
import {TypePrestationService} from '../../../../../../controller/service/TypePrestation.service';
import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import {NiveauImportanceService} from '../../../../../../controller/service/NiveauImportance.service';
@Component({
  selector: 'app-prestation-create-admin',
  templateUrl: './prestation-create-admin.component.html',
  styleUrls: ['./prestation-create-admin.component.css']
})
export class PrestationCreateAdminComponent implements OnInit {

        selectedPieceJointePrestations: PieceJointePrestationVo = new PieceJointePrestationVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPrestationNumArrivee = true;
   _validPrestationEtatPrestation = true;
   _validPrestationChargeCas = true;
   _validPrestationNiveauImportance = true;
   _validPrestationTypePrestation = true;
   _validPrestationAdherent = true;

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



constructor(private datePipe: DatePipe, private prestationService: PrestationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatPrestationService :EtatPrestationService
,       private pieceJointePrestationService :PieceJointePrestationService
,       private typePrestationService :TypePrestationService
,       private adherentService :AdherentService
,       private niveauImportanceService :NiveauImportanceService
) {

}


// methods
ngOnInit(): void {




    this.selectedEtatPrestation = new EtatPrestationVo();
    this.etatPrestationService.findAll().subscribe((data) => this.etatPrestations = data);
    this.selectedNiveauImportance = new NiveauImportanceVo();
    this.niveauImportanceService.findAll().subscribe((data) => this.niveauImportances = data);
    this.selectedTypePrestation = new TypePrestationVo();
    this.typePrestationService.findAll().subscribe((data) => this.typePrestations = data);
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
}


    validatePieceJointePrestations(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validPrestationNumArrivee = value;
    this.validPrestationEtatPrestation = value;
    this.validPrestationChargeCas = value;
    this.validPrestationNiveauImportance = value;
    this.validPrestationTypePrestation = value;
    this.validPrestationAdherent = value;
    }

        addPieceJointePrestations() {
        if( this.selectedPrestation.pieceJointePrestationsVo == null ){
            this.selectedPrestation.pieceJointePrestationsVo = new Array<PieceJointePrestationVo>();
        }
       this.validatePieceJointePrestations();
       if (this.errorMessages.length === 0) {
              this.selectedPrestation.pieceJointePrestationsVo.push(this.selectedPieceJointePrestations);
              this.selectedPieceJointePrestations = new PieceJointePrestationVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePieceJointePrestations(p: PieceJointePrestationVo) {
        this.selectedPrestation.pieceJointePrestationsVo.forEach((element, index) => {
            if (element === p) { this.selectedPrestation.pieceJointePrestationsVo.splice(index, 1); }
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
     this.prestationService.save().subscribe(prestation=>{
       this.prestations.push({...prestation});
       this.createPrestationDialog = false;
       this.submitted = false;
       this.selectedPrestation = new PrestationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePrestationNumArrivee();
this.validatePrestationEtatPrestation();
this.validatePrestationChargeCas();
this.validatePrestationNiveauImportance();
this.validatePrestationTypePrestation();
this.validatePrestationAdherent();

    }

private validatePrestationNumArrivee(){
        if (this.stringUtilService.isEmpty(this.selectedPrestation.numArrivee)) {
            this.errorMessages.push('Num arrivee non valide');
            this.validPrestationNumArrivee = false;
        } else {
            this.validPrestationNumArrivee = true;
        }
    }
private validatePrestationEtatPrestation(){
        if (this.stringUtilService.isEmpty(this.selectedPrestation.etatPrestationVo)) {
            this.errorMessages.push('Etat prestation non valide');
            this.validPrestationEtatPrestation = false;
        } else {
            this.validPrestationEtatPrestation = true;
        }
    }
private validatePrestationChargeCas(){
        if (this.stringUtilService.isEmpty(this.selectedPrestation.chargeCas)) {
            this.errorMessages.push('Charge cas non valide');
            this.validPrestationChargeCas = false;
        } else {
            this.validPrestationChargeCas = true;
        }
    }
private validatePrestationNiveauImportance(){
        if (this.stringUtilService.isEmpty(this.selectedPrestation.niveauImportanceVo)) {
            this.errorMessages.push('Niveau importance non valide');
            this.validPrestationNiveauImportance = false;
        } else {
            this.validPrestationNiveauImportance = true;
        }
    }
private validatePrestationTypePrestation(){
        if (this.stringUtilService.isEmpty(this.selectedPrestation.typePrestationVo)) {
            this.errorMessages.push('Type prestation non valide');
            this.validPrestationTypePrestation = false;
        } else {
            this.validPrestationTypePrestation = true;
        }
    }
private validatePrestationAdherent(){
        if (this.stringUtilService.isEmpty(this.selectedPrestation.adherentVo)) {
            this.errorMessages.push('Adherent non valide');
            this.validPrestationAdherent = false;
        } else {
            this.validPrestationAdherent = true;
        }
    }



































//openPopup
              public async openCreatetypePrestation(typePrestation: string) {
                      const isPermistted = await this.roleService.isPermitted('TypePrestation', 'add');
                       if(isPermistted){
         this.selectedTypePrestation = new TypePrestationVo();
        this.createTypePrestationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateniveauImportance(niveauImportance: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauImportance', 'add');
                       if(isPermistted){
         this.selectedNiveauImportance = new NiveauImportanceVo();
        this.createNiveauImportanceDialog = true;
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
              public async openCreateetatPrestation(etatPrestation: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatPrestation', 'add');
                       if(isPermistted){
         this.selectedEtatPrestation = new EtatPrestationVo();
        this.createEtatPrestationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPrestationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get prestations(): Array<PrestationVo> {
    return this.prestationService.prestations;
       }
set prestations(value: Array<PrestationVo>) {
        this.prestationService.prestations = value;
       }

 get selectedPrestation():PrestationVo {
           return this.prestationService.selectedPrestation;
       }
    set selectedPrestation(value: PrestationVo) {
        this.prestationService.selectedPrestation = value;
       }

   get createPrestationDialog(): boolean {
           return this.prestationService.createPrestationDialog;

       }
    set createPrestationDialog(value: boolean) {
        this.prestationService.createPrestationDialog= value;
       }

       get selectedTypePrestation(): TypePrestationVo {
           return this.typePrestationService.selectedTypePrestation;
       }
      set selectedTypePrestation(value: TypePrestationVo) {
        this.typePrestationService.selectedTypePrestation = value;
       }
       get typePrestations(): Array<TypePrestationVo> {
           return this.typePrestationService.typePrestations;
       }
       set typePrestations(value: Array<TypePrestationVo>) {
        this.typePrestationService.typePrestations = value;
       }
       get createTypePrestationDialog(): boolean {
           return this.typePrestationService.createTypePrestationDialog;
       }
      set createTypePrestationDialog(value: boolean) {
        this.typePrestationService.createTypePrestationDialog= value;
       }
       get selectedNiveauImportance(): NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
      set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }
       get niveauImportances(): Array<NiveauImportanceVo> {
           return this.niveauImportanceService.niveauImportances;
       }
       set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
       }
       get createNiveauImportanceDialog(): boolean {
           return this.niveauImportanceService.createNiveauImportanceDialog;
       }
      set createNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.createNiveauImportanceDialog= value;
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
       get selectedEtatPrestation(): EtatPrestationVo {
           return this.etatPrestationService.selectedEtatPrestation;
       }
      set selectedEtatPrestation(value: EtatPrestationVo) {
        this.etatPrestationService.selectedEtatPrestation = value;
       }
       get etatPrestations(): Array<EtatPrestationVo> {
           return this.etatPrestationService.etatPrestations;
       }
       set etatPrestations(value: Array<EtatPrestationVo>) {
        this.etatPrestationService.etatPrestations = value;
       }
       get createEtatPrestationDialog(): boolean {
           return this.etatPrestationService.createEtatPrestationDialog;
       }
      set createEtatPrestationDialog(value: boolean) {
        this.etatPrestationService.createEtatPrestationDialog= value;
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

    get validPrestationNumArrivee(): boolean {
    return this._validPrestationNumArrivee;
    }

    set validPrestationNumArrivee(value: boolean) {
    this._validPrestationNumArrivee = value;
    }
    get validPrestationEtatPrestation(): boolean {
    return this._validPrestationEtatPrestation;
    }

    set validPrestationEtatPrestation(value: boolean) {
    this._validPrestationEtatPrestation = value;
    }
    get validPrestationChargeCas(): boolean {
    return this._validPrestationChargeCas;
    }

    set validPrestationChargeCas(value: boolean) {
    this._validPrestationChargeCas = value;
    }
    get validPrestationNiveauImportance(): boolean {
    return this._validPrestationNiveauImportance;
    }

    set validPrestationNiveauImportance(value: boolean) {
    this._validPrestationNiveauImportance = value;
    }
    get validPrestationTypePrestation(): boolean {
    return this._validPrestationTypePrestation;
    }

    set validPrestationTypePrestation(value: boolean) {
    this._validPrestationTypePrestation = value;
    }
    get validPrestationAdherent(): boolean {
    return this._validPrestationAdherent;
    }

    set validPrestationAdherent(value: boolean) {
    this._validPrestationAdherent = value;
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
