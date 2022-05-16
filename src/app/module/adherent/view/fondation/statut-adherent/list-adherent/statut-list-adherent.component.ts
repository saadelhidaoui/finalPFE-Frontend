import {Component, OnInit} from '@angular/core';
import {StatutService} from '../../../../../../controller/service/Statut.service';
import {StatutVo} from '../../../../../../controller/model/Statut.model';
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
  selector: 'app-statut-list-adherent',
  templateUrl: './statut-list-adherent.component.html',
  styleUrls: ['./statut-list-adherent.component.css']
})
export class StatutListAdherentComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Statut';


    constructor(private datePipe: DatePipe, private statutService: StatutService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadStatuts();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadStatuts(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Statut', 'list');
        isPermistted ? this.statutService.findAll().subscribe(statuts => this.statuts = statuts,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.statutService.findByCriteria(this.searchStatut).subscribe(statuts=>{
            
            this.statuts = statuts;
           // this.searchStatut = new StatutVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editStatut(statut:StatutVo){
        const isPermistted = await this.roleService.isPermitted('Statut', 'edit');
         if(isPermistted){
          this.statutService.findByIdWithAssociatedList(statut).subscribe(res => {
           this.selectedStatut = res;
            this.editStatutDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewStatut(statut:StatutVo){
        const isPermistted = await this.roleService.isPermitted('Statut', 'view');
        if(isPermistted){
           this.statutService.findByIdWithAssociatedList(statut).subscribe(res => {
           this.selectedStatut = res;
            this.viewStatutDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateStatut(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedStatut = new StatutVo();
            this.createStatutDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteStatut(statut:StatutVo){
       const isPermistted = await this.roleService.isPermitted('Statut', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Statut) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.statutService.delete(statut).subscribe(status=>{
                          if(status > 0){
                          const position = this.statuts.indexOf(statut);
                          position > -1 ? this.statuts.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Statut Supprimé',
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


public async duplicateStatut(statut: StatutVo) {

     this.statutService.findByIdWithAssociatedList(statut).subscribe(
	 res => {
	       this.initDuplicateStatut(res);
	       this.selectedStatut = res;
	       this.selectedStatut.id = null;
            this.createStatutDialog = true;

});

	}

	initDuplicateStatut(res: StatutVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.statuts.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchStatut.reference ? this.searchStatut.reference : environment.emptyForExport ,
            'Libelle': this.searchStatut.libelle ? this.searchStatut.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get statuts(): Array<StatutVo> {
           return this.statutService.statuts;
       }
    set statuts(value: Array<StatutVo>) {
        this.statutService.statuts = value;
       }

    get statutSelections(): Array<StatutVo> {
           return this.statutService.statutSelections;
       }
    set statutSelections(value: Array<StatutVo>) {
        this.statutService.statutSelections = value;
       }
   
     


    get selectedStatut():StatutVo {
           return this.statutService.selectedStatut;
       }
    set selectedStatut(value: StatutVo) {
        this.statutService.selectedStatut = value;
       }
    
    get createStatutDialog():boolean {
           return this.statutService.createStatutDialog;
       }
    set createStatutDialog(value: boolean) {
        this.statutService.createStatutDialog= value;
       }
    
    get editStatutDialog():boolean {
           return this.statutService.editStatutDialog;
       }
    set editStatutDialog(value: boolean) {
        this.statutService.editStatutDialog= value;
       }
    get viewStatutDialog():boolean {
           return this.statutService.viewStatutDialog;
       }
    set viewStatutDialog(value: boolean) {
        this.statutService.viewStatutDialog = value;
       }
       
     get searchStatut(): StatutVo {
        return this.statutService.searchStatut;
       }
    set searchStatut(value: StatutVo) {
        this.statutService.searchStatut = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
