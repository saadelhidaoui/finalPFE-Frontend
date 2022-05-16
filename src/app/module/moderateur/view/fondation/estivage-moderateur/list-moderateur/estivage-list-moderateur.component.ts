import {Component, OnInit} from '@angular/core';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';
import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CentreEstivageService } from '../../../../../../controller/service/CentreEstivage.service';
import { NiveauImportanceService } from '../../../../../../controller/service/NiveauImportance.service';

import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-estivage-list-moderateur',
  templateUrl: './estivage-list-moderateur.component.html',
  styleUrls: ['./estivage-list-moderateur.component.css']
})
export class EstivageListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Estivage';
     yesOrNoEnvoye :any[] =[];
     yesOrNoResultat :any[] =[];
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    centreEstivages :Array<CentreEstivageVo>;
    niveauImportances :Array<NiveauImportanceVo>;


    constructor(private datePipe: DatePipe, private estivageService: EstivageService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private centreEstivageService: CentreEstivageService
        , private niveauImportanceService: NiveauImportanceService
) { }

    ngOnInit(): void {
      this.loadEstivages();
      this.initExport();
      this.initCol();
      this.loadCentreEstivage();
      this.loadNiveauImportance();
    this.yesOrNoEnvoye =  [{label: 'Envoye', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoResultat =  [{label: 'Resultat', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEstivages(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Estivage', 'list');
        isPermistted ? this.estivageService.findAll().subscribe(estivages => this.estivages = estivages,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.estivageService.findByCriteria(this.searchEstivage).subscribe(estivages=>{
            
            this.estivages = estivages;
           // this.searchEstivage = new EstivageVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                        {field: 'centreEstivage?.libelle', header: 'Centre estivage'},
                            {field: 'numArrivee', header: 'Num arrivee'},
                            {field: 'envoye', header: 'Envoye'},
                            {field: 'dateEnvoi', header: 'Date envoi'},
                            {field: 'notes', header: 'Notes'},
                            {field: 'chargeCas', header: 'Charge cas'},
                        {field: 'niveauImportance?.libelle', header: 'Niveau importance'},
                            {field: 'resultat', header: 'Resultat'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editEstivage(estivage:EstivageVo){
        const isPermistted = await this.roleService.isPermitted('Estivage', 'edit');
         if(isPermistted){
          this.estivageService.findByIdWithAssociatedList(estivage).subscribe(res => {
           this.selectedEstivage = res;
            this.selectedEstivage.dateEnvoi = new Date(estivage.dateEnvoi);
            this.selectedEstivage.dateArchivage = new Date(estivage.dateArchivage);
            this.selectedEstivage.dateCreation = new Date(estivage.dateCreation);
            this.editEstivageDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEstivage(estivage:EstivageVo){
        const isPermistted = await this.roleService.isPermitted('Estivage', 'view');
        if(isPermistted){
           this.estivageService.findByIdWithAssociatedList(estivage).subscribe(res => {
           this.selectedEstivage = res;
            this.selectedEstivage.dateEnvoi = new Date(estivage.dateEnvoi);
            this.selectedEstivage.dateArchivage = new Date(estivage.dateArchivage);
            this.selectedEstivage.dateCreation = new Date(estivage.dateCreation);
            this.viewEstivageDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEstivage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEstivage = new EstivageVo();
            this.createEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverEstivage(estivage:EstivageVo){
const isPermistted = await this.roleService.isPermitted('Estivage', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Estivage) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.estivageService.archiver(estivage).subscribe(status=>{
const myIndex = this.estivages.indexOf(estivage);
this.estivages[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Estivage archivé',
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

public async desarchiverEstivage(estivage:EstivageVo){
const isPermistted = await this.roleService.isPermitted('Estivage', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Estivage) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.estivageService.desarchiver(estivage).subscribe(status=>{
const myIndex = this.estivages.indexOf(estivage);
this.estivages[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Estivage désarchivé',
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


    public async deleteEstivage(estivage:EstivageVo){
       const isPermistted = await this.roleService.isPermitted('Estivage', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Estivage) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.estivageService.delete(estivage).subscribe(status=>{
                          if(status > 0){
                          const position = this.estivages.indexOf(estivage);
                          position > -1 ? this.estivages.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Estivage Supprimé',
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

public async loadCentreEstivage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Estivage', 'list');
    isPermistted ? this.centreEstivageService.findAll().subscribe(centreEstivages => this.centreEstivages = centreEstivages,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadNiveauImportance(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Estivage', 'list');
    isPermistted ? this.niveauImportanceService.findAll().subscribe(niveauImportances => this.niveauImportances = niveauImportances,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEstivage(estivage: EstivageVo) {

     this.estivageService.findByIdWithAssociatedList(estivage).subscribe(
	 res => {
	       this.initDuplicateEstivage(res);
	       this.selectedEstivage = res;
	       this.selectedEstivage.id = null;
            this.createEstivageDialog = true;

});

	}

	initDuplicateEstivage(res: EstivageVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.estivages.map(e => {
    return {
                    'Reference': e.reference ,
            'Centre estivage': e.centreEstivageVo?.libelle ,
                    'Num arrivee': e.numArrivee ,
                    'Envoye': e.envoye? 'Vrai' : 'Faux' ,
                    'Date envoi': this.datePipe.transform(e.dateEnvoi , 'dd-MM-yyyy'),
                    'Notes': e.notes ,
                    'Charge cas': e.chargeCas ,
            'Niveau importance': e.niveauImportanceVo?.libelle ,
                    'Resultat': e.resultat? 'Vrai' : 'Faux' ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEstivage.reference ? this.searchEstivage.reference : environment.emptyForExport ,
        'Centre estivage': this.searchEstivage.centreEstivageVo?.libelle ? this.searchEstivage.centreEstivageVo?.libelle : environment.emptyForExport ,
            'Num arrivee': this.searchEstivage.numArrivee ? this.searchEstivage.numArrivee : environment.emptyForExport ,
            'Envoye': this.searchEstivage.envoye ? (this.searchEstivage.envoye ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date envoi Min': this.searchEstivage.dateEnvoiMin ? this.datePipe.transform(this.searchEstivage.dateEnvoiMin , this.dateFormat) : environment.emptyForExport ,
            'Date envoi Max': this.searchEstivage.dateEnvoiMax ? this.datePipe.transform(this.searchEstivage.dateEnvoiMax , this.dateFormat) : environment.emptyForExport ,
            'Notes': this.searchEstivage.notes ? this.searchEstivage.notes : environment.emptyForExport ,
            'Charge cas': this.searchEstivage.chargeCas ? this.searchEstivage.chargeCas : environment.emptyForExport ,
        'Niveau importance': this.searchEstivage.niveauImportanceVo?.libelle ? this.searchEstivage.niveauImportanceVo?.libelle : environment.emptyForExport ,
            'Resultat': this.searchEstivage.resultat ? (this.searchEstivage.resultat ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Archive': this.searchEstivage.archive ? (this.searchEstivage.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEstivage.dateArchivageMin ? this.datePipe.transform(this.searchEstivage.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEstivage.dateArchivageMax ? this.datePipe.transform(this.searchEstivage.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEstivage.dateCreationMin ? this.datePipe.transform(this.searchEstivage.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEstivage.dateCreationMax ? this.datePipe.transform(this.searchEstivage.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEstivage.admin ? (this.searchEstivage.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEstivage.visible ? (this.searchEstivage.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEstivage.username ? this.searchEstivage.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get estivages(): Array<EstivageVo> {
           return this.estivageService.estivages;
       }
    set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }

    get estivageSelections(): Array<EstivageVo> {
           return this.estivageService.estivageSelections;
       }
    set estivageSelections(value: Array<EstivageVo>) {
        this.estivageService.estivageSelections = value;
       }
   
     


    get selectedEstivage():EstivageVo {
           return this.estivageService.selectedEstivage;
       }
    set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
       }
    
    get createEstivageDialog():boolean {
           return this.estivageService.createEstivageDialog;
       }
    set createEstivageDialog(value: boolean) {
        this.estivageService.createEstivageDialog= value;
       }
    
    get editEstivageDialog():boolean {
           return this.estivageService.editEstivageDialog;
       }
    set editEstivageDialog(value: boolean) {
        this.estivageService.editEstivageDialog= value;
       }
    get viewEstivageDialog():boolean {
           return this.estivageService.viewEstivageDialog;
       }
    set viewEstivageDialog(value: boolean) {
        this.estivageService.viewEstivageDialog = value;
       }
       
     get searchEstivage(): EstivageVo {
        return this.estivageService.searchEstivage;
       }
    set searchEstivage(value: EstivageVo) {
        this.estivageService.searchEstivage = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
