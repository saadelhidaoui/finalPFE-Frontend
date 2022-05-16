import {Component, OnInit} from '@angular/core';
import {PieceJointeRendezVousService} from '../../../../../../controller/service/PieceJointeRendezVous.service';
import {PieceJointeRendezVousVo} from '../../../../../../controller/model/PieceJointeRendezVous.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RendezVousService } from '../../../../../../controller/service/RendezVous.service';

import {RendezVousVo} from '../../../../../../controller/model/RendezVous.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-piece-jointe-rendez-vous-list-moderateur',
  templateUrl: './piece-jointe-rendez-vous-list-moderateur.component.html',
  styleUrls: ['./piece-jointe-rendez-vous-list-moderateur.component.css']
})
export class PieceJointeRendezVousListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PieceJointeRendezVous';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    rendezVouss :Array<RendezVousVo>;


    constructor(private datePipe: DatePipe, private pieceJointeRendezVousService: PieceJointeRendezVousService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rendezVousService: RendezVousService
) { }

    ngOnInit(): void {
      this.loadPieceJointeRendezVouss();
      this.initExport();
      this.initCol();
      this.loadRendezVous();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPieceJointeRendezVouss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PieceJointeRendezVous', 'list');
        isPermistted ? this.pieceJointeRendezVousService.findAll().subscribe(pieceJointeRendezVouss => this.pieceJointeRendezVouss = pieceJointeRendezVouss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.pieceJointeRendezVousService.findByCriteria(this.searchPieceJointeRendezVous).subscribe(pieceJointeRendezVouss=>{
            
            this.pieceJointeRendezVouss = pieceJointeRendezVouss;
           // this.searchPieceJointeRendezVous = new PieceJointeRendezVousVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'path', header: 'Path'},
                        {field: 'rendezVous?.reference', header: 'Rendez vous'},
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
    
    public async editPieceJointeRendezVous(pieceJointeRendezVous:PieceJointeRendezVousVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeRendezVous', 'edit');
         if(isPermistted){
          this.pieceJointeRendezVousService.findByIdWithAssociatedList(pieceJointeRendezVous).subscribe(res => {
           this.selectedPieceJointeRendezVous = res;
            this.selectedPieceJointeRendezVous.dateAjout = new Date(pieceJointeRendezVous.dateAjout);
            this.selectedPieceJointeRendezVous.dateArchivage = new Date(pieceJointeRendezVous.dateArchivage);
            this.selectedPieceJointeRendezVous.dateCreation = new Date(pieceJointeRendezVous.dateCreation);
            this.editPieceJointeRendezVousDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPieceJointeRendezVous(pieceJointeRendezVous:PieceJointeRendezVousVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeRendezVous', 'view');
        if(isPermistted){
           this.pieceJointeRendezVousService.findByIdWithAssociatedList(pieceJointeRendezVous).subscribe(res => {
           this.selectedPieceJointeRendezVous = res;
            this.selectedPieceJointeRendezVous.dateAjout = new Date(pieceJointeRendezVous.dateAjout);
            this.selectedPieceJointeRendezVous.dateArchivage = new Date(pieceJointeRendezVous.dateArchivage);
            this.selectedPieceJointeRendezVous.dateCreation = new Date(pieceJointeRendezVous.dateCreation);
            this.viewPieceJointeRendezVousDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePieceJointeRendezVous(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPieceJointeRendezVous = new PieceJointeRendezVousVo();
            this.createPieceJointeRendezVousDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPieceJointeRendezVous(pieceJointeRendezVous:PieceJointeRendezVousVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeRendezVous', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Piece jointe rendez vous) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeRendezVousService.archiver(pieceJointeRendezVous).subscribe(status=>{
const myIndex = this.pieceJointeRendezVouss.indexOf(pieceJointeRendezVous);
this.pieceJointeRendezVouss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe rendez vous archivé',
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

public async desarchiverPieceJointeRendezVous(pieceJointeRendezVous:PieceJointeRendezVousVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeRendezVous', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Piece jointe rendez vous) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeRendezVousService.desarchiver(pieceJointeRendezVous).subscribe(status=>{
const myIndex = this.pieceJointeRendezVouss.indexOf(pieceJointeRendezVous);
this.pieceJointeRendezVouss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe rendez vous désarchivé',
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


    public async deletePieceJointeRendezVous(pieceJointeRendezVous:PieceJointeRendezVousVo){
       const isPermistted = await this.roleService.isPermitted('PieceJointeRendezVous', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Piece jointe rendez vous) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.pieceJointeRendezVousService.delete(pieceJointeRendezVous).subscribe(status=>{
                          if(status > 0){
                          const position = this.pieceJointeRendezVouss.indexOf(pieceJointeRendezVous);
                          position > -1 ? this.pieceJointeRendezVouss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Piece jointe rendez vous Supprimé',
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

public async loadRendezVous(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PieceJointeRendezVous', 'list');
    isPermistted ? this.rendezVousService.findAll().subscribe(rendezVouss => this.rendezVouss = rendezVouss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePieceJointeRendezVous(pieceJointeRendezVous: PieceJointeRendezVousVo) {

     this.pieceJointeRendezVousService.findByIdWithAssociatedList(pieceJointeRendezVous).subscribe(
	 res => {
	       this.initDuplicatePieceJointeRendezVous(res);
	       this.selectedPieceJointeRendezVous = res;
	       this.selectedPieceJointeRendezVous.id = null;
            this.createPieceJointeRendezVousDialog = true;

});

	}

	initDuplicatePieceJointeRendezVous(res: PieceJointeRendezVousVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.pieceJointeRendezVouss.map(e => {
    return {
                    'Path': e.path ,
            'Rendez vous': e.rendezVousVo?.reference ,
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
            'Path': this.searchPieceJointeRendezVous.path ? this.searchPieceJointeRendezVous.path : environment.emptyForExport ,
        'Rendez vous': this.searchPieceJointeRendezVous.rendezVousVo?.reference ? this.searchPieceJointeRendezVous.rendezVousVo?.reference : environment.emptyForExport ,
            'Date ajout Min': this.searchPieceJointeRendezVous.dateAjoutMin ? this.datePipe.transform(this.searchPieceJointeRendezVous.dateAjoutMin , this.dateFormat) : environment.emptyForExport ,
            'Date ajout Max': this.searchPieceJointeRendezVous.dateAjoutMax ? this.datePipe.transform(this.searchPieceJointeRendezVous.dateAjoutMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchPieceJointeRendezVous.libelle ? this.searchPieceJointeRendezVous.libelle : environment.emptyForExport ,
            'Archive': this.searchPieceJointeRendezVous.archive ? (this.searchPieceJointeRendezVous.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPieceJointeRendezVous.dateArchivageMin ? this.datePipe.transform(this.searchPieceJointeRendezVous.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPieceJointeRendezVous.dateArchivageMax ? this.datePipe.transform(this.searchPieceJointeRendezVous.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPieceJointeRendezVous.dateCreationMin ? this.datePipe.transform(this.searchPieceJointeRendezVous.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPieceJointeRendezVous.dateCreationMax ? this.datePipe.transform(this.searchPieceJointeRendezVous.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPieceJointeRendezVous.admin ? (this.searchPieceJointeRendezVous.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPieceJointeRendezVous.visible ? (this.searchPieceJointeRendezVous.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPieceJointeRendezVous.username ? this.searchPieceJointeRendezVous.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get pieceJointeRendezVouss(): Array<PieceJointeRendezVousVo> {
           return this.pieceJointeRendezVousService.pieceJointeRendezVouss;
       }
    set pieceJointeRendezVouss(value: Array<PieceJointeRendezVousVo>) {
        this.pieceJointeRendezVousService.pieceJointeRendezVouss = value;
       }

    get pieceJointeRendezVousSelections(): Array<PieceJointeRendezVousVo> {
           return this.pieceJointeRendezVousService.pieceJointeRendezVousSelections;
       }
    set pieceJointeRendezVousSelections(value: Array<PieceJointeRendezVousVo>) {
        this.pieceJointeRendezVousService.pieceJointeRendezVousSelections = value;
       }
   
     


    get selectedPieceJointeRendezVous():PieceJointeRendezVousVo {
           return this.pieceJointeRendezVousService.selectedPieceJointeRendezVous;
       }
    set selectedPieceJointeRendezVous(value: PieceJointeRendezVousVo) {
        this.pieceJointeRendezVousService.selectedPieceJointeRendezVous = value;
       }
    
    get createPieceJointeRendezVousDialog():boolean {
           return this.pieceJointeRendezVousService.createPieceJointeRendezVousDialog;
       }
    set createPieceJointeRendezVousDialog(value: boolean) {
        this.pieceJointeRendezVousService.createPieceJointeRendezVousDialog= value;
       }
    
    get editPieceJointeRendezVousDialog():boolean {
           return this.pieceJointeRendezVousService.editPieceJointeRendezVousDialog;
       }
    set editPieceJointeRendezVousDialog(value: boolean) {
        this.pieceJointeRendezVousService.editPieceJointeRendezVousDialog= value;
       }
    get viewPieceJointeRendezVousDialog():boolean {
           return this.pieceJointeRendezVousService.viewPieceJointeRendezVousDialog;
       }
    set viewPieceJointeRendezVousDialog(value: boolean) {
        this.pieceJointeRendezVousService.viewPieceJointeRendezVousDialog = value;
       }
       
     get searchPieceJointeRendezVous(): PieceJointeRendezVousVo {
        return this.pieceJointeRendezVousService.searchPieceJointeRendezVous;
       }
    set searchPieceJointeRendezVous(value: PieceJointeRendezVousVo) {
        this.pieceJointeRendezVousService.searchPieceJointeRendezVous = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
