import {Component, OnInit} from '@angular/core';
import {RendezVousService} from '../../../../../../controller/service/RendezVous.service';
import {RendezVousVo} from '../../../../../../controller/model/RendezVous.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import {PieceJointeRendezVousVo} from '../../../../../../controller/model/PieceJointeRendezVous.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rendez-vous-list-chercheur',
  templateUrl: './rendez-vous-list-chercheur.component.html',
  styleUrls: ['./rendez-vous-list-chercheur.component.css']
})
export class RendezVousListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RendezVous';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private rendezVousService: RendezVousService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadRendezVouss();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadRendezVouss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RendezVous', 'list');
        isPermistted ? this.rendezVousService.findAll().subscribe(rendezVouss => this.rendezVouss = rendezVouss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rendezVousService.findByCriteria(this.searchRendezVous).subscribe(rendezVouss=>{
            
            this.rendezVouss = rendezVouss;
           // this.searchRendezVous = new RendezVousVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'dateDebut', header: 'Date debut'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editRendezVous(rendezVous:RendezVousVo){
        const isPermistted = await this.roleService.isPermitted('RendezVous', 'edit');
         if(isPermistted){
          this.rendezVousService.findByIdWithAssociatedList(rendezVous).subscribe(res => {
           this.selectedRendezVous = res;
            this.selectedRendezVous.dateDebut = new Date(rendezVous.dateDebut);
            this.selectedRendezVous.dateArchivage = new Date(rendezVous.dateArchivage);
            this.selectedRendezVous.dateCreation = new Date(rendezVous.dateCreation);
            this.editRendezVousDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRendezVous(rendezVous:RendezVousVo){
        const isPermistted = await this.roleService.isPermitted('RendezVous', 'view');
        if(isPermistted){
           this.rendezVousService.findByIdWithAssociatedList(rendezVous).subscribe(res => {
           this.selectedRendezVous = res;
            this.selectedRendezVous.dateDebut = new Date(rendezVous.dateDebut);
            this.selectedRendezVous.dateArchivage = new Date(rendezVous.dateArchivage);
            this.selectedRendezVous.dateCreation = new Date(rendezVous.dateCreation);
            this.viewRendezVousDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRendezVous(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRendezVous = new RendezVousVo();
            this.createRendezVousDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRendezVous(rendezVous:RendezVousVo){
       const isPermistted = await this.roleService.isPermitted('RendezVous', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rendez vous) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rendezVousService.delete(rendezVous).subscribe(status=>{
                          if(status > 0){
                          const position = this.rendezVouss.indexOf(rendezVous);
                          position > -1 ? this.rendezVouss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rendez vous Supprimé',
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


public async duplicateRendezVous(rendezVous: RendezVousVo) {

     this.rendezVousService.findByIdWithAssociatedList(rendezVous).subscribe(
	 res => {
	       this.initDuplicateRendezVous(res);
	       this.selectedRendezVous = res;
	       this.selectedRendezVous.id = null;
            this.createRendezVousDialog = true;

});

	}

	initDuplicateRendezVous(res: RendezVousVo) {
        if (res.pieceJointeRendezVousVo != null) {
             res.pieceJointeRendezVousVo.forEach(d => { d.rendezVousVo = null; d.id = null; });
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
    this.exportData = this.rendezVouss.map(e => {
    return {
                    'Reference': e.reference ,
                    'Description': e.description ,
                    'Date debut': this.datePipe.transform(e.dateDebut , 'dd-MM-yyyy'),
                    'Pv': e.pv ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchRendezVous.reference ? this.searchRendezVous.reference : environment.emptyForExport ,
            'Description': this.searchRendezVous.description ? this.searchRendezVous.description : environment.emptyForExport ,
            'Date debut Min': this.searchRendezVous.dateDebutMin ? this.datePipe.transform(this.searchRendezVous.dateDebutMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut Max': this.searchRendezVous.dateDebutMax ? this.datePipe.transform(this.searchRendezVous.dateDebutMax , this.dateFormat) : environment.emptyForExport ,
            'Pv': this.searchRendezVous.pv ? this.searchRendezVous.pv : environment.emptyForExport ,
            'Piece jointe rendez vous Min': this.searchRendezVous.pieceJointeRendezVousMin ? this.searchRendezVous.pieceJointeRendezVousMin : environment.emptyForExport ,
            'Piece jointe rendez vous Max': this.searchRendezVous.pieceJointeRendezVousMax ? this.searchRendezVous.pieceJointeRendezVousMax : environment.emptyForExport ,
            'Archive': this.searchRendezVous.archive ? (this.searchRendezVous.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchRendezVous.dateArchivageMin ? this.datePipe.transform(this.searchRendezVous.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchRendezVous.dateArchivageMax ? this.datePipe.transform(this.searchRendezVous.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchRendezVous.dateCreationMin ? this.datePipe.transform(this.searchRendezVous.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchRendezVous.dateCreationMax ? this.datePipe.transform(this.searchRendezVous.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchRendezVous.admin ? (this.searchRendezVous.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchRendezVous.visible ? (this.searchRendezVous.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchRendezVous.username ? this.searchRendezVous.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rendezVouss(): Array<RendezVousVo> {
           return this.rendezVousService.rendezVouss;
       }
    set rendezVouss(value: Array<RendezVousVo>) {
        this.rendezVousService.rendezVouss = value;
       }

    get rendezVousSelections(): Array<RendezVousVo> {
           return this.rendezVousService.rendezVousSelections;
       }
    set rendezVousSelections(value: Array<RendezVousVo>) {
        this.rendezVousService.rendezVousSelections = value;
       }
   
     


    get selectedRendezVous():RendezVousVo {
           return this.rendezVousService.selectedRendezVous;
       }
    set selectedRendezVous(value: RendezVousVo) {
        this.rendezVousService.selectedRendezVous = value;
       }
    
    get createRendezVousDialog():boolean {
           return this.rendezVousService.createRendezVousDialog;
       }
    set createRendezVousDialog(value: boolean) {
        this.rendezVousService.createRendezVousDialog= value;
       }
    
    get editRendezVousDialog():boolean {
           return this.rendezVousService.editRendezVousDialog;
       }
    set editRendezVousDialog(value: boolean) {
        this.rendezVousService.editRendezVousDialog= value;
       }
    get viewRendezVousDialog():boolean {
           return this.rendezVousService.viewRendezVousDialog;
       }
    set viewRendezVousDialog(value: boolean) {
        this.rendezVousService.viewRendezVousDialog = value;
       }
       
     get searchRendezVous(): RendezVousVo {
        return this.rendezVousService.searchRendezVous;
       }
    set searchRendezVous(value: RendezVousVo) {
        this.rendezVousService.searchRendezVous = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
