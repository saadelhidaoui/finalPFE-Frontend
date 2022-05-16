import {Component, OnInit} from '@angular/core';
import {PieceJointeProjetService} from '../../../../../../controller/service/PieceJointeProjet.service';
import {PieceJointeProjetVo} from '../../../../../../controller/model/PieceJointeProjet.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ProjetService } from '../../../../../../controller/service/Projet.service';

import {ProjetVo} from '../../../../../../controller/model/Projet.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-piece-jointe-projet-list-adherent',
  templateUrl: './piece-jointe-projet-list-adherent.component.html',
  styleUrls: ['./piece-jointe-projet-list-adherent.component.css']
})
export class PieceJointeProjetListAdherentComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PieceJointeProjet';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    projets :Array<ProjetVo>;


    constructor(private datePipe: DatePipe, private pieceJointeProjetService: PieceJointeProjetService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private projetService: ProjetService
) { }

    ngOnInit(): void {
      this.loadPieceJointeProjets();
      this.initExport();
      this.initCol();
      this.loadProjet();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPieceJointeProjets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PieceJointeProjet', 'list');
        isPermistted ? this.pieceJointeProjetService.findAll().subscribe(pieceJointeProjets => this.pieceJointeProjets = pieceJointeProjets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.pieceJointeProjetService.findByCriteria(this.searchPieceJointeProjet).subscribe(pieceJointeProjets=>{
            
            this.pieceJointeProjets = pieceJointeProjets;
           // this.searchPieceJointeProjet = new PieceJointeProjetVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'path', header: 'Path'},
                        {field: 'projet?.reference', header: 'Projet'},
                            {field: 'dateAjout', header: 'Date ajout'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editPieceJointeProjet(pieceJointeProjet:PieceJointeProjetVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeProjet', 'edit');
         if(isPermistted){
          this.pieceJointeProjetService.findByIdWithAssociatedList(pieceJointeProjet).subscribe(res => {
           this.selectedPieceJointeProjet = res;
            this.selectedPieceJointeProjet.dateAjout = new Date(pieceJointeProjet.dateAjout);
            this.selectedPieceJointeProjet.dateArchivage = new Date(pieceJointeProjet.dateArchivage);
            this.selectedPieceJointeProjet.dateCreation = new Date(pieceJointeProjet.dateCreation);
            this.editPieceJointeProjetDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPieceJointeProjet(pieceJointeProjet:PieceJointeProjetVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeProjet', 'view');
        if(isPermistted){
           this.pieceJointeProjetService.findByIdWithAssociatedList(pieceJointeProjet).subscribe(res => {
           this.selectedPieceJointeProjet = res;
            this.selectedPieceJointeProjet.dateAjout = new Date(pieceJointeProjet.dateAjout);
            this.selectedPieceJointeProjet.dateArchivage = new Date(pieceJointeProjet.dateArchivage);
            this.selectedPieceJointeProjet.dateCreation = new Date(pieceJointeProjet.dateCreation);
            this.viewPieceJointeProjetDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePieceJointeProjet(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPieceJointeProjet = new PieceJointeProjetVo();
            this.createPieceJointeProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPieceJointeProjet(pieceJointeProjet:PieceJointeProjetVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeProjet', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Piece jointe projet) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeProjetService.archiver(pieceJointeProjet).subscribe(status=>{
const myIndex = this.pieceJointeProjets.indexOf(pieceJointeProjet);
this.pieceJointeProjets[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe projet archivé',
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

public async desarchiverPieceJointeProjet(pieceJointeProjet:PieceJointeProjetVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeProjet', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Piece jointe projet) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeProjetService.desarchiver(pieceJointeProjet).subscribe(status=>{
const myIndex = this.pieceJointeProjets.indexOf(pieceJointeProjet);
this.pieceJointeProjets[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe projet désarchivé',
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


    public async deletePieceJointeProjet(pieceJointeProjet:PieceJointeProjetVo){
       const isPermistted = await this.roleService.isPermitted('PieceJointeProjet', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Piece jointe projet) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.pieceJointeProjetService.delete(pieceJointeProjet).subscribe(status=>{
                          if(status > 0){
                          const position = this.pieceJointeProjets.indexOf(pieceJointeProjet);
                          position > -1 ? this.pieceJointeProjets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Piece jointe projet Supprimé',
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

public async loadProjet(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PieceJointeProjet', 'list');
    isPermistted ? this.projetService.findAll().subscribe(projets => this.projets = projets,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePieceJointeProjet(pieceJointeProjet: PieceJointeProjetVo) {

     this.pieceJointeProjetService.findByIdWithAssociatedList(pieceJointeProjet).subscribe(
	 res => {
	       this.initDuplicatePieceJointeProjet(res);
	       this.selectedPieceJointeProjet = res;
	       this.selectedPieceJointeProjet.id = null;
            this.createPieceJointeProjetDialog = true;

});

	}

	initDuplicatePieceJointeProjet(res: PieceJointeProjetVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.pieceJointeProjets.map(e => {
    return {
                    'Path': e.path ,
            'Projet': e.projetVo?.reference ,
                    'Date ajout': this.datePipe.transform(e.dateAjout , 'dd-MM-yyyy'),
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Path': this.searchPieceJointeProjet.path ? this.searchPieceJointeProjet.path : environment.emptyForExport ,
        'Projet': this.searchPieceJointeProjet.projetVo?.reference ? this.searchPieceJointeProjet.projetVo?.reference : environment.emptyForExport ,
            'Date ajout Min': this.searchPieceJointeProjet.dateAjoutMin ? this.datePipe.transform(this.searchPieceJointeProjet.dateAjoutMin , this.dateFormat) : environment.emptyForExport ,
            'Date ajout Max': this.searchPieceJointeProjet.dateAjoutMax ? this.datePipe.transform(this.searchPieceJointeProjet.dateAjoutMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchPieceJointeProjet.libelle ? this.searchPieceJointeProjet.libelle : environment.emptyForExport ,
            'Archive': this.searchPieceJointeProjet.archive ? (this.searchPieceJointeProjet.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPieceJointeProjet.dateArchivageMin ? this.datePipe.transform(this.searchPieceJointeProjet.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPieceJointeProjet.dateArchivageMax ? this.datePipe.transform(this.searchPieceJointeProjet.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPieceJointeProjet.dateCreationMin ? this.datePipe.transform(this.searchPieceJointeProjet.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPieceJointeProjet.dateCreationMax ? this.datePipe.transform(this.searchPieceJointeProjet.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPieceJointeProjet.admin ? (this.searchPieceJointeProjet.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPieceJointeProjet.visible ? (this.searchPieceJointeProjet.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPieceJointeProjet.username ? this.searchPieceJointeProjet.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get pieceJointeProjets(): Array<PieceJointeProjetVo> {
           return this.pieceJointeProjetService.pieceJointeProjets;
       }
    set pieceJointeProjets(value: Array<PieceJointeProjetVo>) {
        this.pieceJointeProjetService.pieceJointeProjets = value;
       }

    get pieceJointeProjetSelections(): Array<PieceJointeProjetVo> {
           return this.pieceJointeProjetService.pieceJointeProjetSelections;
       }
    set pieceJointeProjetSelections(value: Array<PieceJointeProjetVo>) {
        this.pieceJointeProjetService.pieceJointeProjetSelections = value;
       }
   
     


    get selectedPieceJointeProjet():PieceJointeProjetVo {
           return this.pieceJointeProjetService.selectedPieceJointeProjet;
       }
    set selectedPieceJointeProjet(value: PieceJointeProjetVo) {
        this.pieceJointeProjetService.selectedPieceJointeProjet = value;
       }
    
    get createPieceJointeProjetDialog():boolean {
           return this.pieceJointeProjetService.createPieceJointeProjetDialog;
       }
    set createPieceJointeProjetDialog(value: boolean) {
        this.pieceJointeProjetService.createPieceJointeProjetDialog= value;
       }
    
    get editPieceJointeProjetDialog():boolean {
           return this.pieceJointeProjetService.editPieceJointeProjetDialog;
       }
    set editPieceJointeProjetDialog(value: boolean) {
        this.pieceJointeProjetService.editPieceJointeProjetDialog= value;
       }
    get viewPieceJointeProjetDialog():boolean {
           return this.pieceJointeProjetService.viewPieceJointeProjetDialog;
       }
    set viewPieceJointeProjetDialog(value: boolean) {
        this.pieceJointeProjetService.viewPieceJointeProjetDialog = value;
       }
       
     get searchPieceJointeProjet(): PieceJointeProjetVo {
        return this.pieceJointeProjetService.searchPieceJointeProjet;
       }
    set searchPieceJointeProjet(value: PieceJointeProjetVo) {
        this.pieceJointeProjetService.searchPieceJointeProjet = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
