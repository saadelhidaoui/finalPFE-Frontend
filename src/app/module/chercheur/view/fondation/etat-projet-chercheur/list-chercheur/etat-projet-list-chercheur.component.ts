import {Component, OnInit} from '@angular/core';
import {EtatProjetService} from '../../../../../../controller/service/EtatProjet.service';
import {EtatProjetVo} from '../../../../../../controller/model/EtatProjet.model';
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
  selector: 'app-etat-projet-list-chercheur',
  templateUrl: './etat-projet-list-chercheur.component.html',
  styleUrls: ['./etat-projet-list-chercheur.component.css']
})
export class EtatProjetListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatProjet';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private etatProjetService: EtatProjetService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatProjets();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEtatProjets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatProjet', 'list');
        isPermistted ? this.etatProjetService.findAll().subscribe(etatProjets => this.etatProjets = etatProjets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatProjetService.findByCriteria(this.searchEtatProjet).subscribe(etatProjets=>{
            
            this.etatProjets = etatProjets;
           // this.searchEtatProjet = new EtatProjetVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editEtatProjet(etatProjet:EtatProjetVo){
        const isPermistted = await this.roleService.isPermitted('EtatProjet', 'edit');
         if(isPermistted){
          this.etatProjetService.findByIdWithAssociatedList(etatProjet).subscribe(res => {
           this.selectedEtatProjet = res;
            this.selectedEtatProjet.dateArchivage = new Date(etatProjet.dateArchivage);
            this.selectedEtatProjet.dateCreation = new Date(etatProjet.dateCreation);
            this.editEtatProjetDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatProjet(etatProjet:EtatProjetVo){
        const isPermistted = await this.roleService.isPermitted('EtatProjet', 'view');
        if(isPermistted){
           this.etatProjetService.findByIdWithAssociatedList(etatProjet).subscribe(res => {
           this.selectedEtatProjet = res;
            this.selectedEtatProjet.dateArchivage = new Date(etatProjet.dateArchivage);
            this.selectedEtatProjet.dateCreation = new Date(etatProjet.dateCreation);
            this.viewEtatProjetDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatProjet(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatProjet = new EtatProjetVo();
            this.createEtatProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatProjet(etatProjet:EtatProjetVo){
       const isPermistted = await this.roleService.isPermitted('EtatProjet', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat projet) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatProjetService.delete(etatProjet).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatProjets.indexOf(etatProjet);
                          position > -1 ? this.etatProjets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat projet Supprimé',
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


public async duplicateEtatProjet(etatProjet: EtatProjetVo) {

     this.etatProjetService.findByIdWithAssociatedList(etatProjet).subscribe(
	 res => {
	       this.initDuplicateEtatProjet(res);
	       this.selectedEtatProjet = res;
	       this.selectedEtatProjet.id = null;
            this.createEtatProjetDialog = true;

});

	}

	initDuplicateEtatProjet(res: EtatProjetVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatProjets.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtatProjet.libelle ? this.searchEtatProjet.libelle : environment.emptyForExport ,
            'Code': this.searchEtatProjet.code ? this.searchEtatProjet.code : environment.emptyForExport ,
            'Archive': this.searchEtatProjet.archive ? (this.searchEtatProjet.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEtatProjet.dateArchivageMin ? this.datePipe.transform(this.searchEtatProjet.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEtatProjet.dateArchivageMax ? this.datePipe.transform(this.searchEtatProjet.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEtatProjet.dateCreationMin ? this.datePipe.transform(this.searchEtatProjet.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEtatProjet.dateCreationMax ? this.datePipe.transform(this.searchEtatProjet.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEtatProjet.admin ? (this.searchEtatProjet.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEtatProjet.visible ? (this.searchEtatProjet.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEtatProjet.username ? this.searchEtatProjet.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatProjets(): Array<EtatProjetVo> {
           return this.etatProjetService.etatProjets;
       }
    set etatProjets(value: Array<EtatProjetVo>) {
        this.etatProjetService.etatProjets = value;
       }

    get etatProjetSelections(): Array<EtatProjetVo> {
           return this.etatProjetService.etatProjetSelections;
       }
    set etatProjetSelections(value: Array<EtatProjetVo>) {
        this.etatProjetService.etatProjetSelections = value;
       }
   
     


    get selectedEtatProjet():EtatProjetVo {
           return this.etatProjetService.selectedEtatProjet;
       }
    set selectedEtatProjet(value: EtatProjetVo) {
        this.etatProjetService.selectedEtatProjet = value;
       }
    
    get createEtatProjetDialog():boolean {
           return this.etatProjetService.createEtatProjetDialog;
       }
    set createEtatProjetDialog(value: boolean) {
        this.etatProjetService.createEtatProjetDialog= value;
       }
    
    get editEtatProjetDialog():boolean {
           return this.etatProjetService.editEtatProjetDialog;
       }
    set editEtatProjetDialog(value: boolean) {
        this.etatProjetService.editEtatProjetDialog= value;
       }
    get viewEtatProjetDialog():boolean {
           return this.etatProjetService.viewEtatProjetDialog;
       }
    set viewEtatProjetDialog(value: boolean) {
        this.etatProjetService.viewEtatProjetDialog = value;
       }
       
     get searchEtatProjet(): EtatProjetVo {
        return this.etatProjetService.searchEtatProjet;
       }
    set searchEtatProjet(value: EtatProjetVo) {
        this.etatProjetService.searchEtatProjet = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
