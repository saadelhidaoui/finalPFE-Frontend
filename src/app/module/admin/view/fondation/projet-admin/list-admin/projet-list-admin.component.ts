import {Component, OnInit} from '@angular/core';
import {ProjetService} from '../../../../../../controller/service/Projet.service';
import {ProjetVo} from '../../../../../../controller/model/Projet.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtatProjetService } from '../../../../../../controller/service/EtatProjet.service';

import {PieceJointeProjetVo} from '../../../../../../controller/model/PieceJointeProjet.model';
import {EtatProjetVo} from '../../../../../../controller/model/EtatProjet.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-projet-list-admin',
  templateUrl: './projet-list-admin.component.html',
  styleUrls: ['./projet-list-admin.component.css']
})
export class ProjetListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Projet';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    etatProjets :Array<EtatProjetVo>;


    constructor(private datePipe: DatePipe, private projetService: ProjetService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etatProjetService: EtatProjetService
) { }

    ngOnInit(): void {
      this.loadProjets();
      this.initExport();
      this.initCol();
      this.loadEtatProjet();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadProjets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Projet', 'list');
        isPermistted ? this.projetService.findAll().subscribe(projets => this.projets = projets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.projetService.findByCriteria(this.searchProjet).subscribe(projets=>{
            
            this.projets = projets;
           // this.searchProjet = new ProjetVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'dateDebut', header: 'Date debut'},
                        {field: 'etatProjet?.libelle', header: 'Etat projet'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editProjet(projet:ProjetVo){
        const isPermistted = await this.roleService.isPermitted('Projet', 'edit');
         if(isPermistted){
          this.projetService.findByIdWithAssociatedList(projet).subscribe(res => {
           this.selectedProjet = res;
            this.selectedProjet.dateDebut = new Date(projet.dateDebut);
            this.selectedProjet.dateArchivage = new Date(projet.dateArchivage);
            this.selectedProjet.dateCreation = new Date(projet.dateCreation);
            this.editProjetDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProjet(projet:ProjetVo){
        const isPermistted = await this.roleService.isPermitted('Projet', 'view');
        if(isPermistted){
           this.projetService.findByIdWithAssociatedList(projet).subscribe(res => {
           this.selectedProjet = res;
            this.selectedProjet.dateDebut = new Date(projet.dateDebut);
            this.selectedProjet.dateArchivage = new Date(projet.dateArchivage);
            this.selectedProjet.dateCreation = new Date(projet.dateCreation);
            this.viewProjetDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProjet(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProjet = new ProjetVo();
            this.createProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverProjet(projet:ProjetVo){
const isPermistted = await this.roleService.isPermitted('Projet', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Projet) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.projetService.archiver(projet).subscribe(status=>{
const myIndex = this.projets.indexOf(projet);
this.projets[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Projet archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverProjet(projet:ProjetVo){
const isPermistted = await this.roleService.isPermitted('Projet', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Projet) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.projetService.desarchiver(projet).subscribe(status=>{
const myIndex = this.projets.indexOf(projet);
this.projets[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Projet désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteProjet(projet:ProjetVo){
       const isPermistted = await this.roleService.isPermitted('Projet', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Projet) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.projetService.delete(projet).subscribe(status=>{
                          if(status > 0){
                          const position = this.projets.indexOf(projet);
                          position > -1 ? this.projets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Projet Supprimé',
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

public async loadEtatProjet(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Projet', 'list');
    isPermistted ? this.etatProjetService.findAll().subscribe(etatProjets => this.etatProjets = etatProjets,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProjet(projet: ProjetVo) {

     this.projetService.findByIdWithAssociatedList(projet).subscribe(
	 res => {
	       this.initDuplicateProjet(res);
	       this.selectedProjet = res;
	       this.selectedProjet.id = null;
            this.createProjetDialog = true;

});

	}

	initDuplicateProjet(res: ProjetVo) {
        if (res.pieceJointeProjetsVo != null) {
             res.pieceJointeProjetsVo.forEach(d => { d.projetVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.projets.map(e => {
    return {
                    'Reference': e.reference ,
                    'Description': e.description ,
                    'Date debut': this.datePipe.transform(e.dateDebut , 'dd-MM-yyyy'),
            'Etat projet': e.etatProjetVo?.libelle ,
                    'Pv': e.pv ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchProjet.reference ? this.searchProjet.reference : environment.emptyForExport ,
            'Description': this.searchProjet.description ? this.searchProjet.description : environment.emptyForExport ,
            'Date debut Min': this.searchProjet.dateDebutMin ? this.datePipe.transform(this.searchProjet.dateDebutMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut Max': this.searchProjet.dateDebutMax ? this.datePipe.transform(this.searchProjet.dateDebutMax , this.dateFormat) : environment.emptyForExport ,
        'Etat projet': this.searchProjet.etatProjetVo?.libelle ? this.searchProjet.etatProjetVo?.libelle : environment.emptyForExport ,
            'Pv': this.searchProjet.pv ? this.searchProjet.pv : environment.emptyForExport ,
            'Piece jointe projets Min': this.searchProjet.pieceJointeProjetsMin ? this.searchProjet.pieceJointeProjetsMin : environment.emptyForExport ,
            'Piece jointe projets Max': this.searchProjet.pieceJointeProjetsMax ? this.searchProjet.pieceJointeProjetsMax : environment.emptyForExport ,
            'Archive': this.searchProjet.archive ? (this.searchProjet.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchProjet.dateArchivageMin ? this.datePipe.transform(this.searchProjet.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchProjet.dateArchivageMax ? this.datePipe.transform(this.searchProjet.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchProjet.dateCreationMin ? this.datePipe.transform(this.searchProjet.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchProjet.dateCreationMax ? this.datePipe.transform(this.searchProjet.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchProjet.admin ? (this.searchProjet.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchProjet.visible ? (this.searchProjet.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchProjet.username ? this.searchProjet.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get projets(): Array<ProjetVo> {
           return this.projetService.projets;
       }
    set projets(value: Array<ProjetVo>) {
        this.projetService.projets = value;
       }

    get projetSelections(): Array<ProjetVo> {
           return this.projetService.projetSelections;
       }
    set projetSelections(value: Array<ProjetVo>) {
        this.projetService.projetSelections = value;
       }
   
     


    get selectedProjet():ProjetVo {
           return this.projetService.selectedProjet;
       }
    set selectedProjet(value: ProjetVo) {
        this.projetService.selectedProjet = value;
       }
    
    get createProjetDialog():boolean {
           return this.projetService.createProjetDialog;
       }
    set createProjetDialog(value: boolean) {
        this.projetService.createProjetDialog= value;
       }
    
    get editProjetDialog():boolean {
           return this.projetService.editProjetDialog;
       }
    set editProjetDialog(value: boolean) {
        this.projetService.editProjetDialog= value;
       }
    get viewProjetDialog():boolean {
           return this.projetService.viewProjetDialog;
       }
    set viewProjetDialog(value: boolean) {
        this.projetService.viewProjetDialog = value;
       }
       
     get searchProjet(): ProjetVo {
        return this.projetService.searchProjet;
       }
    set searchProjet(value: ProjetVo) {
        this.projetService.searchProjet = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
