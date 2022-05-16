import {Component, OnInit, Input} from '@angular/core';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {StatutVo} from '../../../../../../controller/model/Statut.model';
import {StatutService} from '../../../../../../controller/service/Statut.service';
import {FonctionVo} from '../../../../../../controller/model/Fonction.model';
import {FonctionService} from '../../../../../../controller/service/Fonction.service';
import {EtatCarteVo} from '../../../../../../controller/model/EtatCarte.model';
import {EtatCarteService} from '../../../../../../controller/service/EtatCarte.service';
import {ConjointVo} from '../../../../../../controller/model/Conjoint.model';
import {ConjointService} from '../../../../../../controller/service/Conjoint.service';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';
import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {PieceJointeAdherentVo} from '../../../../../../controller/model/PieceJointeAdherent.model';
import {PieceJointeAdherentService} from '../../../../../../controller/service/PieceJointeAdherent.service';
import {EnfantVo} from '../../../../../../controller/model/Enfant.model';
import {EnfantService} from '../../../../../../controller/service/Enfant.service';
@Component({
  selector: 'app-adherent-create-adherent',
  templateUrl: './adherent-create-adherent.component.html',
  styleUrls: ['./adherent-create-adherent.component.css']
})
export class AdherentCreateAdherentComponent implements OnInit {

        selectedConjoints: ConjointVo = new ConjointVo();
        selectedEnfants: EnfantVo = new EnfantVo();
        selectedPieceJointeAdherents: PieceJointeAdherentVo = new PieceJointeAdherentVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

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

    _validVilleRegion = true;
    _validConjointCin = true;
    _validConjointNom = true;
    _validConjointPrenom = true;
    _validConjointOrigin = true;
    _validConjointEmail = true;
    _validConjointTelephone = true;
    _validConjointQualite = true;
    _validConjointAdherent = true;
    _validEnfantNom = true;
    _validEnfantQualite = true;
    _validEnfantAdherent = true;



constructor(private datePipe: DatePipe, private adherentService: AdherentService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private qualiteService :QualiteService
,       private fonctionService :FonctionService
,       private enfantService :EnfantService
,       private villeService :VilleService
,       private statutService :StatutService
,       private etatCarteService :EtatCarteService
,       private conjointService :ConjointService
,       private pieceJointeAdherentService :PieceJointeAdherentService
) {

}


// methods
ngOnInit(): void {


                this.selectedConjoints.qualiteVo = new QualiteVo();
                this.qualiteService.findAll().subscribe((data) => this.qualites = data);



                this.selectedEnfants.qualiteVo = new QualiteVo();
                this.qualiteService.findAll().subscribe((data) => this.qualites = data);





    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedQualite = new QualiteVo();
    this.qualiteService.findAll().subscribe((data) => this.qualites = data);
    this.selectedEtatCarte = new EtatCarteVo();
    this.etatCarteService.findAll().subscribe((data) => this.etatCartes = data);
    this.selectedStatut = new StatutVo();
    this.statutService.findAll().subscribe((data) => this.statuts = data);
    this.selectedFonction = new FonctionVo();
    this.fonctionService.findAll().subscribe((data) => this.fonctions = data);
}


    validateConjoints(){
    this.errorMessages = new Array();
    this.validateConjointCin();
    this.validateConjointNom();
    this.validateConjointPrenom();
    this.validateConjointOrigin();
    this.validateConjointEmail();
    this.validateConjointTelephone();
    this.validateConjointQualite();
    this.validateConjointAdherent();
    }
    validateEnfants(){
    this.errorMessages = new Array();
    this.validateEnfantNom();
    this.validateEnfantQualite();
    this.validateEnfantAdherent();
    }
    validatePieceJointeAdherents(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validAdherentNumAdhesion = value;
    this.validAdherentCin = value;
    this.validAdherentNom = value;
    this.validAdherentPrenom = value;
    this.validAdherentOrigine = value;
    this.validAdherentVille = value;
    this.validAdherentTelephone = value;
    this.validAdherentQualite = value;
    this.validAdherentAdresse = value;
    this.validAdherentPpr = value;
    this.validAdherentDateNaissance = value;
    this.validAdherentStatut = value;
    this.validAdherentFonction = value;
    this.validConjointCin = value;
    this.validConjointNom = value;
    this.validConjointPrenom = value;
    this.validConjointOrigin = value;
    this.validConjointEmail = value;
    this.validConjointTelephone = value;
    this.validConjointQualite = value;
    this.validConjointAdherent = value;
    this.validEnfantNom = value;
    this.validEnfantQualite = value;
    this.validEnfantAdherent = value;
    }

        addConjoints() {
        if( this.selectedAdherent.conjointsVo == null ){
            this.selectedAdherent.conjointsVo = new Array<ConjointVo>();
        }
       this.validateConjoints();
       if (this.errorMessages.length === 0) {
              this.selectedAdherent.conjointsVo.push(this.selectedConjoints);
              this.selectedConjoints = new ConjointVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteConjoints(p: ConjointVo) {
        this.selectedAdherent.conjointsVo.forEach((element, index) => {
            if (element === p) { this.selectedAdherent.conjointsVo.splice(index, 1); }
        });
    }
        addEnfants() {
        if( this.selectedAdherent.enfantsVo == null ){
            this.selectedAdherent.enfantsVo = new Array<EnfantVo>();
        }
       this.validateEnfants();
       if (this.errorMessages.length === 0) {
              this.selectedAdherent.enfantsVo.push(this.selectedEnfants);
              this.selectedEnfants = new EnfantVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteEnfants(p: EnfantVo) {
        this.selectedAdherent.enfantsVo.forEach((element, index) => {
            if (element === p) { this.selectedAdherent.enfantsVo.splice(index, 1); }
        });
    }
        addPieceJointeAdherents() {
        if( this.selectedAdherent.pieceJointeAdherentsVo == null ){
            this.selectedAdherent.pieceJointeAdherentsVo = new Array<PieceJointeAdherentVo>();
        }
       this.validatePieceJointeAdherents();
       if (this.errorMessages.length === 0) {
              this.selectedAdherent.pieceJointeAdherentsVo.push(this.selectedPieceJointeAdherents);
              this.selectedPieceJointeAdherents = new PieceJointeAdherentVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePieceJointeAdherents(p: PieceJointeAdherentVo) {
        this.selectedAdherent.pieceJointeAdherentsVo.forEach((element, index) => {
            if (element === p) { this.selectedAdherent.pieceJointeAdherentsVo.splice(index, 1); }
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
     this.adherentService.save().subscribe(adherent=>{
       this.adherents.push({...adherent});
       this.createAdherentDialog = false;
       this.submitted = false;
       this.selectedAdherent = new AdherentVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateAdherentNumAdhesion();
this.validateAdherentCin();
this.validateAdherentNom();
this.validateAdherentPrenom();
this.validateAdherentOrigine();
this.validateAdherentVille();
this.validateAdherentTelephone();
this.validateAdherentQualite();
this.validateAdherentAdresse();
this.validateAdherentPpr();
this.validateAdherentDateNaissance();
this.validateAdherentStatut();
this.validateAdherentFonction();

    }

private validateAdherentNumAdhesion(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.numAdhesion)) {
            this.errorMessages.push('Num adhesion non valide');
            this.validAdherentNumAdhesion = false;
        } else {
            this.validAdherentNumAdhesion = true;
        }
    }
private validateAdherentCin(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.cin)) {
            this.errorMessages.push('Cin non valide');
            this.validAdherentCin = false;
        } else {
            this.validAdherentCin = true;
        }
    }
private validateAdherentNom(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validAdherentNom = false;
        } else {
            this.validAdherentNom = true;
        }
    }
private validateAdherentPrenom(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.prenom)) {
            this.errorMessages.push('Prenom non valide');
            this.validAdherentPrenom = false;
        } else {
            this.validAdherentPrenom = true;
        }
    }
private validateAdherentOrigine(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.origine)) {
            this.errorMessages.push('Origine non valide');
            this.validAdherentOrigine = false;
        } else {
            this.validAdherentOrigine = true;
        }
    }
private validateAdherentVille(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.villeVo)) {
            this.errorMessages.push('Ville non valide');
            this.validAdherentVille = false;
        } else {
            this.validAdherentVille = true;
        }
    }
private validateAdherentTelephone(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.telephone)) {
            this.errorMessages.push('Telephone non valide');
            this.validAdherentTelephone = false;
        } else {
            this.validAdherentTelephone = true;
        }
    }
private validateAdherentQualite(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.qualiteVo)) {
            this.errorMessages.push('Qualite non valide');
            this.validAdherentQualite = false;
        } else {
            this.validAdherentQualite = true;
        }
    }
private validateAdherentAdresse(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.adresse)) {
            this.errorMessages.push('Adresse non valide');
            this.validAdherentAdresse = false;
        } else {
            this.validAdherentAdresse = true;
        }
    }
private validateAdherentPpr(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.ppr)) {
            this.errorMessages.push('Ppr non valide');
            this.validAdherentPpr = false;
        } else {
            this.validAdherentPpr = true;
        }
    }
private validateAdherentDateNaissance(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.dateNaissance)) {
            this.errorMessages.push('Date naissance non valide');
            this.validAdherentDateNaissance = false;
        } else {
            this.validAdherentDateNaissance = true;
        }
    }
private validateAdherentStatut(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.statutVo)) {
            this.errorMessages.push('Statut non valide');
            this.validAdherentStatut = false;
        } else {
            this.validAdherentStatut = true;
        }
    }
private validateAdherentFonction(){
        if (this.stringUtilService.isEmpty(this.selectedAdherent.fonctionVo)) {
            this.errorMessages.push('Fonction non valide');
            this.validAdherentFonction = false;
        } else {
            this.validAdherentFonction = true;
        }
    }





















            private validateConjointCin(){
            if (this.selectedConjoints.cin == null) {
            this.errorMessages.push('Cin de la conjoint est  invalide');
             this.validConjointCin = false;
            } else {
            this.validConjointCin = true;
            }
            }

            private validateConjointNom(){
            if (this.selectedConjoints.nom == null) {
            this.errorMessages.push('Nom de la conjoint est  invalide');
             this.validConjointNom = false;
            } else {
            this.validConjointNom = true;
            }
            }

            private validateConjointPrenom(){
            if (this.selectedConjoints.prenom == null) {
            this.errorMessages.push('Prenom de la conjoint est  invalide');
             this.validConjointPrenom = false;
            } else {
            this.validConjointPrenom = true;
            }
            }

            private validateConjointOrigin(){
            if (this.selectedConjoints.origin == null) {
            this.errorMessages.push('Origin de la conjoint est  invalide');
             this.validConjointOrigin = false;
            } else {
            this.validConjointOrigin = true;
            }
            }

            private validateConjointEmail(){
            if (this.selectedConjoints.email == null) {
            this.errorMessages.push('Email de la conjoint est  invalide');
             this.validConjointEmail = false;
            } else {
            this.validConjointEmail = true;
            }
            }

            private validateConjointTelephone(){
            if (this.selectedConjoints.telephone == null) {
            this.errorMessages.push('Telephone de la conjoint est  invalide');
             this.validConjointTelephone = false;
            } else {
            this.validConjointTelephone = true;
            }
            }

            private validateConjointQualite(){
            if (this.selectedConjoints.qualiteVo == null) {
            this.errorMessages.push('Qualite de la conjoint est  invalide');
             this.validConjointQualite = false;
            } else {
            this.validConjointQualite = true;
            }
            }

            private validateConjointAdherent(){
            if (this.selectedConjoints.adherentVo == null) {
            this.errorMessages.push('Adherent de la conjoint est  invalide');
             this.validConjointAdherent = false;
            } else {
            this.validConjointAdherent = true;
            }
            }





            private validateEnfantNom(){
            if (this.selectedEnfants.nom == null) {
            this.errorMessages.push('Nom de la enfant est  invalide');
             this.validEnfantNom = false;
            } else {
            this.validEnfantNom = true;
            }
            }




            private validateEnfantQualite(){
            if (this.selectedEnfants.qualiteVo == null) {
            this.errorMessages.push('Qualite de la enfant est  invalide');
             this.validEnfantQualite = false;
            } else {
            this.validEnfantQualite = true;
            }
            }

            private validateEnfantAdherent(){
            if (this.selectedEnfants.adherentVo == null) {
            this.errorMessages.push('Adherent de la enfant est  invalide');
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
              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatCarte(etatCarte: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatCarte', 'add');
                       if(isPermistted){
         this.selectedEtatCarte = new EtatCarteVo();
        this.createEtatCarteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatefonction(fonction: string) {
                      const isPermistted = await this.roleService.isPermitted('Fonction', 'add');
                       if(isPermistted){
         this.selectedFonction = new FonctionVo();
        this.createFonctionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestatut(statut: string) {
                      const isPermistted = await this.roleService.isPermitted('Statut', 'add');
                       if(isPermistted){
         this.selectedStatut = new StatutVo();
        this.createStatutDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createAdherentDialog  = false;
    this.setValidation(true);
}

// getters and setters

get adherents(): Array<AdherentVo> {
    return this.adherentService.adherents;
       }
set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }

 get selectedAdherent():AdherentVo {
           return this.adherentService.selectedAdherent;
       }
    set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }

   get createAdherentDialog(): boolean {
           return this.adherentService.createAdherentDialog;

       }
    set createAdherentDialog(value: boolean) {
        this.adherentService.createAdherentDialog= value;
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
       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
       }
       get selectedEtatCarte(): EtatCarteVo {
           return this.etatCarteService.selectedEtatCarte;
       }
      set selectedEtatCarte(value: EtatCarteVo) {
        this.etatCarteService.selectedEtatCarte = value;
       }
       get etatCartes(): Array<EtatCarteVo> {
           return this.etatCarteService.etatCartes;
       }
       set etatCartes(value: Array<EtatCarteVo>) {
        this.etatCarteService.etatCartes = value;
       }
       get createEtatCarteDialog(): boolean {
           return this.etatCarteService.createEtatCarteDialog;
       }
      set createEtatCarteDialog(value: boolean) {
        this.etatCarteService.createEtatCarteDialog= value;
       }
       get selectedFonction(): FonctionVo {
           return this.fonctionService.selectedFonction;
       }
      set selectedFonction(value: FonctionVo) {
        this.fonctionService.selectedFonction = value;
       }
       get fonctions(): Array<FonctionVo> {
           return this.fonctionService.fonctions;
       }
       set fonctions(value: Array<FonctionVo>) {
        this.fonctionService.fonctions = value;
       }
       get createFonctionDialog(): boolean {
           return this.fonctionService.createFonctionDialog;
       }
      set createFonctionDialog(value: boolean) {
        this.fonctionService.createFonctionDialog= value;
       }
       get selectedStatut(): StatutVo {
           return this.statutService.selectedStatut;
       }
      set selectedStatut(value: StatutVo) {
        this.statutService.selectedStatut = value;
       }
       get statuts(): Array<StatutVo> {
           return this.statutService.statuts;
       }
       set statuts(value: Array<StatutVo>) {
        this.statutService.statuts = value;
       }
       get createStatutDialog(): boolean {
           return this.statutService.createStatutDialog;
       }
      set createStatutDialog(value: boolean) {
        this.statutService.createStatutDialog= value;
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

    get validVilleRegion(): boolean {
    return this._validVilleRegion;
    }

    set validVilleRegion(value: boolean) {
    this._validVilleRegion = value;
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

}
