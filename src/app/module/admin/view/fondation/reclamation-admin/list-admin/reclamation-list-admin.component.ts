import {Component, OnInit} from '@angular/core';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';
import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { AdherentService } from '../../../../../../controller/service/Adherent.service';
import { EtatReclamationService } from '../../../../../../controller/service/EtatReclamation.service';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {PieceJointeReclamationVo} from '../../../../../../controller/model/PieceJointeReclamation.model';
import {EtatReclamationVo} from '../../../../../../controller/model/EtatReclamation.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-reclamation-list-admin',
  templateUrl: './reclamation-list-admin.component.html',
  styleUrls: ['./reclamation-list-admin.component.css']
})
export class ReclamationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Reclamation';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    adherents :Array<AdherentVo>;
    etatReclamations :Array<EtatReclamationVo>;


    constructor(private datePipe: DatePipe, private reclamationService: ReclamationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private adherentService: AdherentService
        , private etatReclamationService: EtatReclamationService
) { }

    ngOnInit(): void {
      this.loadReclamations();
      this.initExport();
      this.initCol();
      this.loadAdherent();
      this.loadEtatReclamation();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadReclamations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
        isPermistted ? this.reclamationService.findAll().subscribe(reclamations => this.reclamations = reclamations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.reclamationService.findByCriteria(this.searchReclamation).subscribe(reclamations=>{
            
            this.reclamations = reclamations;
           // this.searchReclamation = new ReclamationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'adherent?.username', header: 'Adherent'},
                        {field: 'etatReclamation?.libelle', header: 'Etat reclamation'},
                            {field: 'dateReclamation', header: 'Date reclamation'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editReclamation(reclamation:ReclamationVo){
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'edit');
         if(isPermistted){
          this.reclamationService.findByIdWithAssociatedList(reclamation).subscribe(res => {
           this.selectedReclamation = res;
            this.selectedReclamation.dateReclamation = new Date(reclamation.dateReclamation);
            this.selectedReclamation.dateArchivage = new Date(reclamation.dateArchivage);
            this.selectedReclamation.dateCreation = new Date(reclamation.dateCreation);
            this.editReclamationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewReclamation(reclamation:ReclamationVo){
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'view');
        if(isPermistted){
           this.reclamationService.findByIdWithAssociatedList(reclamation).subscribe(res => {
           this.selectedReclamation = res;
            this.selectedReclamation.dateReclamation = new Date(reclamation.dateReclamation);
            this.selectedReclamation.dateArchivage = new Date(reclamation.dateArchivage);
            this.selectedReclamation.dateCreation = new Date(reclamation.dateCreation);
            this.viewReclamationDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateReclamation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedReclamation = new ReclamationVo();
            this.createReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverReclamation(reclamation:ReclamationVo){
const isPermistted = await this.roleService.isPermitted('Reclamation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Reclamation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.reclamationService.archiver(reclamation).subscribe(status=>{
const myIndex = this.reclamations.indexOf(reclamation);
this.reclamations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Reclamation archivé',
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

public async desarchiverReclamation(reclamation:ReclamationVo){
const isPermistted = await this.roleService.isPermitted('Reclamation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Reclamation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.reclamationService.desarchiver(reclamation).subscribe(status=>{
const myIndex = this.reclamations.indexOf(reclamation);
this.reclamations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Reclamation désarchivé',
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


    public async deleteReclamation(reclamation:ReclamationVo){
       const isPermistted = await this.roleService.isPermitted('Reclamation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Reclamation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.reclamationService.delete(reclamation).subscribe(status=>{
                          if(status > 0){
                          const position = this.reclamations.indexOf(reclamation);
                          position > -1 ? this.reclamations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Reclamation Supprimé',
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

public async loadAdherent(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
    isPermistted ? this.adherentService.findAll().subscribe(adherents => this.adherents = adherents,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatReclamation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
    isPermistted ? this.etatReclamationService.findAll().subscribe(etatReclamations => this.etatReclamations = etatReclamations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateReclamation(reclamation: ReclamationVo) {

     this.reclamationService.findByIdWithAssociatedList(reclamation).subscribe(
	 res => {
	       this.initDuplicateReclamation(res);
	       this.selectedReclamation = res;
	       this.selectedReclamation.id = null;
            this.createReclamationDialog = true;

});

	}

	initDuplicateReclamation(res: ReclamationVo) {
        if (res.pieceJointeReclamationsVo != null) {
             res.pieceJointeReclamationsVo.forEach(d => { d.reclamationVo = null; d.id = null; });
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
    this.exportData = this.reclamations.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
                    'Description': e.description ,
            'Adherent': e.adherentVo?.username ,
            'Etat reclamation': e.etatReclamationVo?.libelle ,
                    'Date reclamation': this.datePipe.transform(e.dateReclamation , 'dd-MM-yyyy'),
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchReclamation.reference ? this.searchReclamation.reference : environment.emptyForExport ,
            'Libelle': this.searchReclamation.libelle ? this.searchReclamation.libelle : environment.emptyForExport ,
            'Description': this.searchReclamation.description ? this.searchReclamation.description : environment.emptyForExport ,
        'Adherent': this.searchReclamation.adherentVo?.username ? this.searchReclamation.adherentVo?.username : environment.emptyForExport ,
        'Etat reclamation': this.searchReclamation.etatReclamationVo?.libelle ? this.searchReclamation.etatReclamationVo?.libelle : environment.emptyForExport ,
            'Date reclamation Min': this.searchReclamation.dateReclamationMin ? this.datePipe.transform(this.searchReclamation.dateReclamationMin , this.dateFormat) : environment.emptyForExport ,
            'Date reclamation Max': this.searchReclamation.dateReclamationMax ? this.datePipe.transform(this.searchReclamation.dateReclamationMax , this.dateFormat) : environment.emptyForExport ,
            'Piece jointe reclamations Min': this.searchReclamation.pieceJointeReclamationsMin ? this.searchReclamation.pieceJointeReclamationsMin : environment.emptyForExport ,
            'Piece jointe reclamations Max': this.searchReclamation.pieceJointeReclamationsMax ? this.searchReclamation.pieceJointeReclamationsMax : environment.emptyForExport ,
            'Archive': this.searchReclamation.archive ? (this.searchReclamation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchReclamation.dateArchivageMin ? this.datePipe.transform(this.searchReclamation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchReclamation.dateArchivageMax ? this.datePipe.transform(this.searchReclamation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchReclamation.dateCreationMin ? this.datePipe.transform(this.searchReclamation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchReclamation.dateCreationMax ? this.datePipe.transform(this.searchReclamation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchReclamation.admin ? (this.searchReclamation.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchReclamation.visible ? (this.searchReclamation.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchReclamation.username ? this.searchReclamation.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get reclamations(): Array<ReclamationVo> {
           return this.reclamationService.reclamations;
       }
    set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }

    get reclamationSelections(): Array<ReclamationVo> {
           return this.reclamationService.reclamationSelections;
       }
    set reclamationSelections(value: Array<ReclamationVo>) {
        this.reclamationService.reclamationSelections = value;
       }
   
     


    get selectedReclamation():ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }
    
    get createReclamationDialog():boolean {
           return this.reclamationService.createReclamationDialog;
       }
    set createReclamationDialog(value: boolean) {
        this.reclamationService.createReclamationDialog= value;
       }
    
    get editReclamationDialog():boolean {
           return this.reclamationService.editReclamationDialog;
       }
    set editReclamationDialog(value: boolean) {
        this.reclamationService.editReclamationDialog= value;
       }
    get viewReclamationDialog():boolean {
           return this.reclamationService.viewReclamationDialog;
       }
    set viewReclamationDialog(value: boolean) {
        this.reclamationService.viewReclamationDialog = value;
       }
       
     get searchReclamation(): ReclamationVo {
        return this.reclamationService.searchReclamation;
       }
    set searchReclamation(value: ReclamationVo) {
        this.reclamationService.searchReclamation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
