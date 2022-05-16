import {Component, OnInit} from '@angular/core';
import {PrestationService} from '../../../../../../controller/service/Prestation.service';
import {PrestationVo} from '../../../../../../controller/model/Prestation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtatPrestationService } from '../../../../../../controller/service/EtatPrestation.service';
import { NiveauImportanceService } from '../../../../../../controller/service/NiveauImportance.service';
import { TypePrestationService } from '../../../../../../controller/service/TypePrestation.service';
import { AdherentService } from '../../../../../../controller/service/Adherent.service';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {EtatPrestationVo} from '../../../../../../controller/model/EtatPrestation.model';
import {PieceJointePrestationVo} from '../../../../../../controller/model/PieceJointePrestation.model';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import {TypePrestationVo} from '../../../../../../controller/model/TypePrestation.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-prestation-list-chercheur',
  templateUrl: './prestation-list-chercheur.component.html',
  styleUrls: ['./prestation-list-chercheur.component.css']
})
export class PrestationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Prestation';
     yesOrNoEnvoye :any[] =[];
     yesOrNoResultat :any[] =[];
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    etatPrestations :Array<EtatPrestationVo>;
    niveauImportances :Array<NiveauImportanceVo>;
    typePrestations :Array<TypePrestationVo>;
    adherents :Array<AdherentVo>;


    constructor(private datePipe: DatePipe, private prestationService: PrestationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etatPrestationService: EtatPrestationService
        , private niveauImportanceService: NiveauImportanceService
        , private typePrestationService: TypePrestationService
        , private adherentService: AdherentService
) { }

    ngOnInit(): void {
      this.loadPrestations();
      this.initExport();
      this.initCol();
      this.loadEtatPrestation();
      this.loadNiveauImportance();
      this.loadTypePrestation();
      this.loadAdherent();
    this.yesOrNoEnvoye =  [{label: 'Envoye', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoResultat =  [{label: 'Resultat', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPrestations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Prestation', 'list');
        isPermistted ? this.prestationService.findAll().subscribe(prestations => this.prestations = prestations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.prestationService.findByCriteria(this.searchPrestation).subscribe(prestations=>{
            
            this.prestations = prestations;
           // this.searchPrestation = new PrestationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'numArrivee', header: 'Num arrivee'},
                            {field: 'envoye', header: 'Envoye'},
                            {field: 'dateEnvoi', header: 'Date envoi'},
                        {field: 'etatPrestation?.libelle', header: 'Etat prestation'},
                            {field: 'dateTraitement', header: 'Date traitement'},
                            {field: 'chargeCas', header: 'Charge cas'},
                        {field: 'niveauImportance?.libelle', header: 'Niveau importance'},
                        {field: 'typePrestation?.libelle', header: 'Type prestation'},
                            {field: 'resultat', header: 'Resultat'},
                        {field: 'adherent?.username', header: 'Adherent'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editPrestation(prestation:PrestationVo){
        const isPermistted = await this.roleService.isPermitted('Prestation', 'edit');
         if(isPermistted){
          this.prestationService.findByIdWithAssociatedList(prestation).subscribe(res => {
           this.selectedPrestation = res;
            this.selectedPrestation.dateEnvoi = new Date(prestation.dateEnvoi);
            this.selectedPrestation.dateTraitement = new Date(prestation.dateTraitement);
            this.selectedPrestation.dateArchivage = new Date(prestation.dateArchivage);
            this.selectedPrestation.dateCreation = new Date(prestation.dateCreation);
            this.editPrestationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPrestation(prestation:PrestationVo){
        const isPermistted = await this.roleService.isPermitted('Prestation', 'view');
        if(isPermistted){
           this.prestationService.findByIdWithAssociatedList(prestation).subscribe(res => {
           this.selectedPrestation = res;
            this.selectedPrestation.dateEnvoi = new Date(prestation.dateEnvoi);
            this.selectedPrestation.dateTraitement = new Date(prestation.dateTraitement);
            this.selectedPrestation.dateArchivage = new Date(prestation.dateArchivage);
            this.selectedPrestation.dateCreation = new Date(prestation.dateCreation);
            this.viewPrestationDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePrestation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPrestation = new PrestationVo();
            this.createPrestationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePrestation(prestation:PrestationVo){
       const isPermistted = await this.roleService.isPermitted('Prestation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Prestation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.prestationService.delete(prestation).subscribe(status=>{
                          if(status > 0){
                          const position = this.prestations.indexOf(prestation);
                          position > -1 ? this.prestations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Prestation Supprimé',
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

public async loadEtatPrestation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Prestation', 'list');
    isPermistted ? this.etatPrestationService.findAll().subscribe(etatPrestations => this.etatPrestations = etatPrestations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadNiveauImportance(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Prestation', 'list');
    isPermistted ? this.niveauImportanceService.findAll().subscribe(niveauImportances => this.niveauImportances = niveauImportances,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypePrestation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Prestation', 'list');
    isPermistted ? this.typePrestationService.findAll().subscribe(typePrestations => this.typePrestations = typePrestations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadAdherent(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Prestation', 'list');
    isPermistted ? this.adherentService.findAll().subscribe(adherents => this.adherents = adherents,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePrestation(prestation: PrestationVo) {

     this.prestationService.findByIdWithAssociatedList(prestation).subscribe(
	 res => {
	       this.initDuplicatePrestation(res);
	       this.selectedPrestation = res;
	       this.selectedPrestation.id = null;
            this.createPrestationDialog = true;

});

	}

	initDuplicatePrestation(res: PrestationVo) {
        if (res.pieceJointePrestationsVo != null) {
             res.pieceJointePrestationsVo.forEach(d => { d.prestationVo = null; d.id = null; });
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
    this.exportData = this.prestations.map(e => {
    return {
                    'Reference': e.reference ,
                    'Num arrivee': e.numArrivee ,
                    'Envoye': e.envoye? 'Vrai' : 'Faux' ,
                    'Date envoi': this.datePipe.transform(e.dateEnvoi , 'dd-MM-yyyy'),
            'Etat prestation': e.etatPrestationVo?.libelle ,
                    'Date traitement': this.datePipe.transform(e.dateTraitement , 'dd-MM-yyyy'),
                    'Charge cas': e.chargeCas ,
            'Niveau importance': e.niveauImportanceVo?.libelle ,
            'Type prestation': e.typePrestationVo?.libelle ,
                    'Resultat': e.resultat? 'Vrai' : 'Faux' ,
                    'Notes': e.notes ,
            'Adherent': e.adherentVo?.username ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchPrestation.reference ? this.searchPrestation.reference : environment.emptyForExport ,
            'Num arrivee': this.searchPrestation.numArrivee ? this.searchPrestation.numArrivee : environment.emptyForExport ,
            'Envoye': this.searchPrestation.envoye ? (this.searchPrestation.envoye ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date envoi Min': this.searchPrestation.dateEnvoiMin ? this.datePipe.transform(this.searchPrestation.dateEnvoiMin , this.dateFormat) : environment.emptyForExport ,
            'Date envoi Max': this.searchPrestation.dateEnvoiMax ? this.datePipe.transform(this.searchPrestation.dateEnvoiMax , this.dateFormat) : environment.emptyForExport ,
        'Etat prestation': this.searchPrestation.etatPrestationVo?.libelle ? this.searchPrestation.etatPrestationVo?.libelle : environment.emptyForExport ,
            'Date traitement Min': this.searchPrestation.dateTraitementMin ? this.datePipe.transform(this.searchPrestation.dateTraitementMin , this.dateFormat) : environment.emptyForExport ,
            'Date traitement Max': this.searchPrestation.dateTraitementMax ? this.datePipe.transform(this.searchPrestation.dateTraitementMax , this.dateFormat) : environment.emptyForExport ,
            'Charge cas': this.searchPrestation.chargeCas ? this.searchPrestation.chargeCas : environment.emptyForExport ,
        'Niveau importance': this.searchPrestation.niveauImportanceVo?.libelle ? this.searchPrestation.niveauImportanceVo?.libelle : environment.emptyForExport ,
        'Type prestation': this.searchPrestation.typePrestationVo?.libelle ? this.searchPrestation.typePrestationVo?.libelle : environment.emptyForExport ,
            'Resultat': this.searchPrestation.resultat ? (this.searchPrestation.resultat ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Notes': this.searchPrestation.notes ? this.searchPrestation.notes : environment.emptyForExport ,
        'Adherent': this.searchPrestation.adherentVo?.username ? this.searchPrestation.adherentVo?.username : environment.emptyForExport ,
            'Piece jointe prestations Min': this.searchPrestation.pieceJointePrestationsMin ? this.searchPrestation.pieceJointePrestationsMin : environment.emptyForExport ,
            'Piece jointe prestations Max': this.searchPrestation.pieceJointePrestationsMax ? this.searchPrestation.pieceJointePrestationsMax : environment.emptyForExport ,
            'Archive': this.searchPrestation.archive ? (this.searchPrestation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPrestation.dateArchivageMin ? this.datePipe.transform(this.searchPrestation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPrestation.dateArchivageMax ? this.datePipe.transform(this.searchPrestation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPrestation.dateCreationMin ? this.datePipe.transform(this.searchPrestation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPrestation.dateCreationMax ? this.datePipe.transform(this.searchPrestation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPrestation.admin ? (this.searchPrestation.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPrestation.visible ? (this.searchPrestation.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPrestation.username ? this.searchPrestation.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get prestations(): Array<PrestationVo> {
           return this.prestationService.prestations;
       }
    set prestations(value: Array<PrestationVo>) {
        this.prestationService.prestations = value;
       }

    get prestationSelections(): Array<PrestationVo> {
           return this.prestationService.prestationSelections;
       }
    set prestationSelections(value: Array<PrestationVo>) {
        this.prestationService.prestationSelections = value;
       }
   
     


    get selectedPrestation():PrestationVo {
           return this.prestationService.selectedPrestation;
       }
    set selectedPrestation(value: PrestationVo) {
        this.prestationService.selectedPrestation = value;
       }
    
    get createPrestationDialog():boolean {
           return this.prestationService.createPrestationDialog;
       }
    set createPrestationDialog(value: boolean) {
        this.prestationService.createPrestationDialog= value;
       }
    
    get editPrestationDialog():boolean {
           return this.prestationService.editPrestationDialog;
       }
    set editPrestationDialog(value: boolean) {
        this.prestationService.editPrestationDialog= value;
       }
    get viewPrestationDialog():boolean {
           return this.prestationService.viewPrestationDialog;
       }
    set viewPrestationDialog(value: boolean) {
        this.prestationService.viewPrestationDialog = value;
       }
       
     get searchPrestation(): PrestationVo {
        return this.prestationService.searchPrestation;
       }
    set searchPrestation(value: PrestationVo) {
        this.prestationService.searchPrestation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
