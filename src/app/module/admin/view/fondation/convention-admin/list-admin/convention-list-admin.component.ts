import {Component, OnInit} from '@angular/core';
import {ConventionService} from '../../../../../../controller/service/Convention.service';
import {ConventionVo} from '../../../../../../controller/model/Convention.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { OrganismeService } from '../../../../../../controller/service/Organisme.service';

import {OrganismeVo} from '../../../../../../controller/model/Organisme.model';
import {PieceJointeConventionVo} from '../../../../../../controller/model/PieceJointeConvention.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-convention-list-admin',
  templateUrl: './convention-list-admin.component.html',
  styleUrls: ['./convention-list-admin.component.css']
})
export class ConventionListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Convention';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    organismes :Array<OrganismeVo>;


    constructor(private datePipe: DatePipe, private conventionService: ConventionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private organismeService: OrganismeService
) { }

    ngOnInit(): void {
      this.loadConventions();
      this.initExport();
      this.initCol();
      this.loadOrganisme();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadConventions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Convention', 'list');
        isPermistted ? this.conventionService.findAll().subscribe(conventions => this.conventions = conventions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.conventionService.findByCriteria(this.searchConvention).subscribe(conventions=>{
            
            this.conventions = conventions;
           // this.searchConvention = new ConventionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'organisme?.libelle', header: 'Organisme'},
                            {field: 'dateDebut', header: 'Date debut'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editConvention(convention:ConventionVo){
        const isPermistted = await this.roleService.isPermitted('Convention', 'edit');
         if(isPermistted){
          this.conventionService.findByIdWithAssociatedList(convention).subscribe(res => {
           this.selectedConvention = res;
            this.selectedConvention.dateDebut = new Date(convention.dateDebut);
            this.selectedConvention.dateArchivage = new Date(convention.dateArchivage);
            this.selectedConvention.dateCreation = new Date(convention.dateCreation);
            this.editConventionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewConvention(convention:ConventionVo){
        const isPermistted = await this.roleService.isPermitted('Convention', 'view');
        if(isPermistted){
           this.conventionService.findByIdWithAssociatedList(convention).subscribe(res => {
           this.selectedConvention = res;
            this.selectedConvention.dateDebut = new Date(convention.dateDebut);
            this.selectedConvention.dateArchivage = new Date(convention.dateArchivage);
            this.selectedConvention.dateCreation = new Date(convention.dateCreation);
            this.viewConventionDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateConvention(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedConvention = new ConventionVo();
            this.createConventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverConvention(convention:ConventionVo){
const isPermistted = await this.roleService.isPermitted('Convention', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Convention) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.conventionService.archiver(convention).subscribe(status=>{
const myIndex = this.conventions.indexOf(convention);
this.conventions[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Convention archivé',
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

public async desarchiverConvention(convention:ConventionVo){
const isPermistted = await this.roleService.isPermitted('Convention', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Convention) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.conventionService.desarchiver(convention).subscribe(status=>{
const myIndex = this.conventions.indexOf(convention);
this.conventions[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Convention désarchivé',
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


    public async deleteConvention(convention:ConventionVo){
       const isPermistted = await this.roleService.isPermitted('Convention', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Convention) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.conventionService.delete(convention).subscribe(status=>{
                          if(status > 0){
                          const position = this.conventions.indexOf(convention);
                          position > -1 ? this.conventions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Convention Supprimé',
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

public async loadOrganisme(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Convention', 'list');
    isPermistted ? this.organismeService.findAll().subscribe(organismes => this.organismes = organismes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateConvention(convention: ConventionVo) {

     this.conventionService.findByIdWithAssociatedList(convention).subscribe(
	 res => {
	       this.initDuplicateConvention(res);
	       this.selectedConvention = res;
	       this.selectedConvention.id = null;
            this.createConventionDialog = true;

});

	}

	initDuplicateConvention(res: ConventionVo) {
        if (res.pieceJointeConventionsVo != null) {
             res.pieceJointeConventionsVo.forEach(d => { d.conventionVo = null; d.id = null; });
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
    this.exportData = this.conventions.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
            'Organisme': e.organismeVo?.libelle ,
                    'Description': e.description ,
                    'Date debut': this.datePipe.transform(e.dateDebut , 'dd-MM-yyyy'),
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchConvention.reference ? this.searchConvention.reference : environment.emptyForExport ,
            'Libelle': this.searchConvention.libelle ? this.searchConvention.libelle : environment.emptyForExport ,
        'Organisme': this.searchConvention.organismeVo?.libelle ? this.searchConvention.organismeVo?.libelle : environment.emptyForExport ,
            'Description': this.searchConvention.description ? this.searchConvention.description : environment.emptyForExport ,
            'Date debut Min': this.searchConvention.dateDebutMin ? this.datePipe.transform(this.searchConvention.dateDebutMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut Max': this.searchConvention.dateDebutMax ? this.datePipe.transform(this.searchConvention.dateDebutMax , this.dateFormat) : environment.emptyForExport ,
            'Piece jointe conventions Min': this.searchConvention.pieceJointeConventionsMin ? this.searchConvention.pieceJointeConventionsMin : environment.emptyForExport ,
            'Piece jointe conventions Max': this.searchConvention.pieceJointeConventionsMax ? this.searchConvention.pieceJointeConventionsMax : environment.emptyForExport ,
            'Archive': this.searchConvention.archive ? (this.searchConvention.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchConvention.dateArchivageMin ? this.datePipe.transform(this.searchConvention.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchConvention.dateArchivageMax ? this.datePipe.transform(this.searchConvention.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchConvention.dateCreationMin ? this.datePipe.transform(this.searchConvention.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchConvention.dateCreationMax ? this.datePipe.transform(this.searchConvention.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchConvention.admin ? (this.searchConvention.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchConvention.visible ? (this.searchConvention.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchConvention.username ? this.searchConvention.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get conventions(): Array<ConventionVo> {
           return this.conventionService.conventions;
       }
    set conventions(value: Array<ConventionVo>) {
        this.conventionService.conventions = value;
       }

    get conventionSelections(): Array<ConventionVo> {
           return this.conventionService.conventionSelections;
       }
    set conventionSelections(value: Array<ConventionVo>) {
        this.conventionService.conventionSelections = value;
       }
   
     


    get selectedConvention():ConventionVo {
           return this.conventionService.selectedConvention;
       }
    set selectedConvention(value: ConventionVo) {
        this.conventionService.selectedConvention = value;
       }
    
    get createConventionDialog():boolean {
           return this.conventionService.createConventionDialog;
       }
    set createConventionDialog(value: boolean) {
        this.conventionService.createConventionDialog= value;
       }
    
    get editConventionDialog():boolean {
           return this.conventionService.editConventionDialog;
       }
    set editConventionDialog(value: boolean) {
        this.conventionService.editConventionDialog= value;
       }
    get viewConventionDialog():boolean {
           return this.conventionService.viewConventionDialog;
       }
    set viewConventionDialog(value: boolean) {
        this.conventionService.viewConventionDialog = value;
       }
       
     get searchConvention(): ConventionVo {
        return this.conventionService.searchConvention;
       }
    set searchConvention(value: ConventionVo) {
        this.conventionService.searchConvention = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
