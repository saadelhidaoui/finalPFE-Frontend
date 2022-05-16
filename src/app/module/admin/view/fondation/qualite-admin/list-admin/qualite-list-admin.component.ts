import {Component, OnInit} from '@angular/core';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-qualite-list-admin',
  templateUrl: './qualite-list-admin.component.html',
  styleUrls: ['./qualite-list-admin.component.css']
})
export class QualiteListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Qualite';


    constructor(private datePipe: DatePipe, private qualiteService: QualiteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadQualites();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadQualites(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Qualite', 'list');
        isPermistted ? this.qualiteService.findAll().subscribe(qualites => this.qualites = qualites,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.qualiteService.findByCriteria(this.searchQualite).subscribe(qualites=>{
            
            this.qualites = qualites;
           // this.searchQualite = new QualiteVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editQualite(qualite:QualiteVo){
        const isPermistted = await this.roleService.isPermitted('Qualite', 'edit');
         if(isPermistted){
          this.qualiteService.findByIdWithAssociatedList(qualite).subscribe(res => {
           this.selectedQualite = res;
            this.editQualiteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewQualite(qualite:QualiteVo){
        const isPermistted = await this.roleService.isPermitted('Qualite', 'view');
        if(isPermistted){
           this.qualiteService.findByIdWithAssociatedList(qualite).subscribe(res => {
           this.selectedQualite = res;
            this.viewQualiteDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateQualite(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedQualite = new QualiteVo();
            this.createQualiteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteQualite(qualite:QualiteVo){
       const isPermistted = await this.roleService.isPermitted('Qualite', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Qualite) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.qualiteService.delete(qualite).subscribe(status=>{
                          if(status > 0){
                          const position = this.qualites.indexOf(qualite);
                          position > -1 ? this.qualites.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Qualite Supprimé',
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


public async duplicateQualite(qualite: QualiteVo) {

     this.qualiteService.findByIdWithAssociatedList(qualite).subscribe(
	 res => {
	       this.initDuplicateQualite(res);
	       this.selectedQualite = res;
	       this.selectedQualite.id = null;
            this.createQualiteDialog = true;

});

	}

	initDuplicateQualite(res: QualiteVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.qualites.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchQualite.reference ? this.searchQualite.reference : environment.emptyForExport ,
            'Libelle': this.searchQualite.libelle ? this.searchQualite.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get qualites(): Array<QualiteVo> {
           return this.qualiteService.qualites;
       }
    set qualites(value: Array<QualiteVo>) {
        this.qualiteService.qualites = value;
       }

    get qualiteSelections(): Array<QualiteVo> {
           return this.qualiteService.qualiteSelections;
       }
    set qualiteSelections(value: Array<QualiteVo>) {
        this.qualiteService.qualiteSelections = value;
       }
   
     


    get selectedQualite():QualiteVo {
           return this.qualiteService.selectedQualite;
       }
    set selectedQualite(value: QualiteVo) {
        this.qualiteService.selectedQualite = value;
       }
    
    get createQualiteDialog():boolean {
           return this.qualiteService.createQualiteDialog;
       }
    set createQualiteDialog(value: boolean) {
        this.qualiteService.createQualiteDialog= value;
       }
    
    get editQualiteDialog():boolean {
           return this.qualiteService.editQualiteDialog;
       }
    set editQualiteDialog(value: boolean) {
        this.qualiteService.editQualiteDialog= value;
       }
    get viewQualiteDialog():boolean {
           return this.qualiteService.viewQualiteDialog;
       }
    set viewQualiteDialog(value: boolean) {
        this.qualiteService.viewQualiteDialog = value;
       }
       
     get searchQualite(): QualiteVo {
        return this.qualiteService.searchQualite;
       }
    set searchQualite(value: QualiteVo) {
        this.qualiteService.searchQualite = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
