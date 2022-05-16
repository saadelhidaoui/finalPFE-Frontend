import {Component, OnInit} from '@angular/core';
import {NiveauImportanceService} from '../../../../../../controller/service/NiveauImportance.service';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
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
  selector: 'app-niveau-importance-list-admin',
  templateUrl: './niveau-importance-list-admin.component.html',
  styleUrls: ['./niveau-importance-list-admin.component.css']
})
export class NiveauImportanceListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NiveauImportance';


    constructor(private datePipe: DatePipe, private niveauImportanceService: NiveauImportanceService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadNiveauImportances();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadNiveauImportances(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NiveauImportance', 'list');
        isPermistted ? this.niveauImportanceService.findAll().subscribe(niveauImportances => this.niveauImportances = niveauImportances,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.niveauImportanceService.findByCriteria(this.searchNiveauImportance).subscribe(niveauImportances=>{
            
            this.niveauImportances = niveauImportances;
           // this.searchNiveauImportance = new NiveauImportanceVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editNiveauImportance(niveauImportance:NiveauImportanceVo){
        const isPermistted = await this.roleService.isPermitted('NiveauImportance', 'edit');
         if(isPermistted){
          this.niveauImportanceService.findByIdWithAssociatedList(niveauImportance).subscribe(res => {
           this.selectedNiveauImportance = res;
            this.editNiveauImportanceDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNiveauImportance(niveauImportance:NiveauImportanceVo){
        const isPermistted = await this.roleService.isPermitted('NiveauImportance', 'view');
        if(isPermistted){
           this.niveauImportanceService.findByIdWithAssociatedList(niveauImportance).subscribe(res => {
           this.selectedNiveauImportance = res;
            this.viewNiveauImportanceDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNiveauImportance(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNiveauImportance = new NiveauImportanceVo();
            this.createNiveauImportanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteNiveauImportance(niveauImportance:NiveauImportanceVo){
       const isPermistted = await this.roleService.isPermitted('NiveauImportance', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Niveau importance) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.niveauImportanceService.delete(niveauImportance).subscribe(status=>{
                          if(status > 0){
                          const position = this.niveauImportances.indexOf(niveauImportance);
                          position > -1 ? this.niveauImportances.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Niveau importance Supprimé',
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


public async duplicateNiveauImportance(niveauImportance: NiveauImportanceVo) {

     this.niveauImportanceService.findByIdWithAssociatedList(niveauImportance).subscribe(
	 res => {
	       this.initDuplicateNiveauImportance(res);
	       this.selectedNiveauImportance = res;
	       this.selectedNiveauImportance.id = null;
            this.createNiveauImportanceDialog = true;

});

	}

	initDuplicateNiveauImportance(res: NiveauImportanceVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.niveauImportances.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchNiveauImportance.reference ? this.searchNiveauImportance.reference : environment.emptyForExport ,
            'Libelle': this.searchNiveauImportance.libelle ? this.searchNiveauImportance.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get niveauImportances(): Array<NiveauImportanceVo> {
           return this.niveauImportanceService.niveauImportances;
       }
    set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
       }

    get niveauImportanceSelections(): Array<NiveauImportanceVo> {
           return this.niveauImportanceService.niveauImportanceSelections;
       }
    set niveauImportanceSelections(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportanceSelections = value;
       }
   
     


    get selectedNiveauImportance():NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
    set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }
    
    get createNiveauImportanceDialog():boolean {
           return this.niveauImportanceService.createNiveauImportanceDialog;
       }
    set createNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.createNiveauImportanceDialog= value;
       }
    
    get editNiveauImportanceDialog():boolean {
           return this.niveauImportanceService.editNiveauImportanceDialog;
       }
    set editNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.editNiveauImportanceDialog= value;
       }
    get viewNiveauImportanceDialog():boolean {
           return this.niveauImportanceService.viewNiveauImportanceDialog;
       }
    set viewNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.viewNiveauImportanceDialog = value;
       }
       
     get searchNiveauImportance(): NiveauImportanceVo {
        return this.niveauImportanceService.searchNiveauImportance;
       }
    set searchNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.searchNiveauImportance = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
