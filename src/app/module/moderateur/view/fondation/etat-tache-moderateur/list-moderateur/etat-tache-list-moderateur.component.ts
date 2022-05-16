import {Component, OnInit} from '@angular/core';
import {EtatTacheService} from '../../../../../../controller/service/EtatTache.service';
import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
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
  selector: 'app-etat-tache-list-moderateur',
  templateUrl: './etat-tache-list-moderateur.component.html',
  styleUrls: ['./etat-tache-list-moderateur.component.css']
})
export class EtatTacheListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatTache';


    constructor(private datePipe: DatePipe, private etatTacheService: EtatTacheService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatTaches();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatTaches(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatTache', 'list');
        isPermistted ? this.etatTacheService.findAll().subscribe(etatTaches => this.etatTaches = etatTaches,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatTacheService.findByCriteria(this.searchEtatTache).subscribe(etatTaches=>{
            
            this.etatTaches = etatTaches;
           // this.searchEtatTache = new EtatTacheVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editEtatTache(etatTache:EtatTacheVo){
        const isPermistted = await this.roleService.isPermitted('EtatTache', 'edit');
         if(isPermistted){
          this.etatTacheService.findByIdWithAssociatedList(etatTache).subscribe(res => {
           this.selectedEtatTache = res;
            this.editEtatTacheDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatTache(etatTache:EtatTacheVo){
        const isPermistted = await this.roleService.isPermitted('EtatTache', 'view');
        if(isPermistted){
           this.etatTacheService.findByIdWithAssociatedList(etatTache).subscribe(res => {
           this.selectedEtatTache = res;
            this.viewEtatTacheDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatTache(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatTache = new EtatTacheVo();
            this.createEtatTacheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatTache(etatTache:EtatTacheVo){
       const isPermistted = await this.roleService.isPermitted('EtatTache', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat tache) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatTacheService.delete(etatTache).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatTaches.indexOf(etatTache);
                          position > -1 ? this.etatTaches.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat tache Supprimé',
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


public async duplicateEtatTache(etatTache: EtatTacheVo) {

     this.etatTacheService.findByIdWithAssociatedList(etatTache).subscribe(
	 res => {
	       this.initDuplicateEtatTache(res);
	       this.selectedEtatTache = res;
	       this.selectedEtatTache.id = null;
            this.createEtatTacheDialog = true;

});

	}

	initDuplicateEtatTache(res: EtatTacheVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatTaches.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEtatTache.reference ? this.searchEtatTache.reference : environment.emptyForExport ,
            'Libelle': this.searchEtatTache.libelle ? this.searchEtatTache.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatTaches(): Array<EtatTacheVo> {
           return this.etatTacheService.etatTaches;
       }
    set etatTaches(value: Array<EtatTacheVo>) {
        this.etatTacheService.etatTaches = value;
       }

    get etatTacheSelections(): Array<EtatTacheVo> {
           return this.etatTacheService.etatTacheSelections;
       }
    set etatTacheSelections(value: Array<EtatTacheVo>) {
        this.etatTacheService.etatTacheSelections = value;
       }
   
     


    get selectedEtatTache():EtatTacheVo {
           return this.etatTacheService.selectedEtatTache;
       }
    set selectedEtatTache(value: EtatTacheVo) {
        this.etatTacheService.selectedEtatTache = value;
       }
    
    get createEtatTacheDialog():boolean {
           return this.etatTacheService.createEtatTacheDialog;
       }
    set createEtatTacheDialog(value: boolean) {
        this.etatTacheService.createEtatTacheDialog= value;
       }
    
    get editEtatTacheDialog():boolean {
           return this.etatTacheService.editEtatTacheDialog;
       }
    set editEtatTacheDialog(value: boolean) {
        this.etatTacheService.editEtatTacheDialog= value;
       }
    get viewEtatTacheDialog():boolean {
           return this.etatTacheService.viewEtatTacheDialog;
       }
    set viewEtatTacheDialog(value: boolean) {
        this.etatTacheService.viewEtatTacheDialog = value;
       }
       
     get searchEtatTache(): EtatTacheVo {
        return this.etatTacheService.searchEtatTache;
       }
    set searchEtatTache(value: EtatTacheVo) {
        this.etatTacheService.searchEtatTache = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
