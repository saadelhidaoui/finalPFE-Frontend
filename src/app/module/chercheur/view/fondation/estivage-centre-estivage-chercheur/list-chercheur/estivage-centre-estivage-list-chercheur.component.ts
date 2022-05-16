import {Component, OnInit} from '@angular/core';
import {EstivageCentreEstivageService} from '../../../../../../controller/service/EstivageCentreEstivage.service';
import {EstivageCentreEstivageVo} from '../../../../../../controller/model/EstivageCentreEstivage.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CentreEstivageService } from '../../../../../../controller/service/CentreEstivage.service';
import { EstivageService } from '../../../../../../controller/service/Estivage.service';

import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-estivage-centre-estivage-list-chercheur',
  templateUrl: './estivage-centre-estivage-list-chercheur.component.html',
  styleUrls: ['./estivage-centre-estivage-list-chercheur.component.css']
})
export class EstivageCentreEstivageListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EstivageCentreEstivage';
    centreEstivages :Array<CentreEstivageVo>;
    estivages :Array<EstivageVo>;


    constructor(private datePipe: DatePipe, private estivageCentreEstivageService: EstivageCentreEstivageService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private centreEstivageService: CentreEstivageService
        , private estivageService: EstivageService
) { }

    ngOnInit(): void {
      this.loadEstivageCentreEstivages();
      this.initExport();
      this.initCol();
      this.loadCentreEstivage();
      this.loadEstivage();
    }
    
    // methods
      public async loadEstivageCentreEstivages(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EstivageCentreEstivage', 'list');
        isPermistted ? this.estivageCentreEstivageService.findAll().subscribe(estivageCentreEstivages => this.estivageCentreEstivages = estivageCentreEstivages,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.estivageCentreEstivageService.findByCriteria(this.searchEstivageCentreEstivage).subscribe(estivageCentreEstivages=>{
            
            this.estivageCentreEstivages = estivageCentreEstivages;
           // this.searchEstivageCentreEstivage = new EstivageCentreEstivageVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                        {field: 'centreEstivage?.libelle', header: 'Centre estivage'},
                        {field: 'estivage?.reference', header: 'Estivage'},
                            {field: 'ordre', header: 'Ordre'},
        ];
    }
    
    public async editEstivageCentreEstivage(estivageCentreEstivage:EstivageCentreEstivageVo){
        const isPermistted = await this.roleService.isPermitted('EstivageCentreEstivage', 'edit');
         if(isPermistted){
          this.estivageCentreEstivageService.findByIdWithAssociatedList(estivageCentreEstivage).subscribe(res => {
           this.selectedEstivageCentreEstivage = res;
            this.editEstivageCentreEstivageDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEstivageCentreEstivage(estivageCentreEstivage:EstivageCentreEstivageVo){
        const isPermistted = await this.roleService.isPermitted('EstivageCentreEstivage', 'view');
        if(isPermistted){
           this.estivageCentreEstivageService.findByIdWithAssociatedList(estivageCentreEstivage).subscribe(res => {
           this.selectedEstivageCentreEstivage = res;
            this.viewEstivageCentreEstivageDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEstivageCentreEstivage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEstivageCentreEstivage = new EstivageCentreEstivageVo();
            this.createEstivageCentreEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEstivageCentreEstivage(estivageCentreEstivage:EstivageCentreEstivageVo){
       const isPermistted = await this.roleService.isPermitted('EstivageCentreEstivage', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Estivage centre estivage) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.estivageCentreEstivageService.delete(estivageCentreEstivage).subscribe(status=>{
                          if(status > 0){
                          const position = this.estivageCentreEstivages.indexOf(estivageCentreEstivage);
                          position > -1 ? this.estivageCentreEstivages.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Estivage centre estivage Supprimé',
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

public async loadCentreEstivage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EstivageCentreEstivage', 'list');
    isPermistted ? this.centreEstivageService.findAll().subscribe(centreEstivages => this.centreEstivages = centreEstivages,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEstivage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EstivageCentreEstivage', 'list');
    isPermistted ? this.estivageService.findAll().subscribe(estivages => this.estivages = estivages,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEstivageCentreEstivage(estivageCentreEstivage: EstivageCentreEstivageVo) {

     this.estivageCentreEstivageService.findByIdWithAssociatedList(estivageCentreEstivage).subscribe(
	 res => {
	       this.initDuplicateEstivageCentreEstivage(res);
	       this.selectedEstivageCentreEstivage = res;
	       this.selectedEstivageCentreEstivage.id = null;
            this.createEstivageCentreEstivageDialog = true;

});

	}

	initDuplicateEstivageCentreEstivage(res: EstivageCentreEstivageVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.estivageCentreEstivages.map(e => {
    return {
                    'Reference': e.reference ,
            'Centre estivage': e.centreEstivageVo?.libelle ,
            'Estivage': e.estivageVo?.reference ,
                    'Ordre': e.ordre ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEstivageCentreEstivage.reference ? this.searchEstivageCentreEstivage.reference : environment.emptyForExport ,
        'Centre estivage': this.searchEstivageCentreEstivage.centreEstivageVo?.libelle ? this.searchEstivageCentreEstivage.centreEstivageVo?.libelle : environment.emptyForExport ,
        'Estivage': this.searchEstivageCentreEstivage.estivageVo?.reference ? this.searchEstivageCentreEstivage.estivageVo?.reference : environment.emptyForExport ,
            'Ordre Min': this.searchEstivageCentreEstivage.ordreMin ? this.searchEstivageCentreEstivage.ordreMin : environment.emptyForExport ,
            'Ordre Max': this.searchEstivageCentreEstivage.ordreMax ? this.searchEstivageCentreEstivage.ordreMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get estivageCentreEstivages(): Array<EstivageCentreEstivageVo> {
           return this.estivageCentreEstivageService.estivageCentreEstivages;
       }
    set estivageCentreEstivages(value: Array<EstivageCentreEstivageVo>) {
        this.estivageCentreEstivageService.estivageCentreEstivages = value;
       }

    get estivageCentreEstivageSelections(): Array<EstivageCentreEstivageVo> {
           return this.estivageCentreEstivageService.estivageCentreEstivageSelections;
       }
    set estivageCentreEstivageSelections(value: Array<EstivageCentreEstivageVo>) {
        this.estivageCentreEstivageService.estivageCentreEstivageSelections = value;
       }
   
     


    get selectedEstivageCentreEstivage():EstivageCentreEstivageVo {
           return this.estivageCentreEstivageService.selectedEstivageCentreEstivage;
       }
    set selectedEstivageCentreEstivage(value: EstivageCentreEstivageVo) {
        this.estivageCentreEstivageService.selectedEstivageCentreEstivage = value;
       }
    
    get createEstivageCentreEstivageDialog():boolean {
           return this.estivageCentreEstivageService.createEstivageCentreEstivageDialog;
       }
    set createEstivageCentreEstivageDialog(value: boolean) {
        this.estivageCentreEstivageService.createEstivageCentreEstivageDialog= value;
       }
    
    get editEstivageCentreEstivageDialog():boolean {
           return this.estivageCentreEstivageService.editEstivageCentreEstivageDialog;
       }
    set editEstivageCentreEstivageDialog(value: boolean) {
        this.estivageCentreEstivageService.editEstivageCentreEstivageDialog= value;
       }
    get viewEstivageCentreEstivageDialog():boolean {
           return this.estivageCentreEstivageService.viewEstivageCentreEstivageDialog;
       }
    set viewEstivageCentreEstivageDialog(value: boolean) {
        this.estivageCentreEstivageService.viewEstivageCentreEstivageDialog = value;
       }
       
     get searchEstivageCentreEstivage(): EstivageCentreEstivageVo {
        return this.estivageCentreEstivageService.searchEstivageCentreEstivage;
       }
    set searchEstivageCentreEstivage(value: EstivageCentreEstivageVo) {
        this.estivageCentreEstivageService.searchEstivageCentreEstivage = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
