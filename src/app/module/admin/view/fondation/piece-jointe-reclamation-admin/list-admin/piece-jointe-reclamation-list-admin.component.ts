import {Component, OnInit} from '@angular/core';
import {PieceJointeReclamationService} from '../../../../../../controller/service/PieceJointeReclamation.service';
import {PieceJointeReclamationVo} from '../../../../../../controller/model/PieceJointeReclamation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ReclamationService } from '../../../../../../controller/service/Reclamation.service';

import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-piece-jointe-reclamation-list-admin',
  templateUrl: './piece-jointe-reclamation-list-admin.component.html',
  styleUrls: ['./piece-jointe-reclamation-list-admin.component.css']
})
export class PieceJointeReclamationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PieceJointeReclamation';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    reclamations :Array<ReclamationVo>;


    constructor(private datePipe: DatePipe, private pieceJointeReclamationService: PieceJointeReclamationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private reclamationService: ReclamationService
) { }

    ngOnInit(): void {
      this.loadPieceJointeReclamations();
      this.initExport();
      this.initCol();
      this.loadReclamation();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPieceJointeReclamations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PieceJointeReclamation', 'list');
        isPermistted ? this.pieceJointeReclamationService.findAll().subscribe(pieceJointeReclamations => this.pieceJointeReclamations = pieceJointeReclamations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.pieceJointeReclamationService.findByCriteria(this.searchPieceJointeReclamation).subscribe(pieceJointeReclamations=>{
            
            this.pieceJointeReclamations = pieceJointeReclamations;
           // this.searchPieceJointeReclamation = new PieceJointeReclamationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'path', header: 'Path'},
                        {field: 'reclamation?.reference', header: 'Reclamation'},
                            {field: 'dateAjout', header: 'Date ajout'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editPieceJointeReclamation(pieceJointeReclamation:PieceJointeReclamationVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeReclamation', 'edit');
         if(isPermistted){
          this.pieceJointeReclamationService.findByIdWithAssociatedList(pieceJointeReclamation).subscribe(res => {
           this.selectedPieceJointeReclamation = res;
            this.selectedPieceJointeReclamation.dateAjout = new Date(pieceJointeReclamation.dateAjout);
            this.selectedPieceJointeReclamation.dateArchivage = new Date(pieceJointeReclamation.dateArchivage);
            this.selectedPieceJointeReclamation.dateCreation = new Date(pieceJointeReclamation.dateCreation);
            this.editPieceJointeReclamationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPieceJointeReclamation(pieceJointeReclamation:PieceJointeReclamationVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeReclamation', 'view');
        if(isPermistted){
           this.pieceJointeReclamationService.findByIdWithAssociatedList(pieceJointeReclamation).subscribe(res => {
           this.selectedPieceJointeReclamation = res;
            this.selectedPieceJointeReclamation.dateAjout = new Date(pieceJointeReclamation.dateAjout);
            this.selectedPieceJointeReclamation.dateArchivage = new Date(pieceJointeReclamation.dateArchivage);
            this.selectedPieceJointeReclamation.dateCreation = new Date(pieceJointeReclamation.dateCreation);
            this.viewPieceJointeReclamationDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePieceJointeReclamation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPieceJointeReclamation = new PieceJointeReclamationVo();
            this.createPieceJointeReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPieceJointeReclamation(pieceJointeReclamation:PieceJointeReclamationVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeReclamation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Piece jointe reclamation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeReclamationService.archiver(pieceJointeReclamation).subscribe(status=>{
const myIndex = this.pieceJointeReclamations.indexOf(pieceJointeReclamation);
this.pieceJointeReclamations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe reclamation archivé',
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

public async desarchiverPieceJointeReclamation(pieceJointeReclamation:PieceJointeReclamationVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeReclamation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Piece jointe reclamation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeReclamationService.desarchiver(pieceJointeReclamation).subscribe(status=>{
const myIndex = this.pieceJointeReclamations.indexOf(pieceJointeReclamation);
this.pieceJointeReclamations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe reclamation désarchivé',
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


    public async deletePieceJointeReclamation(pieceJointeReclamation:PieceJointeReclamationVo){
       const isPermistted = await this.roleService.isPermitted('PieceJointeReclamation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Piece jointe reclamation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.pieceJointeReclamationService.delete(pieceJointeReclamation).subscribe(status=>{
                          if(status > 0){
                          const position = this.pieceJointeReclamations.indexOf(pieceJointeReclamation);
                          position > -1 ? this.pieceJointeReclamations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Piece jointe reclamation Supprimé',
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

public async loadReclamation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PieceJointeReclamation', 'list');
    isPermistted ? this.reclamationService.findAll().subscribe(reclamations => this.reclamations = reclamations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePieceJointeReclamation(pieceJointeReclamation: PieceJointeReclamationVo) {

     this.pieceJointeReclamationService.findByIdWithAssociatedList(pieceJointeReclamation).subscribe(
	 res => {
	       this.initDuplicatePieceJointeReclamation(res);
	       this.selectedPieceJointeReclamation = res;
	       this.selectedPieceJointeReclamation.id = null;
            this.createPieceJointeReclamationDialog = true;

});

	}

	initDuplicatePieceJointeReclamation(res: PieceJointeReclamationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.pieceJointeReclamations.map(e => {
    return {
                    'Path': e.path ,
            'Reclamation': e.reclamationVo?.reference ,
                    'Date ajout': this.datePipe.transform(e.dateAjout , 'dd-MM-yyyy'),
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Path': this.searchPieceJointeReclamation.path ? this.searchPieceJointeReclamation.path : environment.emptyForExport ,
        'Reclamation': this.searchPieceJointeReclamation.reclamationVo?.reference ? this.searchPieceJointeReclamation.reclamationVo?.reference : environment.emptyForExport ,
            'Date ajout Min': this.searchPieceJointeReclamation.dateAjoutMin ? this.datePipe.transform(this.searchPieceJointeReclamation.dateAjoutMin , this.dateFormat) : environment.emptyForExport ,
            'Date ajout Max': this.searchPieceJointeReclamation.dateAjoutMax ? this.datePipe.transform(this.searchPieceJointeReclamation.dateAjoutMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchPieceJointeReclamation.libelle ? this.searchPieceJointeReclamation.libelle : environment.emptyForExport ,
            'Archive': this.searchPieceJointeReclamation.archive ? (this.searchPieceJointeReclamation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPieceJointeReclamation.dateArchivageMin ? this.datePipe.transform(this.searchPieceJointeReclamation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPieceJointeReclamation.dateArchivageMax ? this.datePipe.transform(this.searchPieceJointeReclamation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPieceJointeReclamation.dateCreationMin ? this.datePipe.transform(this.searchPieceJointeReclamation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPieceJointeReclamation.dateCreationMax ? this.datePipe.transform(this.searchPieceJointeReclamation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPieceJointeReclamation.admin ? (this.searchPieceJointeReclamation.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPieceJointeReclamation.visible ? (this.searchPieceJointeReclamation.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPieceJointeReclamation.username ? this.searchPieceJointeReclamation.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get pieceJointeReclamations(): Array<PieceJointeReclamationVo> {
           return this.pieceJointeReclamationService.pieceJointeReclamations;
       }
    set pieceJointeReclamations(value: Array<PieceJointeReclamationVo>) {
        this.pieceJointeReclamationService.pieceJointeReclamations = value;
       }

    get pieceJointeReclamationSelections(): Array<PieceJointeReclamationVo> {
           return this.pieceJointeReclamationService.pieceJointeReclamationSelections;
       }
    set pieceJointeReclamationSelections(value: Array<PieceJointeReclamationVo>) {
        this.pieceJointeReclamationService.pieceJointeReclamationSelections = value;
       }
   
     


    get selectedPieceJointeReclamation():PieceJointeReclamationVo {
           return this.pieceJointeReclamationService.selectedPieceJointeReclamation;
       }
    set selectedPieceJointeReclamation(value: PieceJointeReclamationVo) {
        this.pieceJointeReclamationService.selectedPieceJointeReclamation = value;
       }
    
    get createPieceJointeReclamationDialog():boolean {
           return this.pieceJointeReclamationService.createPieceJointeReclamationDialog;
       }
    set createPieceJointeReclamationDialog(value: boolean) {
        this.pieceJointeReclamationService.createPieceJointeReclamationDialog= value;
       }
    
    get editPieceJointeReclamationDialog():boolean {
           return this.pieceJointeReclamationService.editPieceJointeReclamationDialog;
       }
    set editPieceJointeReclamationDialog(value: boolean) {
        this.pieceJointeReclamationService.editPieceJointeReclamationDialog= value;
       }
    get viewPieceJointeReclamationDialog():boolean {
           return this.pieceJointeReclamationService.viewPieceJointeReclamationDialog;
       }
    set viewPieceJointeReclamationDialog(value: boolean) {
        this.pieceJointeReclamationService.viewPieceJointeReclamationDialog = value;
       }
       
     get searchPieceJointeReclamation(): PieceJointeReclamationVo {
        return this.pieceJointeReclamationService.searchPieceJointeReclamation;
       }
    set searchPieceJointeReclamation(value: PieceJointeReclamationVo) {
        this.pieceJointeReclamationService.searchPieceJointeReclamation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
