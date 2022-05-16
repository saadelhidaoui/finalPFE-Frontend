import {Component, OnInit} from '@angular/core';
import {PieceJointeEstivageService} from '../../../../../../controller/service/PieceJointeEstivage.service';
import {PieceJointeEstivageVo} from '../../../../../../controller/model/PieceJointeEstivage.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EstivageService } from '../../../../../../controller/service/Estivage.service';

import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-piece-jointe-estivage-list-moderateur',
  templateUrl: './piece-jointe-estivage-list-moderateur.component.html',
  styleUrls: ['./piece-jointe-estivage-list-moderateur.component.css']
})
export class PieceJointeEstivageListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PieceJointeEstivage';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    estivages :Array<EstivageVo>;


    constructor(private datePipe: DatePipe, private pieceJointeEstivageService: PieceJointeEstivageService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private estivageService: EstivageService
) { }

    ngOnInit(): void {
      this.loadPieceJointeEstivages();
      this.initExport();
      this.initCol();
      this.loadEstivage();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPieceJointeEstivages(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PieceJointeEstivage', 'list');
        isPermistted ? this.pieceJointeEstivageService.findAll().subscribe(pieceJointeEstivages => this.pieceJointeEstivages = pieceJointeEstivages,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.pieceJointeEstivageService.findByCriteria(this.searchPieceJointeEstivage).subscribe(pieceJointeEstivages=>{
            
            this.pieceJointeEstivages = pieceJointeEstivages;
           // this.searchPieceJointeEstivage = new PieceJointeEstivageVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'path', header: 'Path'},
                        {field: 'estivage?.reference', header: 'Estivage'},
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
    
    public async editPieceJointeEstivage(pieceJointeEstivage:PieceJointeEstivageVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeEstivage', 'edit');
         if(isPermistted){
          this.pieceJointeEstivageService.findByIdWithAssociatedList(pieceJointeEstivage).subscribe(res => {
           this.selectedPieceJointeEstivage = res;
            this.selectedPieceJointeEstivage.dateAjout = new Date(pieceJointeEstivage.dateAjout);
            this.selectedPieceJointeEstivage.dateArchivage = new Date(pieceJointeEstivage.dateArchivage);
            this.selectedPieceJointeEstivage.dateCreation = new Date(pieceJointeEstivage.dateCreation);
            this.editPieceJointeEstivageDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPieceJointeEstivage(pieceJointeEstivage:PieceJointeEstivageVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeEstivage', 'view');
        if(isPermistted){
           this.pieceJointeEstivageService.findByIdWithAssociatedList(pieceJointeEstivage).subscribe(res => {
           this.selectedPieceJointeEstivage = res;
            this.selectedPieceJointeEstivage.dateAjout = new Date(pieceJointeEstivage.dateAjout);
            this.selectedPieceJointeEstivage.dateArchivage = new Date(pieceJointeEstivage.dateArchivage);
            this.selectedPieceJointeEstivage.dateCreation = new Date(pieceJointeEstivage.dateCreation);
            this.viewPieceJointeEstivageDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePieceJointeEstivage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPieceJointeEstivage = new PieceJointeEstivageVo();
            this.createPieceJointeEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPieceJointeEstivage(pieceJointeEstivage:PieceJointeEstivageVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeEstivage', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Piece jointe estivage) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeEstivageService.archiver(pieceJointeEstivage).subscribe(status=>{
const myIndex = this.pieceJointeEstivages.indexOf(pieceJointeEstivage);
this.pieceJointeEstivages[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe estivage archivé',
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

public async desarchiverPieceJointeEstivage(pieceJointeEstivage:PieceJointeEstivageVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeEstivage', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Piece jointe estivage) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeEstivageService.desarchiver(pieceJointeEstivage).subscribe(status=>{
const myIndex = this.pieceJointeEstivages.indexOf(pieceJointeEstivage);
this.pieceJointeEstivages[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe estivage désarchivé',
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


    public async deletePieceJointeEstivage(pieceJointeEstivage:PieceJointeEstivageVo){
       const isPermistted = await this.roleService.isPermitted('PieceJointeEstivage', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Piece jointe estivage) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.pieceJointeEstivageService.delete(pieceJointeEstivage).subscribe(status=>{
                          if(status > 0){
                          const position = this.pieceJointeEstivages.indexOf(pieceJointeEstivage);
                          position > -1 ? this.pieceJointeEstivages.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Piece jointe estivage Supprimé',
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

public async loadEstivage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PieceJointeEstivage', 'list');
    isPermistted ? this.estivageService.findAll().subscribe(estivages => this.estivages = estivages,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePieceJointeEstivage(pieceJointeEstivage: PieceJointeEstivageVo) {

     this.pieceJointeEstivageService.findByIdWithAssociatedList(pieceJointeEstivage).subscribe(
	 res => {
	       this.initDuplicatePieceJointeEstivage(res);
	       this.selectedPieceJointeEstivage = res;
	       this.selectedPieceJointeEstivage.id = null;
            this.createPieceJointeEstivageDialog = true;

});

	}

	initDuplicatePieceJointeEstivage(res: PieceJointeEstivageVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.pieceJointeEstivages.map(e => {
    return {
                    'Path': e.path ,
            'Estivage': e.estivageVo?.reference ,
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
            'Path': this.searchPieceJointeEstivage.path ? this.searchPieceJointeEstivage.path : environment.emptyForExport ,
        'Estivage': this.searchPieceJointeEstivage.estivageVo?.reference ? this.searchPieceJointeEstivage.estivageVo?.reference : environment.emptyForExport ,
            'Date ajout Min': this.searchPieceJointeEstivage.dateAjoutMin ? this.datePipe.transform(this.searchPieceJointeEstivage.dateAjoutMin , this.dateFormat) : environment.emptyForExport ,
            'Date ajout Max': this.searchPieceJointeEstivage.dateAjoutMax ? this.datePipe.transform(this.searchPieceJointeEstivage.dateAjoutMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchPieceJointeEstivage.libelle ? this.searchPieceJointeEstivage.libelle : environment.emptyForExport ,
            'Archive': this.searchPieceJointeEstivage.archive ? (this.searchPieceJointeEstivage.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPieceJointeEstivage.dateArchivageMin ? this.datePipe.transform(this.searchPieceJointeEstivage.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPieceJointeEstivage.dateArchivageMax ? this.datePipe.transform(this.searchPieceJointeEstivage.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPieceJointeEstivage.dateCreationMin ? this.datePipe.transform(this.searchPieceJointeEstivage.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPieceJointeEstivage.dateCreationMax ? this.datePipe.transform(this.searchPieceJointeEstivage.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPieceJointeEstivage.admin ? (this.searchPieceJointeEstivage.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPieceJointeEstivage.visible ? (this.searchPieceJointeEstivage.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPieceJointeEstivage.username ? this.searchPieceJointeEstivage.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get pieceJointeEstivages(): Array<PieceJointeEstivageVo> {
           return this.pieceJointeEstivageService.pieceJointeEstivages;
       }
    set pieceJointeEstivages(value: Array<PieceJointeEstivageVo>) {
        this.pieceJointeEstivageService.pieceJointeEstivages = value;
       }

    get pieceJointeEstivageSelections(): Array<PieceJointeEstivageVo> {
           return this.pieceJointeEstivageService.pieceJointeEstivageSelections;
       }
    set pieceJointeEstivageSelections(value: Array<PieceJointeEstivageVo>) {
        this.pieceJointeEstivageService.pieceJointeEstivageSelections = value;
       }
   
     


    get selectedPieceJointeEstivage():PieceJointeEstivageVo {
           return this.pieceJointeEstivageService.selectedPieceJointeEstivage;
       }
    set selectedPieceJointeEstivage(value: PieceJointeEstivageVo) {
        this.pieceJointeEstivageService.selectedPieceJointeEstivage = value;
       }
    
    get createPieceJointeEstivageDialog():boolean {
           return this.pieceJointeEstivageService.createPieceJointeEstivageDialog;
       }
    set createPieceJointeEstivageDialog(value: boolean) {
        this.pieceJointeEstivageService.createPieceJointeEstivageDialog= value;
       }
    
    get editPieceJointeEstivageDialog():boolean {
           return this.pieceJointeEstivageService.editPieceJointeEstivageDialog;
       }
    set editPieceJointeEstivageDialog(value: boolean) {
        this.pieceJointeEstivageService.editPieceJointeEstivageDialog= value;
       }
    get viewPieceJointeEstivageDialog():boolean {
           return this.pieceJointeEstivageService.viewPieceJointeEstivageDialog;
       }
    set viewPieceJointeEstivageDialog(value: boolean) {
        this.pieceJointeEstivageService.viewPieceJointeEstivageDialog = value;
       }
       
     get searchPieceJointeEstivage(): PieceJointeEstivageVo {
        return this.pieceJointeEstivageService.searchPieceJointeEstivage;
       }
    set searchPieceJointeEstivage(value: PieceJointeEstivageVo) {
        this.pieceJointeEstivageService.searchPieceJointeEstivage = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
