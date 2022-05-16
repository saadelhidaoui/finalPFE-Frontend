import {Component, OnInit} from '@angular/core';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { VilleService } from '../../../../../../controller/service/Ville.service';
import { QualiteService } from '../../../../../../controller/service/Qualite.service';
import { EtatCarteService } from '../../../../../../controller/service/EtatCarte.service';
import { StatutService } from '../../../../../../controller/service/Statut.service';
import { FonctionService } from '../../../../../../controller/service/Fonction.service';

import {StatutVo} from '../../../../../../controller/model/Statut.model';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {EtatCarteVo} from '../../../../../../controller/model/EtatCarte.model';
import {FonctionVo} from '../../../../../../controller/model/Fonction.model';
import {EnfantVo} from '../../../../../../controller/model/Enfant.model';
import {ConjointVo} from '../../../../../../controller/model/Conjoint.model';
import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {PieceJointeAdherentVo} from '../../../../../../controller/model/PieceJointeAdherent.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-adherent-list-moderateur',
  templateUrl: './adherent-list-moderateur.component.html',
  styleUrls: ['./adherent-list-moderateur.component.css']
})
export class AdherentListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Adherent';
     yesOrNoCredentialsNonExpired :any[] =[];
     yesOrNoEnabled :any[] =[];
     yesOrNoAccountNonExpired :any[] =[];
     yesOrNoAccountNonLocked :any[] =[];
     yesOrNoPasswordChanged :any[] =[];
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    villes :Array<VilleVo>;
    qualites :Array<QualiteVo>;
    etatCartes :Array<EtatCarteVo>;
    statuts :Array<StatutVo>;
    fonctions :Array<FonctionVo>;


    constructor(private datePipe: DatePipe, private adherentService: AdherentService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private villeService: VilleService
        , private qualiteService: QualiteService
        , private etatCarteService: EtatCarteService
        , private statutService: StatutService
        , private fonctionService: FonctionService
) { }

    ngOnInit(): void {
      this.loadAdherents();
      this.initExport();
      this.initCol();
      this.loadVille();
      this.loadQualite();
      this.loadEtatCarte();
      this.loadStatut();
      this.loadFonction();
    this.yesOrNoCredentialsNonExpired =  [{label: 'CredentialsNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoEnabled =  [{label: 'Enabled', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonExpired =  [{label: 'AccountNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonLocked =  [{label: 'AccountNonLocked', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoPasswordChanged =  [{label: 'PasswordChanged', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadAdherents(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Adherent', 'list');
        isPermistted ? this.adherentService.findAll().subscribe(adherents => this.adherents = adherents,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.adherentService.findByCriteria(this.searchAdherent).subscribe(adherents=>{
            
            this.adherents = adherents;
           // this.searchAdherent = new AdherentVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'numAdhesion', header: 'Num adhesion'},
                            {field: 'cin', header: 'Cin'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'origine', header: 'Origine'},
                        {field: 'ville?.libelle', header: 'Ville'},
                            {field: 'telephone', header: 'Telephone'},
                        {field: 'qualite?.libelle', header: 'Qualite'},
                            {field: 'adresse', header: 'Adresse'},
                            {field: 'ppr', header: 'Ppr'},
                            {field: 'dateNaissance', header: 'Date naissance'},
                        {field: 'etatCarte?.libelle', header: 'Etat carte'},
                            {field: 'dateArrivee', header: 'Date arrivee'},
                            {field: 'dateReception', header: 'Date reception'},
                        {field: 'statut?.libelle', header: 'Statut'},
                        {field: 'fonction?.libelle', header: 'Fonction'},
                            {field: 'numeroMatricule', header: 'Numero matricule'},
                            {field: 'emailPrincipale', header: 'Email principale'},
                            {field: 'credentialsNonExpired', header: 'Credentials non expired'},
                            {field: 'enabled', header: 'Enabled'},
                            {field: 'accountNonExpired', header: 'Account non expired'},
                            {field: 'accountNonLocked', header: 'Account non locked'},
                            {field: 'passwordChanged', header: 'Password changed'},
                            {field: 'createdAt', header: 'Created at'},
                            {field: 'updatedAt', header: 'Updated at'},
                            {field: 'username', header: 'Username'},
                            {field: 'password', header: 'Password'},
                            {field: 'role', header: 'Role'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editAdherent(adherent:AdherentVo){
        const isPermistted = await this.roleService.isPermitted('Adherent', 'edit');
         if(isPermistted){
          this.adherentService.findByIdWithAssociatedList(adherent).subscribe(res => {
           this.selectedAdherent = res;
            this.selectedAdherent.dateNaissance = new Date(adherent.dateNaissance);
            this.selectedAdherent.dateArrivee = new Date(adherent.dateArrivee);
            this.selectedAdherent.dateReception = new Date(adherent.dateReception);
            this.selectedAdherent.createdAt = new Date(adherent.createdAt);
            this.selectedAdherent.updatedAt = new Date(adherent.updatedAt);
            this.selectedAdherent.dateArchivage = new Date(adherent.dateArchivage);
            this.selectedAdherent.dateCreation = new Date(adherent.dateCreation);
            this.editAdherentDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewAdherent(adherent:AdherentVo){
        const isPermistted = await this.roleService.isPermitted('Adherent', 'view');
        if(isPermistted){
           this.adherentService.findByIdWithAssociatedList(adherent).subscribe(res => {
           this.selectedAdherent = res;
            this.selectedAdherent.dateNaissance = new Date(adherent.dateNaissance);
            this.selectedAdherent.dateArrivee = new Date(adherent.dateArrivee);
            this.selectedAdherent.dateReception = new Date(adherent.dateReception);
            this.selectedAdherent.createdAt = new Date(adherent.createdAt);
            this.selectedAdherent.updatedAt = new Date(adherent.updatedAt);
            this.selectedAdherent.dateArchivage = new Date(adherent.dateArchivage);
            this.selectedAdherent.dateCreation = new Date(adherent.dateCreation);
            this.viewAdherentDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateAdherent(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedAdherent = new AdherentVo();
            this.createAdherentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverAdherent(adherent:AdherentVo){
const isPermistted = await this.roleService.isPermitted('Adherent', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Adherent) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.adherentService.archiver(adherent).subscribe(status=>{
const myIndex = this.adherents.indexOf(adherent);
this.adherents[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Adherent archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverAdherent(adherent:AdherentVo){
const isPermistted = await this.roleService.isPermitted('Adherent', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Adherent) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.adherentService.desarchiver(adherent).subscribe(status=>{
const myIndex = this.adherents.indexOf(adherent);
this.adherents[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Adherent désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteAdherent(adherent:AdherentVo){
       const isPermistted = await this.roleService.isPermitted('Adherent', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Adherent) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.adherentService.delete(adherent).subscribe(status=>{
                          if(status > 0){
                          const position = this.adherents.indexOf(adherent);
                          position > -1 ? this.adherents.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Adherent Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadVille(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Adherent', 'list');
    isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadQualite(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Adherent', 'list');
    isPermistted ? this.qualiteService.findAll().subscribe(qualites => this.qualites = qualites,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatCarte(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Adherent', 'list');
    isPermistted ? this.etatCarteService.findAll().subscribe(etatCartes => this.etatCartes = etatCartes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadStatut(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Adherent', 'list');
    isPermistted ? this.statutService.findAll().subscribe(statuts => this.statuts = statuts,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFonction(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Adherent', 'list');
    isPermistted ? this.fonctionService.findAll().subscribe(fonctions => this.fonctions = fonctions,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateAdherent(adherent: AdherentVo) {

     this.adherentService.findByIdWithAssociatedList(adherent).subscribe(
	 res => {
	       this.initDuplicateAdherent(res);
	       this.selectedAdherent = res;
	       this.selectedAdherent.id = null;
            this.createAdherentDialog = true;

});

	}

	initDuplicateAdherent(res: AdherentVo) {
        if (res.conjointsVo != null) {
             res.conjointsVo.forEach(d => { d.adherentVo = null; d.id = null; });
                }
        if (res.enfantsVo != null) {
             res.enfantsVo.forEach(d => { d.adherentVo = null; d.id = null; });
                }
        if (res.pieceJointeAdherentsVo != null) {
             res.pieceJointeAdherentsVo.forEach(d => { d.adherentVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.adherents.map(e => {
    return {
                    'Num adhesion': e.numAdhesion ,
                    'Cin': e.cin ,
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
                    'Origine': e.origine ,
            'Ville': e.villeVo?.libelle ,
                    'Telephone': e.telephone ,
            'Qualite': e.qualiteVo?.libelle ,
                    'Adresse': e.adresse ,
                    'Ppr': e.ppr ,
                    'Date naissance': this.datePipe.transform(e.dateNaissance , 'dd-MM-yyyy'),
            'Etat carte': e.etatCarteVo?.libelle ,
                    'Date arrivee': this.datePipe.transform(e.dateArrivee , 'dd-MM-yyyy'),
                    'Date reception': this.datePipe.transform(e.dateReception , 'dd-MM-yyyy'),
            'Statut': e.statutVo?.libelle ,
            'Fonction': e.fonctionVo?.libelle ,
                    'Numero matricule': e.numeroMatricule ,
                    'Email principale': e.emailPrincipale ,
                    'Credentials non expired': e.credentialsNonExpired? 'Vrai' : 'Faux' ,
                    'Enabled': e.enabled? 'Vrai' : 'Faux' ,
                    'Account non expired': e.accountNonExpired? 'Vrai' : 'Faux' ,
                    'Account non locked': e.accountNonLocked? 'Vrai' : 'Faux' ,
                    'Password changed': e.passwordChanged? 'Vrai' : 'Faux' ,
                    'Created at': this.datePipe.transform(e.createdAt , 'dd-MM-yyyy'),
                    'Updated at': this.datePipe.transform(e.updatedAt , 'dd-MM-yyyy'),
                    'Username': e.username ,
                    'Password': e.password ,
                    'Role': e.role ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
     }
      });

      this.criteriaData = [{
            'Num adhesion': this.searchAdherent.numAdhesion ? this.searchAdherent.numAdhesion : environment.emptyForExport ,
            'Cin': this.searchAdherent.cin ? this.searchAdherent.cin : environment.emptyForExport ,
            'Nom': this.searchAdherent.nom ? this.searchAdherent.nom : environment.emptyForExport ,
            'Prenom': this.searchAdherent.prenom ? this.searchAdherent.prenom : environment.emptyForExport ,
            'Origine': this.searchAdherent.origine ? this.searchAdherent.origine : environment.emptyForExport ,
        'Ville': this.searchAdherent.villeVo?.libelle ? this.searchAdherent.villeVo?.libelle : environment.emptyForExport ,
            'Telephone': this.searchAdherent.telephone ? this.searchAdherent.telephone : environment.emptyForExport ,
        'Qualite': this.searchAdherent.qualiteVo?.libelle ? this.searchAdherent.qualiteVo?.libelle : environment.emptyForExport ,
            'Adresse': this.searchAdherent.adresse ? this.searchAdherent.adresse : environment.emptyForExport ,
            'Ppr': this.searchAdherent.ppr ? this.searchAdherent.ppr : environment.emptyForExport ,
            'Date naissance Min': this.searchAdherent.dateNaissanceMin ? this.datePipe.transform(this.searchAdherent.dateNaissanceMin , this.dateFormat) : environment.emptyForExport ,
            'Date naissance Max': this.searchAdherent.dateNaissanceMax ? this.datePipe.transform(this.searchAdherent.dateNaissanceMax , this.dateFormat) : environment.emptyForExport ,
        'Etat carte': this.searchAdherent.etatCarteVo?.libelle ? this.searchAdherent.etatCarteVo?.libelle : environment.emptyForExport ,
            'Date arrivee Min': this.searchAdherent.dateArriveeMin ? this.datePipe.transform(this.searchAdherent.dateArriveeMin , this.dateFormat) : environment.emptyForExport ,
            'Date arrivee Max': this.searchAdherent.dateArriveeMax ? this.datePipe.transform(this.searchAdherent.dateArriveeMax , this.dateFormat) : environment.emptyForExport ,
            'Date reception Min': this.searchAdherent.dateReceptionMin ? this.datePipe.transform(this.searchAdherent.dateReceptionMin , this.dateFormat) : environment.emptyForExport ,
            'Date reception Max': this.searchAdherent.dateReceptionMax ? this.datePipe.transform(this.searchAdherent.dateReceptionMax , this.dateFormat) : environment.emptyForExport ,
        'Statut': this.searchAdherent.statutVo?.libelle ? this.searchAdherent.statutVo?.libelle : environment.emptyForExport ,
        'Fonction': this.searchAdherent.fonctionVo?.libelle ? this.searchAdherent.fonctionVo?.libelle : environment.emptyForExport ,
            'Conjoints Min': this.searchAdherent.conjointsMin ? this.searchAdherent.conjointsMin : environment.emptyForExport ,
            'Conjoints Max': this.searchAdherent.conjointsMax ? this.searchAdherent.conjointsMax : environment.emptyForExport ,
            'Piece jointe adherents Min': this.searchAdherent.pieceJointeAdherentsMin ? this.searchAdherent.pieceJointeAdherentsMin : environment.emptyForExport ,
            'Piece jointe adherents Max': this.searchAdherent.pieceJointeAdherentsMax ? this.searchAdherent.pieceJointeAdherentsMax : environment.emptyForExport ,
            'Numero matricule': this.searchAdherent.numeroMatricule ? this.searchAdherent.numeroMatricule : environment.emptyForExport ,
            'Email principale': this.searchAdherent.emailPrincipale ? this.searchAdherent.emailPrincipale : environment.emptyForExport ,
            'Credentials non expired': this.searchAdherent.credentialsNonExpired ? (this.searchAdherent.credentialsNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Enabled': this.searchAdherent.enabled ? (this.searchAdherent.enabled ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non expired': this.searchAdherent.accountNonExpired ? (this.searchAdherent.accountNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non locked': this.searchAdherent.accountNonLocked ? (this.searchAdherent.accountNonLocked ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Password changed': this.searchAdherent.passwordChanged ? (this.searchAdherent.passwordChanged ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Created at Min': this.searchAdherent.createdAtMin ? this.datePipe.transform(this.searchAdherent.createdAtMin , this.dateFormat) : environment.emptyForExport ,
            'Created at Max': this.searchAdherent.createdAtMax ? this.datePipe.transform(this.searchAdherent.createdAtMax , this.dateFormat) : environment.emptyForExport ,
            'Updated at Min': this.searchAdherent.updatedAtMin ? this.datePipe.transform(this.searchAdherent.updatedAtMin , this.dateFormat) : environment.emptyForExport ,
            'Updated at Max': this.searchAdherent.updatedAtMax ? this.datePipe.transform(this.searchAdherent.updatedAtMax , this.dateFormat) : environment.emptyForExport ,
            'Username': this.searchAdherent.username ? this.searchAdherent.username : environment.emptyForExport ,
            'Password': this.searchAdherent.password ? this.searchAdherent.password : environment.emptyForExport ,
            'Role': this.searchAdherent.role ? this.searchAdherent.role : environment.emptyForExport ,
            'Archive': this.searchAdherent.archive ? (this.searchAdherent.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchAdherent.dateArchivageMin ? this.datePipe.transform(this.searchAdherent.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchAdherent.dateArchivageMax ? this.datePipe.transform(this.searchAdherent.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchAdherent.dateCreationMin ? this.datePipe.transform(this.searchAdherent.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchAdherent.dateCreationMax ? this.datePipe.transform(this.searchAdherent.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchAdherent.admin ? (this.searchAdherent.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchAdherent.visible ? (this.searchAdherent.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get adherents(): Array<AdherentVo> {
           return this.adherentService.adherents;
       }
    set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }

    get adherentSelections(): Array<AdherentVo> {
           return this.adherentService.adherentSelections;
       }
    set adherentSelections(value: Array<AdherentVo>) {
        this.adherentService.adherentSelections = value;
       }
   
     


    get selectedAdherent():AdherentVo {
           return this.adherentService.selectedAdherent;
       }
    set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }
    
    get createAdherentDialog():boolean {
           return this.adherentService.createAdherentDialog;
       }
    set createAdherentDialog(value: boolean) {
        this.adherentService.createAdherentDialog= value;
       }
    
    get editAdherentDialog():boolean {
           return this.adherentService.editAdherentDialog;
       }
    set editAdherentDialog(value: boolean) {
        this.adherentService.editAdherentDialog= value;
       }
    get viewAdherentDialog():boolean {
           return this.adherentService.viewAdherentDialog;
       }
    set viewAdherentDialog(value: boolean) {
        this.adherentService.viewAdherentDialog = value;
       }
       
     get searchAdherent(): AdherentVo {
        return this.adherentService.searchAdherent;
       }
    set searchAdherent(value: AdherentVo) {
        this.adherentService.searchAdherent = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
