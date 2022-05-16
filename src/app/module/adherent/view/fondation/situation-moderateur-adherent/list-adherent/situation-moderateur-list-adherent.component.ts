import {Component, OnInit} from '@angular/core';
import {SituationModerateurService} from '../../../../../../controller/service/SituationModerateur.service';
import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
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
  selector: 'app-situation-moderateur-list-adherent',
  templateUrl: './situation-moderateur-list-adherent.component.html',
  styleUrls: ['./situation-moderateur-list-adherent.component.css']
})
export class SituationModerateurListAdherentComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'SituationModerateur';


    constructor(private datePipe: DatePipe, private situationModerateurService: SituationModerateurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadSituationModerateurs();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadSituationModerateurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('SituationModerateur', 'list');
        isPermistted ? this.situationModerateurService.findAll().subscribe(situationModerateurs => this.situationModerateurs = situationModerateurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.situationModerateurService.findByCriteria(this.searchSituationModerateur).subscribe(situationModerateurs=>{
            
            this.situationModerateurs = situationModerateurs;
           // this.searchSituationModerateur = new SituationModerateurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editSituationModerateur(situationModerateur:SituationModerateurVo){
        const isPermistted = await this.roleService.isPermitted('SituationModerateur', 'edit');
         if(isPermistted){
          this.situationModerateurService.findByIdWithAssociatedList(situationModerateur).subscribe(res => {
           this.selectedSituationModerateur = res;
            this.editSituationModerateurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewSituationModerateur(situationModerateur:SituationModerateurVo){
        const isPermistted = await this.roleService.isPermitted('SituationModerateur', 'view');
        if(isPermistted){
           this.situationModerateurService.findByIdWithAssociatedList(situationModerateur).subscribe(res => {
           this.selectedSituationModerateur = res;
            this.viewSituationModerateurDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateSituationModerateur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedSituationModerateur = new SituationModerateurVo();
            this.createSituationModerateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteSituationModerateur(situationModerateur:SituationModerateurVo){
       const isPermistted = await this.roleService.isPermitted('SituationModerateur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Situation moderateur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.situationModerateurService.delete(situationModerateur).subscribe(status=>{
                          if(status > 0){
                          const position = this.situationModerateurs.indexOf(situationModerateur);
                          position > -1 ? this.situationModerateurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Situation moderateur Supprimé',
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


public async duplicateSituationModerateur(situationModerateur: SituationModerateurVo) {

     this.situationModerateurService.findByIdWithAssociatedList(situationModerateur).subscribe(
	 res => {
	       this.initDuplicateSituationModerateur(res);
	       this.selectedSituationModerateur = res;
	       this.selectedSituationModerateur.id = null;
            this.createSituationModerateurDialog = true;

});

	}

	initDuplicateSituationModerateur(res: SituationModerateurVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.situationModerateurs.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchSituationModerateur.reference ? this.searchSituationModerateur.reference : environment.emptyForExport ,
            'Libelle': this.searchSituationModerateur.libelle ? this.searchSituationModerateur.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get situationModerateurs(): Array<SituationModerateurVo> {
           return this.situationModerateurService.situationModerateurs;
       }
    set situationModerateurs(value: Array<SituationModerateurVo>) {
        this.situationModerateurService.situationModerateurs = value;
       }

    get situationModerateurSelections(): Array<SituationModerateurVo> {
           return this.situationModerateurService.situationModerateurSelections;
       }
    set situationModerateurSelections(value: Array<SituationModerateurVo>) {
        this.situationModerateurService.situationModerateurSelections = value;
       }
   
     


    get selectedSituationModerateur():SituationModerateurVo {
           return this.situationModerateurService.selectedSituationModerateur;
       }
    set selectedSituationModerateur(value: SituationModerateurVo) {
        this.situationModerateurService.selectedSituationModerateur = value;
       }
    
    get createSituationModerateurDialog():boolean {
           return this.situationModerateurService.createSituationModerateurDialog;
       }
    set createSituationModerateurDialog(value: boolean) {
        this.situationModerateurService.createSituationModerateurDialog= value;
       }
    
    get editSituationModerateurDialog():boolean {
           return this.situationModerateurService.editSituationModerateurDialog;
       }
    set editSituationModerateurDialog(value: boolean) {
        this.situationModerateurService.editSituationModerateurDialog= value;
       }
    get viewSituationModerateurDialog():boolean {
           return this.situationModerateurService.viewSituationModerateurDialog;
       }
    set viewSituationModerateurDialog(value: boolean) {
        this.situationModerateurService.viewSituationModerateurDialog = value;
       }
       
     get searchSituationModerateur(): SituationModerateurVo {
        return this.situationModerateurService.searchSituationModerateur;
       }
    set searchSituationModerateur(value: SituationModerateurVo) {
        this.situationModerateurService.searchSituationModerateur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
