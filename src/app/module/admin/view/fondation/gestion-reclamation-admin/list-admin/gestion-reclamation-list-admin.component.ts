import {Component, OnInit} from '@angular/core';
import {GestionReclamationService} from '../../../../../../controller/service/GestionReclamation.service';
import {GestionReclamationVo} from '../../../../../../controller/model/GestionReclamation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ModerateurService } from '../../../../../../controller/service/Moderateur.service';
import { ReclamationService } from '../../../../../../controller/service/Reclamation.service';

import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-gestion-reclamation-list-admin',
  templateUrl: './gestion-reclamation-list-admin.component.html',
  styleUrls: ['./gestion-reclamation-list-admin.component.css']
})
export class GestionReclamationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'GestionReclamation';
    moderateurs :Array<ModerateurVo>;
    reclamations :Array<ReclamationVo>;


    constructor(private datePipe: DatePipe, private gestionReclamationService: GestionReclamationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private moderateurService: ModerateurService
        , private reclamationService: ReclamationService
) { }

    ngOnInit(): void {
      this.loadGestionReclamations();
      this.initExport();
      this.initCol();
      this.loadModerateur();
      this.loadReclamation();
    }
    
    // methods
      public async loadGestionReclamations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('GestionReclamation', 'list');
        isPermistted ? this.gestionReclamationService.findAll().subscribe(gestionReclamations => this.gestionReclamations = gestionReclamations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.gestionReclamationService.findByCriteria(this.searchGestionReclamation).subscribe(gestionReclamations=>{
            
            this.gestionReclamations = gestionReclamations;
           // this.searchGestionReclamation = new GestionReclamationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                        {field: 'moderateur?.numeroMatricule', header: 'Moderateur'},
                        {field: 'reclamation?.reference', header: 'Reclamation'},
                            {field: 'dateTraitement', header: 'Date traitement'},
        ];
    }
    
    public async editGestionReclamation(gestionReclamation:GestionReclamationVo){
        const isPermistted = await this.roleService.isPermitted('GestionReclamation', 'edit');
         if(isPermistted){
          this.gestionReclamationService.findByIdWithAssociatedList(gestionReclamation).subscribe(res => {
           this.selectedGestionReclamation = res;
            this.selectedGestionReclamation.dateTraitement = new Date(gestionReclamation.dateTraitement);
            this.editGestionReclamationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewGestionReclamation(gestionReclamation:GestionReclamationVo){
        const isPermistted = await this.roleService.isPermitted('GestionReclamation', 'view');
        if(isPermistted){
           this.gestionReclamationService.findByIdWithAssociatedList(gestionReclamation).subscribe(res => {
           this.selectedGestionReclamation = res;
            this.selectedGestionReclamation.dateTraitement = new Date(gestionReclamation.dateTraitement);
            this.viewGestionReclamationDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateGestionReclamation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedGestionReclamation = new GestionReclamationVo();
            this.createGestionReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteGestionReclamation(gestionReclamation:GestionReclamationVo){
       const isPermistted = await this.roleService.isPermitted('GestionReclamation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Gestion reclamation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.gestionReclamationService.delete(gestionReclamation).subscribe(status=>{
                          if(status > 0){
                          const position = this.gestionReclamations.indexOf(gestionReclamation);
                          position > -1 ? this.gestionReclamations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Gestion reclamation Supprimé',
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

public async loadModerateur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('GestionReclamation', 'list');
    isPermistted ? this.moderateurService.findAll().subscribe(moderateurs => this.moderateurs = moderateurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadReclamation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('GestionReclamation', 'list');
    isPermistted ? this.reclamationService.findAll().subscribe(reclamations => this.reclamations = reclamations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateGestionReclamation(gestionReclamation: GestionReclamationVo) {

     this.gestionReclamationService.findByIdWithAssociatedList(gestionReclamation).subscribe(
	 res => {
	       this.initDuplicateGestionReclamation(res);
	       this.selectedGestionReclamation = res;
	       this.selectedGestionReclamation.id = null;
            this.createGestionReclamationDialog = true;

});

	}

	initDuplicateGestionReclamation(res: GestionReclamationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.gestionReclamations.map(e => {
    return {
                    'Reference': e.reference ,
            'Moderateur': e.moderateurVo?.numeroMatricule ,
            'Reclamation': e.reclamationVo?.reference ,
                    'Date traitement': this.datePipe.transform(e.dateTraitement , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Reference': this.searchGestionReclamation.reference ? this.searchGestionReclamation.reference : environment.emptyForExport ,
        'Moderateur': this.searchGestionReclamation.moderateurVo?.numeroMatricule ? this.searchGestionReclamation.moderateurVo?.numeroMatricule : environment.emptyForExport ,
        'Reclamation': this.searchGestionReclamation.reclamationVo?.reference ? this.searchGestionReclamation.reclamationVo?.reference : environment.emptyForExport ,
            'Date traitement Min': this.searchGestionReclamation.dateTraitementMin ? this.datePipe.transform(this.searchGestionReclamation.dateTraitementMin , this.dateFormat) : environment.emptyForExport ,
            'Date traitement Max': this.searchGestionReclamation.dateTraitementMax ? this.datePipe.transform(this.searchGestionReclamation.dateTraitementMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get gestionReclamations(): Array<GestionReclamationVo> {
           return this.gestionReclamationService.gestionReclamations;
       }
    set gestionReclamations(value: Array<GestionReclamationVo>) {
        this.gestionReclamationService.gestionReclamations = value;
       }

    get gestionReclamationSelections(): Array<GestionReclamationVo> {
           return this.gestionReclamationService.gestionReclamationSelections;
       }
    set gestionReclamationSelections(value: Array<GestionReclamationVo>) {
        this.gestionReclamationService.gestionReclamationSelections = value;
       }
   
     


    get selectedGestionReclamation():GestionReclamationVo {
           return this.gestionReclamationService.selectedGestionReclamation;
       }
    set selectedGestionReclamation(value: GestionReclamationVo) {
        this.gestionReclamationService.selectedGestionReclamation = value;
       }
    
    get createGestionReclamationDialog():boolean {
           return this.gestionReclamationService.createGestionReclamationDialog;
       }
    set createGestionReclamationDialog(value: boolean) {
        this.gestionReclamationService.createGestionReclamationDialog= value;
       }
    
    get editGestionReclamationDialog():boolean {
           return this.gestionReclamationService.editGestionReclamationDialog;
       }
    set editGestionReclamationDialog(value: boolean) {
        this.gestionReclamationService.editGestionReclamationDialog= value;
       }
    get viewGestionReclamationDialog():boolean {
           return this.gestionReclamationService.viewGestionReclamationDialog;
       }
    set viewGestionReclamationDialog(value: boolean) {
        this.gestionReclamationService.viewGestionReclamationDialog = value;
       }
       
     get searchGestionReclamation(): GestionReclamationVo {
        return this.gestionReclamationService.searchGestionReclamation;
       }
    set searchGestionReclamation(value: GestionReclamationVo) {
        this.gestionReclamationService.searchGestionReclamation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
