import {Component, OnInit} from '@angular/core';
import {EtatDemandeEstivageService} from '../../../../../../controller/service/EtatDemandeEstivage.service';
import {EtatDemandeEstivageVo} from '../../../../../../controller/model/EtatDemandeEstivage.model';
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
  selector: 'app-etat-demande-estivage-list-admin',
  templateUrl: './etat-demande-estivage-list-admin.component.html',
  styleUrls: ['./etat-demande-estivage-list-admin.component.css']
})
export class EtatDemandeEstivageListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatDemandeEstivage';


    constructor(private datePipe: DatePipe, private etatDemandeEstivageService: EtatDemandeEstivageService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatDemandeEstivages();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatDemandeEstivages(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatDemandeEstivage', 'list');
        isPermistted ? this.etatDemandeEstivageService.findAll().subscribe(etatDemandeEstivages => this.etatDemandeEstivages = etatDemandeEstivages,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatDemandeEstivageService.findByCriteria(this.searchEtatDemandeEstivage).subscribe(etatDemandeEstivages=>{
            
            this.etatDemandeEstivages = etatDemandeEstivages;
           // this.searchEtatDemandeEstivage = new EtatDemandeEstivageVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editEtatDemandeEstivage(etatDemandeEstivage:EtatDemandeEstivageVo){
        const isPermistted = await this.roleService.isPermitted('EtatDemandeEstivage', 'edit');
         if(isPermistted){
          this.etatDemandeEstivageService.findByIdWithAssociatedList(etatDemandeEstivage).subscribe(res => {
           this.selectedEtatDemandeEstivage = res;
            this.editEtatDemandeEstivageDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatDemandeEstivage(etatDemandeEstivage:EtatDemandeEstivageVo){
        const isPermistted = await this.roleService.isPermitted('EtatDemandeEstivage', 'view');
        if(isPermistted){
           this.etatDemandeEstivageService.findByIdWithAssociatedList(etatDemandeEstivage).subscribe(res => {
           this.selectedEtatDemandeEstivage = res;
            this.viewEtatDemandeEstivageDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatDemandeEstivage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatDemandeEstivage = new EtatDemandeEstivageVo();
            this.createEtatDemandeEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatDemandeEstivage(etatDemandeEstivage:EtatDemandeEstivageVo){
       const isPermistted = await this.roleService.isPermitted('EtatDemandeEstivage', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat demande estivage) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatDemandeEstivageService.delete(etatDemandeEstivage).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatDemandeEstivages.indexOf(etatDemandeEstivage);
                          position > -1 ? this.etatDemandeEstivages.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat demande estivage Supprimé',
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


public async duplicateEtatDemandeEstivage(etatDemandeEstivage: EtatDemandeEstivageVo) {

     this.etatDemandeEstivageService.findByIdWithAssociatedList(etatDemandeEstivage).subscribe(
	 res => {
	       this.initDuplicateEtatDemandeEstivage(res);
	       this.selectedEtatDemandeEstivage = res;
	       this.selectedEtatDemandeEstivage.id = null;
            this.createEtatDemandeEstivageDialog = true;

});

	}

	initDuplicateEtatDemandeEstivage(res: EtatDemandeEstivageVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatDemandeEstivages.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEtatDemandeEstivage.reference ? this.searchEtatDemandeEstivage.reference : environment.emptyForExport ,
            'Libelle': this.searchEtatDemandeEstivage.libelle ? this.searchEtatDemandeEstivage.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatDemandeEstivages(): Array<EtatDemandeEstivageVo> {
           return this.etatDemandeEstivageService.etatDemandeEstivages;
       }
    set etatDemandeEstivages(value: Array<EtatDemandeEstivageVo>) {
        this.etatDemandeEstivageService.etatDemandeEstivages = value;
       }

    get etatDemandeEstivageSelections(): Array<EtatDemandeEstivageVo> {
           return this.etatDemandeEstivageService.etatDemandeEstivageSelections;
       }
    set etatDemandeEstivageSelections(value: Array<EtatDemandeEstivageVo>) {
        this.etatDemandeEstivageService.etatDemandeEstivageSelections = value;
       }
   
     


    get selectedEtatDemandeEstivage():EtatDemandeEstivageVo {
           return this.etatDemandeEstivageService.selectedEtatDemandeEstivage;
       }
    set selectedEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this.etatDemandeEstivageService.selectedEtatDemandeEstivage = value;
       }
    
    get createEtatDemandeEstivageDialog():boolean {
           return this.etatDemandeEstivageService.createEtatDemandeEstivageDialog;
       }
    set createEtatDemandeEstivageDialog(value: boolean) {
        this.etatDemandeEstivageService.createEtatDemandeEstivageDialog= value;
       }
    
    get editEtatDemandeEstivageDialog():boolean {
           return this.etatDemandeEstivageService.editEtatDemandeEstivageDialog;
       }
    set editEtatDemandeEstivageDialog(value: boolean) {
        this.etatDemandeEstivageService.editEtatDemandeEstivageDialog= value;
       }
    get viewEtatDemandeEstivageDialog():boolean {
           return this.etatDemandeEstivageService.viewEtatDemandeEstivageDialog;
       }
    set viewEtatDemandeEstivageDialog(value: boolean) {
        this.etatDemandeEstivageService.viewEtatDemandeEstivageDialog = value;
       }
       
     get searchEtatDemandeEstivage(): EtatDemandeEstivageVo {
        return this.etatDemandeEstivageService.searchEtatDemandeEstivage;
       }
    set searchEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this.etatDemandeEstivageService.searchEtatDemandeEstivage = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
