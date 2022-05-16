import {Component, OnInit} from '@angular/core';
import {PieceJointeConventionService} from '../../../../../../controller/service/PieceJointeConvention.service';
import {PieceJointeConventionVo} from '../../../../../../controller/model/PieceJointeConvention.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ConventionService } from '../../../../../../controller/service/Convention.service';

import {ConventionVo} from '../../../../../../controller/model/Convention.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-piece-jointe-convention-list-chercheur',
  templateUrl: './piece-jointe-convention-list-chercheur.component.html',
  styleUrls: ['./piece-jointe-convention-list-chercheur.component.css']
})
export class PieceJointeConventionListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PieceJointeConvention';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    conventions :Array<ConventionVo>;


    constructor(private datePipe: DatePipe, private pieceJointeConventionService: PieceJointeConventionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private conventionService: ConventionService
) { }

    ngOnInit(): void {
      this.loadPieceJointeConventions();
      this.initExport();
      this.initCol();
      this.loadConvention();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPieceJointeConventions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PieceJointeConvention', 'list');
        isPermistted ? this.pieceJointeConventionService.findAll().subscribe(pieceJointeConventions => this.pieceJointeConventions = pieceJointeConventions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.pieceJointeConventionService.findByCriteria(this.searchPieceJointeConvention).subscribe(pieceJointeConventions=>{
            
            this.pieceJointeConventions = pieceJointeConventions;
           // this.searchPieceJointeConvention = new PieceJointeConventionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'path', header: 'Path'},
                        {field: 'convention?.reference', header: 'Convention'},
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
    
    public async editPieceJointeConvention(pieceJointeConvention:PieceJointeConventionVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeConvention', 'edit');
         if(isPermistted){
          this.pieceJointeConventionService.findByIdWithAssociatedList(pieceJointeConvention).subscribe(res => {
           this.selectedPieceJointeConvention = res;
            this.selectedPieceJointeConvention.dateAjout = new Date(pieceJointeConvention.dateAjout);
            this.selectedPieceJointeConvention.dateArchivage = new Date(pieceJointeConvention.dateArchivage);
            this.selectedPieceJointeConvention.dateCreation = new Date(pieceJointeConvention.dateCreation);
            this.editPieceJointeConventionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPieceJointeConvention(pieceJointeConvention:PieceJointeConventionVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeConvention', 'view');
        if(isPermistted){
           this.pieceJointeConventionService.findByIdWithAssociatedList(pieceJointeConvention).subscribe(res => {
           this.selectedPieceJointeConvention = res;
            this.selectedPieceJointeConvention.dateAjout = new Date(pieceJointeConvention.dateAjout);
            this.selectedPieceJointeConvention.dateArchivage = new Date(pieceJointeConvention.dateArchivage);
            this.selectedPieceJointeConvention.dateCreation = new Date(pieceJointeConvention.dateCreation);
            this.viewPieceJointeConventionDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePieceJointeConvention(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPieceJointeConvention = new PieceJointeConventionVo();
            this.createPieceJointeConventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePieceJointeConvention(pieceJointeConvention:PieceJointeConventionVo){
       const isPermistted = await this.roleService.isPermitted('PieceJointeConvention', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Piece jointe convention) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.pieceJointeConventionService.delete(pieceJointeConvention).subscribe(status=>{
                          if(status > 0){
                          const position = this.pieceJointeConventions.indexOf(pieceJointeConvention);
                          position > -1 ? this.pieceJointeConventions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Piece jointe convention Supprimé',
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

public async loadConvention(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PieceJointeConvention', 'list');
    isPermistted ? this.conventionService.findAll().subscribe(conventions => this.conventions = conventions,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePieceJointeConvention(pieceJointeConvention: PieceJointeConventionVo) {

     this.pieceJointeConventionService.findByIdWithAssociatedList(pieceJointeConvention).subscribe(
	 res => {
	       this.initDuplicatePieceJointeConvention(res);
	       this.selectedPieceJointeConvention = res;
	       this.selectedPieceJointeConvention.id = null;
            this.createPieceJointeConventionDialog = true;

});

	}

	initDuplicatePieceJointeConvention(res: PieceJointeConventionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.pieceJointeConventions.map(e => {
    return {
                    'Path': e.path ,
            'Convention': e.conventionVo?.reference ,
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
            'Path': this.searchPieceJointeConvention.path ? this.searchPieceJointeConvention.path : environment.emptyForExport ,
        'Convention': this.searchPieceJointeConvention.conventionVo?.reference ? this.searchPieceJointeConvention.conventionVo?.reference : environment.emptyForExport ,
            'Date ajout Min': this.searchPieceJointeConvention.dateAjoutMin ? this.datePipe.transform(this.searchPieceJointeConvention.dateAjoutMin , this.dateFormat) : environment.emptyForExport ,
            'Date ajout Max': this.searchPieceJointeConvention.dateAjoutMax ? this.datePipe.transform(this.searchPieceJointeConvention.dateAjoutMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchPieceJointeConvention.libelle ? this.searchPieceJointeConvention.libelle : environment.emptyForExport ,
            'Archive': this.searchPieceJointeConvention.archive ? (this.searchPieceJointeConvention.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPieceJointeConvention.dateArchivageMin ? this.datePipe.transform(this.searchPieceJointeConvention.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPieceJointeConvention.dateArchivageMax ? this.datePipe.transform(this.searchPieceJointeConvention.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPieceJointeConvention.dateCreationMin ? this.datePipe.transform(this.searchPieceJointeConvention.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPieceJointeConvention.dateCreationMax ? this.datePipe.transform(this.searchPieceJointeConvention.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPieceJointeConvention.admin ? (this.searchPieceJointeConvention.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPieceJointeConvention.visible ? (this.searchPieceJointeConvention.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPieceJointeConvention.username ? this.searchPieceJointeConvention.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get pieceJointeConventions(): Array<PieceJointeConventionVo> {
           return this.pieceJointeConventionService.pieceJointeConventions;
       }
    set pieceJointeConventions(value: Array<PieceJointeConventionVo>) {
        this.pieceJointeConventionService.pieceJointeConventions = value;
       }

    get pieceJointeConventionSelections(): Array<PieceJointeConventionVo> {
           return this.pieceJointeConventionService.pieceJointeConventionSelections;
       }
    set pieceJointeConventionSelections(value: Array<PieceJointeConventionVo>) {
        this.pieceJointeConventionService.pieceJointeConventionSelections = value;
       }
   
     


    get selectedPieceJointeConvention():PieceJointeConventionVo {
           return this.pieceJointeConventionService.selectedPieceJointeConvention;
       }
    set selectedPieceJointeConvention(value: PieceJointeConventionVo) {
        this.pieceJointeConventionService.selectedPieceJointeConvention = value;
       }
    
    get createPieceJointeConventionDialog():boolean {
           return this.pieceJointeConventionService.createPieceJointeConventionDialog;
       }
    set createPieceJointeConventionDialog(value: boolean) {
        this.pieceJointeConventionService.createPieceJointeConventionDialog= value;
       }
    
    get editPieceJointeConventionDialog():boolean {
           return this.pieceJointeConventionService.editPieceJointeConventionDialog;
       }
    set editPieceJointeConventionDialog(value: boolean) {
        this.pieceJointeConventionService.editPieceJointeConventionDialog= value;
       }
    get viewPieceJointeConventionDialog():boolean {
           return this.pieceJointeConventionService.viewPieceJointeConventionDialog;
       }
    set viewPieceJointeConventionDialog(value: boolean) {
        this.pieceJointeConventionService.viewPieceJointeConventionDialog = value;
       }
       
     get searchPieceJointeConvention(): PieceJointeConventionVo {
        return this.pieceJointeConventionService.searchPieceJointeConvention;
       }
    set searchPieceJointeConvention(value: PieceJointeConventionVo) {
        this.pieceJointeConventionService.searchPieceJointeConvention = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
