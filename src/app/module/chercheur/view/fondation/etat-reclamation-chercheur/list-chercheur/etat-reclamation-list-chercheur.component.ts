import {Component, OnInit} from '@angular/core';
import {EtatReclamationService} from '../../../../../../controller/service/EtatReclamation.service';
import {EtatReclamationVo} from '../../../../../../controller/model/EtatReclamation.model';
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
  selector: 'app-etat-reclamation-list-chercheur',
  templateUrl: './etat-reclamation-list-chercheur.component.html',
  styleUrls: ['./etat-reclamation-list-chercheur.component.css']
})
export class EtatReclamationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatReclamation';


    constructor(private datePipe: DatePipe, private etatReclamationService: EtatReclamationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatReclamations();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatReclamations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'list');
        isPermistted ? this.etatReclamationService.findAll().subscribe(etatReclamations => this.etatReclamations = etatReclamations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatReclamationService.findByCriteria(this.searchEtatReclamation).subscribe(etatReclamations=>{
            
            this.etatReclamations = etatReclamations;
           // this.searchEtatReclamation = new EtatReclamationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editEtatReclamation(etatReclamation:EtatReclamationVo){
        const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'edit');
         if(isPermistted){
          this.etatReclamationService.findByIdWithAssociatedList(etatReclamation).subscribe(res => {
           this.selectedEtatReclamation = res;
            this.editEtatReclamationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatReclamation(etatReclamation:EtatReclamationVo){
        const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'view');
        if(isPermistted){
           this.etatReclamationService.findByIdWithAssociatedList(etatReclamation).subscribe(res => {
           this.selectedEtatReclamation = res;
            this.viewEtatReclamationDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatReclamation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatReclamation = new EtatReclamationVo();
            this.createEtatReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatReclamation(etatReclamation:EtatReclamationVo){
       const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat reclamation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatReclamationService.delete(etatReclamation).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatReclamations.indexOf(etatReclamation);
                          position > -1 ? this.etatReclamations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat reclamation Supprimé',
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


public async duplicateEtatReclamation(etatReclamation: EtatReclamationVo) {

     this.etatReclamationService.findByIdWithAssociatedList(etatReclamation).subscribe(
	 res => {
	       this.initDuplicateEtatReclamation(res);
	       this.selectedEtatReclamation = res;
	       this.selectedEtatReclamation.id = null;
            this.createEtatReclamationDialog = true;

});

	}

	initDuplicateEtatReclamation(res: EtatReclamationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatReclamations.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEtatReclamation.reference ? this.searchEtatReclamation.reference : environment.emptyForExport ,
            'Libelle': this.searchEtatReclamation.libelle ? this.searchEtatReclamation.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatReclamations(): Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamations;
       }
    set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }

    get etatReclamationSelections(): Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamationSelections;
       }
    set etatReclamationSelections(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamationSelections = value;
       }
   
     


    get selectedEtatReclamation():EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
    set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }
    
    get createEtatReclamationDialog():boolean {
           return this.etatReclamationService.createEtatReclamationDialog;
       }
    set createEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.createEtatReclamationDialog= value;
       }
    
    get editEtatReclamationDialog():boolean {
           return this.etatReclamationService.editEtatReclamationDialog;
       }
    set editEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.editEtatReclamationDialog= value;
       }
    get viewEtatReclamationDialog():boolean {
           return this.etatReclamationService.viewEtatReclamationDialog;
       }
    set viewEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.viewEtatReclamationDialog = value;
       }
       
     get searchEtatReclamation(): EtatReclamationVo {
        return this.etatReclamationService.searchEtatReclamation;
       }
    set searchEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.searchEtatReclamation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
