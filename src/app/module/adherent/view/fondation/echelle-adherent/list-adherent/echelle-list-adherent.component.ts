import {Component, OnInit} from '@angular/core';
import {EchelleService} from '../../../../../../controller/service/Echelle.service';
import {EchelleVo} from '../../../../../../controller/model/Echelle.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EchelonService } from '../../../../../../controller/service/Echelon.service';

import {EchelonVo} from '../../../../../../controller/model/Echelon.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-echelle-list-adherent',
  templateUrl: './echelle-list-adherent.component.html',
  styleUrls: ['./echelle-list-adherent.component.css']
})
export class EchelleListAdherentComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Echelle';
    echelons :Array<EchelonVo>;


    constructor(private datePipe: DatePipe, private echelleService: EchelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private echelonService: EchelonService
) { }

    ngOnInit(): void {
      this.loadEchelles();
      this.initExport();
      this.initCol();
      this.loadEchelon();
    }
    
    // methods
      public async loadEchelles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Echelle', 'list');
        isPermistted ? this.echelleService.findAll().subscribe(echelles => this.echelles = echelles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.echelleService.findByCriteria(this.searchEchelle).subscribe(echelles=>{
            
            this.echelles = echelles;
           // this.searchEchelle = new EchelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'echelon?.libelle', header: 'Echelon'},
        ];
    }
    
    public async editEchelle(echelle:EchelleVo){
        const isPermistted = await this.roleService.isPermitted('Echelle', 'edit');
         if(isPermistted){
          this.echelleService.findByIdWithAssociatedList(echelle).subscribe(res => {
           this.selectedEchelle = res;
            this.editEchelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEchelle(echelle:EchelleVo){
        const isPermistted = await this.roleService.isPermitted('Echelle', 'view');
        if(isPermistted){
           this.echelleService.findByIdWithAssociatedList(echelle).subscribe(res => {
           this.selectedEchelle = res;
            this.viewEchelleDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEchelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEchelle = new EchelleVo();
            this.createEchelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEchelle(echelle:EchelleVo){
       const isPermistted = await this.roleService.isPermitted('Echelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Echelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.echelleService.delete(echelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.echelles.indexOf(echelle);
                          position > -1 ? this.echelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Echelle Supprimé',
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

public async loadEchelon(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Echelle', 'list');
    isPermistted ? this.echelonService.findAll().subscribe(echelons => this.echelons = echelons,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEchelle(echelle: EchelleVo) {

     this.echelleService.findByIdWithAssociatedList(echelle).subscribe(
	 res => {
	       this.initDuplicateEchelle(res);
	       this.selectedEchelle = res;
	       this.selectedEchelle.id = null;
            this.createEchelleDialog = true;

});

	}

	initDuplicateEchelle(res: EchelleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.echelles.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
            'Echelon': e.echelonVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEchelle.reference ? this.searchEchelle.reference : environment.emptyForExport ,
            'Libelle': this.searchEchelle.libelle ? this.searchEchelle.libelle : environment.emptyForExport ,
        'Echelon': this.searchEchelle.echelonVo?.libelle ? this.searchEchelle.echelonVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get echelles(): Array<EchelleVo> {
           return this.echelleService.echelles;
       }
    set echelles(value: Array<EchelleVo>) {
        this.echelleService.echelles = value;
       }

    get echelleSelections(): Array<EchelleVo> {
           return this.echelleService.echelleSelections;
       }
    set echelleSelections(value: Array<EchelleVo>) {
        this.echelleService.echelleSelections = value;
       }
   
     


    get selectedEchelle():EchelleVo {
           return this.echelleService.selectedEchelle;
       }
    set selectedEchelle(value: EchelleVo) {
        this.echelleService.selectedEchelle = value;
       }
    
    get createEchelleDialog():boolean {
           return this.echelleService.createEchelleDialog;
       }
    set createEchelleDialog(value: boolean) {
        this.echelleService.createEchelleDialog= value;
       }
    
    get editEchelleDialog():boolean {
           return this.echelleService.editEchelleDialog;
       }
    set editEchelleDialog(value: boolean) {
        this.echelleService.editEchelleDialog= value;
       }
    get viewEchelleDialog():boolean {
           return this.echelleService.viewEchelleDialog;
       }
    set viewEchelleDialog(value: boolean) {
        this.echelleService.viewEchelleDialog = value;
       }
       
     get searchEchelle(): EchelleVo {
        return this.echelleService.searchEchelle;
       }
    set searchEchelle(value: EchelleVo) {
        this.echelleService.searchEchelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
