import {Component, OnInit} from '@angular/core';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { VilleService } from '../../../../../../controller/service/Ville.service';

import {VilleVo} from '../../../../../../controller/model/Ville.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-centre-estivage-list-moderateur',
  templateUrl: './centre-estivage-list-moderateur.component.html',
  styleUrls: ['./centre-estivage-list-moderateur.component.css']
})
export class CentreEstivageListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CentreEstivage';
     yesOrNoVip :any[] =[];
    villes :Array<VilleVo>;


    constructor(private datePipe: DatePipe, private centreEstivageService: CentreEstivageService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private villeService: VilleService
) { }

    ngOnInit(): void {
      this.loadCentreEstivages();
      this.initExport();
      this.initCol();
      this.loadVille();
    this.yesOrNoVip =  [{label: 'Vip', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCentreEstivages(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CentreEstivage', 'list');
        isPermistted ? this.centreEstivageService.findAll().subscribe(centreEstivages => this.centreEstivages = centreEstivages,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.centreEstivageService.findByCriteria(this.searchCentreEstivage).subscribe(centreEstivages=>{
            
            this.centreEstivages = centreEstivages;
           // this.searchCentreEstivage = new CentreEstivageVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'capacite', header: 'Capacite'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'ville?.libelle', header: 'Ville'},
                            {field: 'vip', header: 'Vip'},
        ];
    }
    
    public async editCentreEstivage(centreEstivage:CentreEstivageVo){
        const isPermistted = await this.roleService.isPermitted('CentreEstivage', 'edit');
         if(isPermistted){
          this.centreEstivageService.findByIdWithAssociatedList(centreEstivage).subscribe(res => {
           this.selectedCentreEstivage = res;
            this.editCentreEstivageDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCentreEstivage(centreEstivage:CentreEstivageVo){
        const isPermistted = await this.roleService.isPermitted('CentreEstivage', 'view');
        if(isPermistted){
           this.centreEstivageService.findByIdWithAssociatedList(centreEstivage).subscribe(res => {
           this.selectedCentreEstivage = res;
            this.viewCentreEstivageDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCentreEstivage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCentreEstivage = new CentreEstivageVo();
            this.createCentreEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCentreEstivage(centreEstivage:CentreEstivageVo){
       const isPermistted = await this.roleService.isPermitted('CentreEstivage', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Centre estivage) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.centreEstivageService.delete(centreEstivage).subscribe(status=>{
                          if(status > 0){
                          const position = this.centreEstivages.indexOf(centreEstivage);
                          position > -1 ? this.centreEstivages.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Centre estivage Supprimé',
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

public async loadVille(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CentreEstivage', 'list');
    isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCentreEstivage(centreEstivage: CentreEstivageVo) {

     this.centreEstivageService.findByIdWithAssociatedList(centreEstivage).subscribe(
	 res => {
	       this.initDuplicateCentreEstivage(res);
	       this.selectedCentreEstivage = res;
	       this.selectedCentreEstivage.id = null;
            this.createCentreEstivageDialog = true;

});

	}

	initDuplicateCentreEstivage(res: CentreEstivageVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.centreEstivages.map(e => {
    return {
                    'Reference': e.reference ,
                    'Capacite': e.capacite ,
                    'Libelle': e.libelle ,
            'Ville': e.villeVo?.libelle ,
                    'Vip': e.vip? 'Vrai' : 'Faux' ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchCentreEstivage.reference ? this.searchCentreEstivage.reference : environment.emptyForExport ,
            'Capacite Min': this.searchCentreEstivage.capaciteMin ? this.searchCentreEstivage.capaciteMin : environment.emptyForExport ,
            'Capacite Max': this.searchCentreEstivage.capaciteMax ? this.searchCentreEstivage.capaciteMax : environment.emptyForExport ,
            'Libelle': this.searchCentreEstivage.libelle ? this.searchCentreEstivage.libelle : environment.emptyForExport ,
        'Ville': this.searchCentreEstivage.villeVo?.libelle ? this.searchCentreEstivage.villeVo?.libelle : environment.emptyForExport ,
            'Vip': this.searchCentreEstivage.vip ? (this.searchCentreEstivage.vip ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get centreEstivages(): Array<CentreEstivageVo> {
           return this.centreEstivageService.centreEstivages;
       }
    set centreEstivages(value: Array<CentreEstivageVo>) {
        this.centreEstivageService.centreEstivages = value;
       }

    get centreEstivageSelections(): Array<CentreEstivageVo> {
           return this.centreEstivageService.centreEstivageSelections;
       }
    set centreEstivageSelections(value: Array<CentreEstivageVo>) {
        this.centreEstivageService.centreEstivageSelections = value;
       }
   
     


    get selectedCentreEstivage():CentreEstivageVo {
           return this.centreEstivageService.selectedCentreEstivage;
       }
    set selectedCentreEstivage(value: CentreEstivageVo) {
        this.centreEstivageService.selectedCentreEstivage = value;
       }
    
    get createCentreEstivageDialog():boolean {
           return this.centreEstivageService.createCentreEstivageDialog;
       }
    set createCentreEstivageDialog(value: boolean) {
        this.centreEstivageService.createCentreEstivageDialog= value;
       }
    
    get editCentreEstivageDialog():boolean {
           return this.centreEstivageService.editCentreEstivageDialog;
       }
    set editCentreEstivageDialog(value: boolean) {
        this.centreEstivageService.editCentreEstivageDialog= value;
       }
    get viewCentreEstivageDialog():boolean {
           return this.centreEstivageService.viewCentreEstivageDialog;
       }
    set viewCentreEstivageDialog(value: boolean) {
        this.centreEstivageService.viewCentreEstivageDialog = value;
       }
       
     get searchCentreEstivage(): CentreEstivageVo {
        return this.centreEstivageService.searchCentreEstivage;
       }
    set searchCentreEstivage(value: CentreEstivageVo) {
        this.centreEstivageService.searchCentreEstivage = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
