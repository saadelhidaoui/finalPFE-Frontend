import {Component, OnInit} from '@angular/core';
import {PieceJointeAdherentService} from '../../../../../../controller/service/PieceJointeAdherent.service';
import {PieceJointeAdherentVo} from '../../../../../../controller/model/PieceJointeAdherent.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { AdherentService } from '../../../../../../controller/service/Adherent.service';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-piece-jointe-adherent-list-moderateur',
  templateUrl: './piece-jointe-adherent-list-moderateur.component.html',
  styleUrls: ['./piece-jointe-adherent-list-moderateur.component.css']
})
export class PieceJointeAdherentListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PieceJointeAdherent';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    adherents :Array<AdherentVo>;


    constructor(private datePipe: DatePipe, private pieceJointeAdherentService: PieceJointeAdherentService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private adherentService: AdherentService
) { }

    ngOnInit(): void {
      this.loadPieceJointeAdherents();
      this.initExport();
      this.initCol();
      this.loadAdherent();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPieceJointeAdherents(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PieceJointeAdherent', 'list');
        isPermistted ? this.pieceJointeAdherentService.findAll().subscribe(pieceJointeAdherents => this.pieceJointeAdherents = pieceJointeAdherents,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.pieceJointeAdherentService.findByCriteria(this.searchPieceJointeAdherent).subscribe(pieceJointeAdherents=>{
            
            this.pieceJointeAdherents = pieceJointeAdherents;
           // this.searchPieceJointeAdherent = new PieceJointeAdherentVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'path', header: 'Path'},
                        {field: 'adherent?.username', header: 'Adherent'},
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
    
    public async editPieceJointeAdherent(pieceJointeAdherent:PieceJointeAdherentVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeAdherent', 'edit');
         if(isPermistted){
          this.pieceJointeAdherentService.findByIdWithAssociatedList(pieceJointeAdherent).subscribe(res => {
           this.selectedPieceJointeAdherent = res;
            this.selectedPieceJointeAdherent.dateAjout = new Date(pieceJointeAdherent.dateAjout);
            this.selectedPieceJointeAdherent.dateArchivage = new Date(pieceJointeAdherent.dateArchivage);
            this.selectedPieceJointeAdherent.dateCreation = new Date(pieceJointeAdherent.dateCreation);
            this.editPieceJointeAdherentDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPieceJointeAdherent(pieceJointeAdherent:PieceJointeAdherentVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeAdherent', 'view');
        if(isPermistted){
           this.pieceJointeAdherentService.findByIdWithAssociatedList(pieceJointeAdherent).subscribe(res => {
           this.selectedPieceJointeAdherent = res;
            this.selectedPieceJointeAdherent.dateAjout = new Date(pieceJointeAdherent.dateAjout);
            this.selectedPieceJointeAdherent.dateArchivage = new Date(pieceJointeAdherent.dateArchivage);
            this.selectedPieceJointeAdherent.dateCreation = new Date(pieceJointeAdherent.dateCreation);
            this.viewPieceJointeAdherentDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePieceJointeAdherent(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPieceJointeAdherent = new PieceJointeAdherentVo();
            this.createPieceJointeAdherentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPieceJointeAdherent(pieceJointeAdherent:PieceJointeAdherentVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeAdherent', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Piece jointe adherent) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeAdherentService.archiver(pieceJointeAdherent).subscribe(status=>{
const myIndex = this.pieceJointeAdherents.indexOf(pieceJointeAdherent);
this.pieceJointeAdherents[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe adherent archivé',
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

public async desarchiverPieceJointeAdherent(pieceJointeAdherent:PieceJointeAdherentVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeAdherent', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Piece jointe adherent) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeAdherentService.desarchiver(pieceJointeAdherent).subscribe(status=>{
const myIndex = this.pieceJointeAdherents.indexOf(pieceJointeAdherent);
this.pieceJointeAdherents[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe adherent désarchivé',
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


    public async deletePieceJointeAdherent(pieceJointeAdherent:PieceJointeAdherentVo){
       const isPermistted = await this.roleService.isPermitted('PieceJointeAdherent', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Piece jointe adherent) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.pieceJointeAdherentService.delete(pieceJointeAdherent).subscribe(status=>{
                          if(status > 0){
                          const position = this.pieceJointeAdherents.indexOf(pieceJointeAdherent);
                          position > -1 ? this.pieceJointeAdherents.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Piece jointe adherent Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('PieceJointeAdherent', 'list');
    isPermistted ? this.adherentService.findAll().subscribe(adherents => this.adherents = adherents,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePieceJointeAdherent(pieceJointeAdherent: PieceJointeAdherentVo) {

     this.pieceJointeAdherentService.findByIdWithAssociatedList(pieceJointeAdherent).subscribe(
	 res => {
	       this.initDuplicatePieceJointeAdherent(res);
	       this.selectedPieceJointeAdherent = res;
	       this.selectedPieceJointeAdherent.id = null;
            this.createPieceJointeAdherentDialog = true;

});

	}

	initDuplicatePieceJointeAdherent(res: PieceJointeAdherentVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.pieceJointeAdherents.map(e => {
    return {
                    'Path': e.path ,
            'Adherent': e.adherentVo?.username ,
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
            'Path': this.searchPieceJointeAdherent.path ? this.searchPieceJointeAdherent.path : environment.emptyForExport ,
        'Adherent': this.searchPieceJointeAdherent.adherentVo?.username ? this.searchPieceJointeAdherent.adherentVo?.username : environment.emptyForExport ,
            'Date ajout Min': this.searchPieceJointeAdherent.dateAjoutMin ? this.datePipe.transform(this.searchPieceJointeAdherent.dateAjoutMin , this.dateFormat) : environment.emptyForExport ,
            'Date ajout Max': this.searchPieceJointeAdherent.dateAjoutMax ? this.datePipe.transform(this.searchPieceJointeAdherent.dateAjoutMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchPieceJointeAdherent.libelle ? this.searchPieceJointeAdherent.libelle : environment.emptyForExport ,
            'Archive': this.searchPieceJointeAdherent.archive ? (this.searchPieceJointeAdherent.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPieceJointeAdherent.dateArchivageMin ? this.datePipe.transform(this.searchPieceJointeAdherent.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPieceJointeAdherent.dateArchivageMax ? this.datePipe.transform(this.searchPieceJointeAdherent.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPieceJointeAdherent.dateCreationMin ? this.datePipe.transform(this.searchPieceJointeAdherent.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPieceJointeAdherent.dateCreationMax ? this.datePipe.transform(this.searchPieceJointeAdherent.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPieceJointeAdherent.admin ? (this.searchPieceJointeAdherent.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPieceJointeAdherent.visible ? (this.searchPieceJointeAdherent.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPieceJointeAdherent.username ? this.searchPieceJointeAdherent.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get pieceJointeAdherents(): Array<PieceJointeAdherentVo> {
           return this.pieceJointeAdherentService.pieceJointeAdherents;
       }
    set pieceJointeAdherents(value: Array<PieceJointeAdherentVo>) {
        this.pieceJointeAdherentService.pieceJointeAdherents = value;
       }

    get pieceJointeAdherentSelections(): Array<PieceJointeAdherentVo> {
           return this.pieceJointeAdherentService.pieceJointeAdherentSelections;
       }
    set pieceJointeAdherentSelections(value: Array<PieceJointeAdherentVo>) {
        this.pieceJointeAdherentService.pieceJointeAdherentSelections = value;
       }
   
     


    get selectedPieceJointeAdherent():PieceJointeAdherentVo {
           return this.pieceJointeAdherentService.selectedPieceJointeAdherent;
       }
    set selectedPieceJointeAdherent(value: PieceJointeAdherentVo) {
        this.pieceJointeAdherentService.selectedPieceJointeAdherent = value;
       }
    
    get createPieceJointeAdherentDialog():boolean {
           return this.pieceJointeAdherentService.createPieceJointeAdherentDialog;
       }
    set createPieceJointeAdherentDialog(value: boolean) {
        this.pieceJointeAdherentService.createPieceJointeAdherentDialog= value;
       }
    
    get editPieceJointeAdherentDialog():boolean {
           return this.pieceJointeAdherentService.editPieceJointeAdherentDialog;
       }
    set editPieceJointeAdherentDialog(value: boolean) {
        this.pieceJointeAdherentService.editPieceJointeAdherentDialog= value;
       }
    get viewPieceJointeAdherentDialog():boolean {
           return this.pieceJointeAdherentService.viewPieceJointeAdherentDialog;
       }
    set viewPieceJointeAdherentDialog(value: boolean) {
        this.pieceJointeAdherentService.viewPieceJointeAdherentDialog = value;
       }
       
     get searchPieceJointeAdherent(): PieceJointeAdherentVo {
        return this.pieceJointeAdherentService.searchPieceJointeAdherent;
       }
    set searchPieceJointeAdherent(value: PieceJointeAdherentVo) {
        this.pieceJointeAdherentService.searchPieceJointeAdherent = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
