import {Component, OnInit} from '@angular/core';
import {PieceJointePrestationService} from '../../../../../../controller/service/PieceJointePrestation.service';
import {PieceJointePrestationVo} from '../../../../../../controller/model/PieceJointePrestation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PrestationService } from '../../../../../../controller/service/Prestation.service';

import {PrestationVo} from '../../../../../../controller/model/Prestation.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-piece-jointe-prestation-list-admin',
  templateUrl: './piece-jointe-prestation-list-admin.component.html',
  styleUrls: ['./piece-jointe-prestation-list-admin.component.css']
})
export class PieceJointePrestationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PieceJointePrestation';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    prestations :Array<PrestationVo>;


    constructor(private datePipe: DatePipe, private pieceJointePrestationService: PieceJointePrestationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private prestationService: PrestationService
) { }

    ngOnInit(): void {
      this.loadPieceJointePrestations();
      this.initExport();
      this.initCol();
      this.loadPrestation();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPieceJointePrestations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PieceJointePrestation', 'list');
        isPermistted ? this.pieceJointePrestationService.findAll().subscribe(pieceJointePrestations => this.pieceJointePrestations = pieceJointePrestations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.pieceJointePrestationService.findByCriteria(this.searchPieceJointePrestation).subscribe(pieceJointePrestations=>{
            
            this.pieceJointePrestations = pieceJointePrestations;
           // this.searchPieceJointePrestation = new PieceJointePrestationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'path', header: 'Path'},
                        {field: 'prestation?.reference', header: 'Prestation'},
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
    
    public async editPieceJointePrestation(pieceJointePrestation:PieceJointePrestationVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointePrestation', 'edit');
         if(isPermistted){
          this.pieceJointePrestationService.findByIdWithAssociatedList(pieceJointePrestation).subscribe(res => {
           this.selectedPieceJointePrestation = res;
            this.selectedPieceJointePrestation.dateAjout = new Date(pieceJointePrestation.dateAjout);
            this.selectedPieceJointePrestation.dateArchivage = new Date(pieceJointePrestation.dateArchivage);
            this.selectedPieceJointePrestation.dateCreation = new Date(pieceJointePrestation.dateCreation);
            this.editPieceJointePrestationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPieceJointePrestation(pieceJointePrestation:PieceJointePrestationVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointePrestation', 'view');
        if(isPermistted){
           this.pieceJointePrestationService.findByIdWithAssociatedList(pieceJointePrestation).subscribe(res => {
           this.selectedPieceJointePrestation = res;
            this.selectedPieceJointePrestation.dateAjout = new Date(pieceJointePrestation.dateAjout);
            this.selectedPieceJointePrestation.dateArchivage = new Date(pieceJointePrestation.dateArchivage);
            this.selectedPieceJointePrestation.dateCreation = new Date(pieceJointePrestation.dateCreation);
            this.viewPieceJointePrestationDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePieceJointePrestation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPieceJointePrestation = new PieceJointePrestationVo();
            this.createPieceJointePrestationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPieceJointePrestation(pieceJointePrestation:PieceJointePrestationVo){
const isPermistted = await this.roleService.isPermitted('PieceJointePrestation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Piece jointe prestation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointePrestationService.archiver(pieceJointePrestation).subscribe(status=>{
const myIndex = this.pieceJointePrestations.indexOf(pieceJointePrestation);
this.pieceJointePrestations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe prestation archivé',
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

public async desarchiverPieceJointePrestation(pieceJointePrestation:PieceJointePrestationVo){
const isPermistted = await this.roleService.isPermitted('PieceJointePrestation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Piece jointe prestation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointePrestationService.desarchiver(pieceJointePrestation).subscribe(status=>{
const myIndex = this.pieceJointePrestations.indexOf(pieceJointePrestation);
this.pieceJointePrestations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe prestation désarchivé',
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


    public async deletePieceJointePrestation(pieceJointePrestation:PieceJointePrestationVo){
       const isPermistted = await this.roleService.isPermitted('PieceJointePrestation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Piece jointe prestation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.pieceJointePrestationService.delete(pieceJointePrestation).subscribe(status=>{
                          if(status > 0){
                          const position = this.pieceJointePrestations.indexOf(pieceJointePrestation);
                          position > -1 ? this.pieceJointePrestations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Piece jointe prestation Supprimé',
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

public async loadPrestation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PieceJointePrestation', 'list');
    isPermistted ? this.prestationService.findAll().subscribe(prestations => this.prestations = prestations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePieceJointePrestation(pieceJointePrestation: PieceJointePrestationVo) {

     this.pieceJointePrestationService.findByIdWithAssociatedList(pieceJointePrestation).subscribe(
	 res => {
	       this.initDuplicatePieceJointePrestation(res);
	       this.selectedPieceJointePrestation = res;
	       this.selectedPieceJointePrestation.id = null;
            this.createPieceJointePrestationDialog = true;

});

	}

	initDuplicatePieceJointePrestation(res: PieceJointePrestationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.pieceJointePrestations.map(e => {
    return {
                    'Path': e.path ,
            'Prestation': e.prestationVo?.reference ,
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
            'Path': this.searchPieceJointePrestation.path ? this.searchPieceJointePrestation.path : environment.emptyForExport ,
        'Prestation': this.searchPieceJointePrestation.prestationVo?.reference ? this.searchPieceJointePrestation.prestationVo?.reference : environment.emptyForExport ,
            'Date ajout Min': this.searchPieceJointePrestation.dateAjoutMin ? this.datePipe.transform(this.searchPieceJointePrestation.dateAjoutMin , this.dateFormat) : environment.emptyForExport ,
            'Date ajout Max': this.searchPieceJointePrestation.dateAjoutMax ? this.datePipe.transform(this.searchPieceJointePrestation.dateAjoutMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchPieceJointePrestation.libelle ? this.searchPieceJointePrestation.libelle : environment.emptyForExport ,
            'Archive': this.searchPieceJointePrestation.archive ? (this.searchPieceJointePrestation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPieceJointePrestation.dateArchivageMin ? this.datePipe.transform(this.searchPieceJointePrestation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPieceJointePrestation.dateArchivageMax ? this.datePipe.transform(this.searchPieceJointePrestation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPieceJointePrestation.dateCreationMin ? this.datePipe.transform(this.searchPieceJointePrestation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPieceJointePrestation.dateCreationMax ? this.datePipe.transform(this.searchPieceJointePrestation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPieceJointePrestation.admin ? (this.searchPieceJointePrestation.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPieceJointePrestation.visible ? (this.searchPieceJointePrestation.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPieceJointePrestation.username ? this.searchPieceJointePrestation.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get pieceJointePrestations(): Array<PieceJointePrestationVo> {
           return this.pieceJointePrestationService.pieceJointePrestations;
       }
    set pieceJointePrestations(value: Array<PieceJointePrestationVo>) {
        this.pieceJointePrestationService.pieceJointePrestations = value;
       }

    get pieceJointePrestationSelections(): Array<PieceJointePrestationVo> {
           return this.pieceJointePrestationService.pieceJointePrestationSelections;
       }
    set pieceJointePrestationSelections(value: Array<PieceJointePrestationVo>) {
        this.pieceJointePrestationService.pieceJointePrestationSelections = value;
       }
   
     


    get selectedPieceJointePrestation():PieceJointePrestationVo {
           return this.pieceJointePrestationService.selectedPieceJointePrestation;
       }
    set selectedPieceJointePrestation(value: PieceJointePrestationVo) {
        this.pieceJointePrestationService.selectedPieceJointePrestation = value;
       }
    
    get createPieceJointePrestationDialog():boolean {
           return this.pieceJointePrestationService.createPieceJointePrestationDialog;
       }
    set createPieceJointePrestationDialog(value: boolean) {
        this.pieceJointePrestationService.createPieceJointePrestationDialog= value;
       }
    
    get editPieceJointePrestationDialog():boolean {
           return this.pieceJointePrestationService.editPieceJointePrestationDialog;
       }
    set editPieceJointePrestationDialog(value: boolean) {
        this.pieceJointePrestationService.editPieceJointePrestationDialog= value;
       }
    get viewPieceJointePrestationDialog():boolean {
           return this.pieceJointePrestationService.viewPieceJointePrestationDialog;
       }
    set viewPieceJointePrestationDialog(value: boolean) {
        this.pieceJointePrestationService.viewPieceJointePrestationDialog = value;
       }
       
     get searchPieceJointePrestation(): PieceJointePrestationVo {
        return this.pieceJointePrestationService.searchPieceJointePrestation;
       }
    set searchPieceJointePrestation(value: PieceJointePrestationVo) {
        this.pieceJointePrestationService.searchPieceJointePrestation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
