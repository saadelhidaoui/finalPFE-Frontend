import {Component, OnInit} from '@angular/core';
import {EtatPrestationService} from '../../../../../../controller/service/EtatPrestation.service';
import {EtatPrestationVo} from '../../../../../../controller/model/EtatPrestation.model';
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
  selector: 'app-etat-prestation-list-adherent',
  templateUrl: './etat-prestation-list-adherent.component.html',
  styleUrls: ['./etat-prestation-list-adherent.component.css']
})
export class EtatPrestationListAdherentComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatPrestation';


    constructor(private datePipe: DatePipe, private etatPrestationService: EtatPrestationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatPrestations();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatPrestations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatPrestation', 'list');
        isPermistted ? this.etatPrestationService.findAll().subscribe(etatPrestations => this.etatPrestations = etatPrestations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatPrestationService.findByCriteria(this.searchEtatPrestation).subscribe(etatPrestations=>{
            
            this.etatPrestations = etatPrestations;
           // this.searchEtatPrestation = new EtatPrestationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editEtatPrestation(etatPrestation:EtatPrestationVo){
        const isPermistted = await this.roleService.isPermitted('EtatPrestation', 'edit');
         if(isPermistted){
          this.etatPrestationService.findByIdWithAssociatedList(etatPrestation).subscribe(res => {
           this.selectedEtatPrestation = res;
            this.editEtatPrestationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatPrestation(etatPrestation:EtatPrestationVo){
        const isPermistted = await this.roleService.isPermitted('EtatPrestation', 'view');
        if(isPermistted){
           this.etatPrestationService.findByIdWithAssociatedList(etatPrestation).subscribe(res => {
           this.selectedEtatPrestation = res;
            this.viewEtatPrestationDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatPrestation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatPrestation = new EtatPrestationVo();
            this.createEtatPrestationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatPrestation(etatPrestation:EtatPrestationVo){
       const isPermistted = await this.roleService.isPermitted('EtatPrestation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat prestation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatPrestationService.delete(etatPrestation).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatPrestations.indexOf(etatPrestation);
                          position > -1 ? this.etatPrestations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat prestation Supprimé',
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


public async duplicateEtatPrestation(etatPrestation: EtatPrestationVo) {

     this.etatPrestationService.findByIdWithAssociatedList(etatPrestation).subscribe(
	 res => {
	       this.initDuplicateEtatPrestation(res);
	       this.selectedEtatPrestation = res;
	       this.selectedEtatPrestation.id = null;
            this.createEtatPrestationDialog = true;

});

	}

	initDuplicateEtatPrestation(res: EtatPrestationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatPrestations.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEtatPrestation.reference ? this.searchEtatPrestation.reference : environment.emptyForExport ,
            'Libelle': this.searchEtatPrestation.libelle ? this.searchEtatPrestation.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatPrestations(): Array<EtatPrestationVo> {
           return this.etatPrestationService.etatPrestations;
       }
    set etatPrestations(value: Array<EtatPrestationVo>) {
        this.etatPrestationService.etatPrestations = value;
       }

    get etatPrestationSelections(): Array<EtatPrestationVo> {
           return this.etatPrestationService.etatPrestationSelections;
       }
    set etatPrestationSelections(value: Array<EtatPrestationVo>) {
        this.etatPrestationService.etatPrestationSelections = value;
       }
   
     


    get selectedEtatPrestation():EtatPrestationVo {
           return this.etatPrestationService.selectedEtatPrestation;
       }
    set selectedEtatPrestation(value: EtatPrestationVo) {
        this.etatPrestationService.selectedEtatPrestation = value;
       }
    
    get createEtatPrestationDialog():boolean {
           return this.etatPrestationService.createEtatPrestationDialog;
       }
    set createEtatPrestationDialog(value: boolean) {
        this.etatPrestationService.createEtatPrestationDialog= value;
       }
    
    get editEtatPrestationDialog():boolean {
           return this.etatPrestationService.editEtatPrestationDialog;
       }
    set editEtatPrestationDialog(value: boolean) {
        this.etatPrestationService.editEtatPrestationDialog= value;
       }
    get viewEtatPrestationDialog():boolean {
           return this.etatPrestationService.viewEtatPrestationDialog;
       }
    set viewEtatPrestationDialog(value: boolean) {
        this.etatPrestationService.viewEtatPrestationDialog = value;
       }
       
     get searchEtatPrestation(): EtatPrestationVo {
        return this.etatPrestationService.searchEtatPrestation;
       }
    set searchEtatPrestation(value: EtatPrestationVo) {
        this.etatPrestationService.searchEtatPrestation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
