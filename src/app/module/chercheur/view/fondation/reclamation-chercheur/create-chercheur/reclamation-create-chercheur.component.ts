import {Component, OnInit, Input} from '@angular/core';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';
import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EtatReclamationVo} from '../../../../../../controller/model/EtatReclamation.model';
import {EtatReclamationService} from '../../../../../../controller/service/EtatReclamation.service';
import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {PieceJointeReclamationVo} from '../../../../../../controller/model/PieceJointeReclamation.model';
import {PieceJointeReclamationService} from '../../../../../../controller/service/PieceJointeReclamation.service';
@Component({
  selector: 'app-reclamation-create-chercheur',
  templateUrl: './reclamation-create-chercheur.component.html',
  styleUrls: ['./reclamation-create-chercheur.component.css']
})
export class ReclamationCreateChercheurComponent implements OnInit {

        selectedPieceJointeReclamations: PieceJointeReclamationVo = new PieceJointeReclamationVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validReclamationLibelle = true;
   _validReclamationDescription = true;
   _validReclamationAdherent = true;

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



constructor(private datePipe: DatePipe, private reclamationService: ReclamationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatReclamationService :EtatReclamationService
,       private adherentService :AdherentService
,       private pieceJointeReclamationService :PieceJointeReclamationService
) {

}


// methods
ngOnInit(): void {




    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
    this.selectedEtatReclamation = new EtatReclamationVo();
    this.etatReclamationService.findAll().subscribe((data) => this.etatReclamations = data);
}


    validatePieceJointeReclamations(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validReclamationLibelle = value;
    this.validReclamationDescription = value;
    this.validReclamationAdherent = value;
    }

        addPieceJointeReclamations() {
        if( this.selectedReclamation.pieceJointeReclamationsVo == null ){
            this.selectedReclamation.pieceJointeReclamationsVo = new Array<PieceJointeReclamationVo>();
        }
       this.validatePieceJointeReclamations();
       if (this.errorMessages.length === 0) {
              this.selectedReclamation.pieceJointeReclamationsVo.push(this.selectedPieceJointeReclamations);
              this.selectedPieceJointeReclamations = new PieceJointeReclamationVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePieceJointeReclamations(p: PieceJointeReclamationVo) {
        this.selectedReclamation.pieceJointeReclamationsVo.forEach((element, index) => {
            if (element === p) { this.selectedReclamation.pieceJointeReclamationsVo.splice(index, 1); }
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
     this.reclamationService.save().subscribe(reclamation=>{
       this.reclamations.push({...reclamation});
       this.createReclamationDialog = false;
       this.submitted = false;
       this.selectedReclamation = new ReclamationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateReclamationLibelle();
this.validateReclamationDescription();
this.validateReclamationAdherent();

    }

private validateReclamationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedReclamation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validReclamationLibelle = false;
        } else {
            this.validReclamationLibelle = true;
        }
    }
private validateReclamationDescription(){
        if (this.stringUtilService.isEmpty(this.selectedReclamation.description)) {
            this.errorMessages.push('Description non valide');
            this.validReclamationDescription = false;
        } else {
            this.validReclamationDescription = true;
        }
    }
private validateReclamationAdherent(){
        if (this.stringUtilService.isEmpty(this.selectedReclamation.adherentVo)) {
            this.errorMessages.push('Adherent non valide');
            this.validReclamationAdherent = false;
        } else {
            this.validReclamationAdherent = true;
        }
    }





























//openPopup
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
              public async openCreateetatReclamation(etatReclamation: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'add');
                       if(isPermistted){
         this.selectedEtatReclamation = new EtatReclamationVo();
        this.createEtatReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createReclamationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get reclamations(): Array<ReclamationVo> {
    return this.reclamationService.reclamations;
       }
set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }

 get selectedReclamation():ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }

   get createReclamationDialog(): boolean {
           return this.reclamationService.createReclamationDialog;

       }
    set createReclamationDialog(value: boolean) {
        this.reclamationService.createReclamationDialog= value;
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
       get selectedEtatReclamation(): EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
      set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }
       get etatReclamations(): Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamations;
       }
       set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }
       get createEtatReclamationDialog(): boolean {
           return this.etatReclamationService.createEtatReclamationDialog;
       }
      set createEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.createEtatReclamationDialog= value;
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
