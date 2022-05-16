import {Component, OnInit} from '@angular/core';
import {PieceJointeProduitService} from '../../../../../../controller/service/PieceJointeProduit.service';
import {PieceJointeProduitVo} from '../../../../../../controller/model/PieceJointeProduit.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ProduitService } from '../../../../../../controller/service/Produit.service';

import {ProduitVo} from '../../../../../../controller/model/Produit.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-piece-jointe-produit-list-moderateur',
  templateUrl: './piece-jointe-produit-list-moderateur.component.html',
  styleUrls: ['./piece-jointe-produit-list-moderateur.component.css']
})
export class PieceJointeProduitListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PieceJointeProduit';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    produits :Array<ProduitVo>;


    constructor(private datePipe: DatePipe, private pieceJointeProduitService: PieceJointeProduitService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private produitService: ProduitService
) { }

    ngOnInit(): void {
      this.loadPieceJointeProduits();
      this.initExport();
      this.initCol();
      this.loadProduit();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPieceJointeProduits(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PieceJointeProduit', 'list');
        isPermistted ? this.pieceJointeProduitService.findAll().subscribe(pieceJointeProduits => this.pieceJointeProduits = pieceJointeProduits,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.pieceJointeProduitService.findByCriteria(this.searchPieceJointeProduit).subscribe(pieceJointeProduits=>{
            
            this.pieceJointeProduits = pieceJointeProduits;
           // this.searchPieceJointeProduit = new PieceJointeProduitVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'path', header: 'Path'},
                        {field: 'produit?.reference', header: 'Produit'},
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
    
    public async editPieceJointeProduit(pieceJointeProduit:PieceJointeProduitVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeProduit', 'edit');
         if(isPermistted){
          this.pieceJointeProduitService.findByIdWithAssociatedList(pieceJointeProduit).subscribe(res => {
           this.selectedPieceJointeProduit = res;
            this.selectedPieceJointeProduit.dateAjout = new Date(pieceJointeProduit.dateAjout);
            this.selectedPieceJointeProduit.dateArchivage = new Date(pieceJointeProduit.dateArchivage);
            this.selectedPieceJointeProduit.dateCreation = new Date(pieceJointeProduit.dateCreation);
            this.editPieceJointeProduitDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPieceJointeProduit(pieceJointeProduit:PieceJointeProduitVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeProduit', 'view');
        if(isPermistted){
           this.pieceJointeProduitService.findByIdWithAssociatedList(pieceJointeProduit).subscribe(res => {
           this.selectedPieceJointeProduit = res;
            this.selectedPieceJointeProduit.dateAjout = new Date(pieceJointeProduit.dateAjout);
            this.selectedPieceJointeProduit.dateArchivage = new Date(pieceJointeProduit.dateArchivage);
            this.selectedPieceJointeProduit.dateCreation = new Date(pieceJointeProduit.dateCreation);
            this.viewPieceJointeProduitDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePieceJointeProduit(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPieceJointeProduit = new PieceJointeProduitVo();
            this.createPieceJointeProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPieceJointeProduit(pieceJointeProduit:PieceJointeProduitVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeProduit', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Piece jointe produit) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeProduitService.archiver(pieceJointeProduit).subscribe(status=>{
const myIndex = this.pieceJointeProduits.indexOf(pieceJointeProduit);
this.pieceJointeProduits[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe produit archivé',
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

public async desarchiverPieceJointeProduit(pieceJointeProduit:PieceJointeProduitVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeProduit', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Piece jointe produit) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeProduitService.desarchiver(pieceJointeProduit).subscribe(status=>{
const myIndex = this.pieceJointeProduits.indexOf(pieceJointeProduit);
this.pieceJointeProduits[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe produit désarchivé',
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


    public async deletePieceJointeProduit(pieceJointeProduit:PieceJointeProduitVo){
       const isPermistted = await this.roleService.isPermitted('PieceJointeProduit', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Piece jointe produit) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.pieceJointeProduitService.delete(pieceJointeProduit).subscribe(status=>{
                          if(status > 0){
                          const position = this.pieceJointeProduits.indexOf(pieceJointeProduit);
                          position > -1 ? this.pieceJointeProduits.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Piece jointe produit Supprimé',
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

public async loadProduit(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PieceJointeProduit', 'list');
    isPermistted ? this.produitService.findAll().subscribe(produits => this.produits = produits,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePieceJointeProduit(pieceJointeProduit: PieceJointeProduitVo) {

     this.pieceJointeProduitService.findByIdWithAssociatedList(pieceJointeProduit).subscribe(
	 res => {
	       this.initDuplicatePieceJointeProduit(res);
	       this.selectedPieceJointeProduit = res;
	       this.selectedPieceJointeProduit.id = null;
            this.createPieceJointeProduitDialog = true;

});

	}

	initDuplicatePieceJointeProduit(res: PieceJointeProduitVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.pieceJointeProduits.map(e => {
    return {
                    'Path': e.path ,
            'Produit': e.produitVo?.reference ,
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
            'Path': this.searchPieceJointeProduit.path ? this.searchPieceJointeProduit.path : environment.emptyForExport ,
        'Produit': this.searchPieceJointeProduit.produitVo?.reference ? this.searchPieceJointeProduit.produitVo?.reference : environment.emptyForExport ,
            'Date ajout Min': this.searchPieceJointeProduit.dateAjoutMin ? this.datePipe.transform(this.searchPieceJointeProduit.dateAjoutMin , this.dateFormat) : environment.emptyForExport ,
            'Date ajout Max': this.searchPieceJointeProduit.dateAjoutMax ? this.datePipe.transform(this.searchPieceJointeProduit.dateAjoutMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchPieceJointeProduit.libelle ? this.searchPieceJointeProduit.libelle : environment.emptyForExport ,
            'Archive': this.searchPieceJointeProduit.archive ? (this.searchPieceJointeProduit.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPieceJointeProduit.dateArchivageMin ? this.datePipe.transform(this.searchPieceJointeProduit.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPieceJointeProduit.dateArchivageMax ? this.datePipe.transform(this.searchPieceJointeProduit.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPieceJointeProduit.dateCreationMin ? this.datePipe.transform(this.searchPieceJointeProduit.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPieceJointeProduit.dateCreationMax ? this.datePipe.transform(this.searchPieceJointeProduit.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPieceJointeProduit.admin ? (this.searchPieceJointeProduit.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPieceJointeProduit.visible ? (this.searchPieceJointeProduit.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPieceJointeProduit.username ? this.searchPieceJointeProduit.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get pieceJointeProduits(): Array<PieceJointeProduitVo> {
           return this.pieceJointeProduitService.pieceJointeProduits;
       }
    set pieceJointeProduits(value: Array<PieceJointeProduitVo>) {
        this.pieceJointeProduitService.pieceJointeProduits = value;
       }

    get pieceJointeProduitSelections(): Array<PieceJointeProduitVo> {
           return this.pieceJointeProduitService.pieceJointeProduitSelections;
       }
    set pieceJointeProduitSelections(value: Array<PieceJointeProduitVo>) {
        this.pieceJointeProduitService.pieceJointeProduitSelections = value;
       }
   
     


    get selectedPieceJointeProduit():PieceJointeProduitVo {
           return this.pieceJointeProduitService.selectedPieceJointeProduit;
       }
    set selectedPieceJointeProduit(value: PieceJointeProduitVo) {
        this.pieceJointeProduitService.selectedPieceJointeProduit = value;
       }
    
    get createPieceJointeProduitDialog():boolean {
           return this.pieceJointeProduitService.createPieceJointeProduitDialog;
       }
    set createPieceJointeProduitDialog(value: boolean) {
        this.pieceJointeProduitService.createPieceJointeProduitDialog= value;
       }
    
    get editPieceJointeProduitDialog():boolean {
           return this.pieceJointeProduitService.editPieceJointeProduitDialog;
       }
    set editPieceJointeProduitDialog(value: boolean) {
        this.pieceJointeProduitService.editPieceJointeProduitDialog= value;
       }
    get viewPieceJointeProduitDialog():boolean {
           return this.pieceJointeProduitService.viewPieceJointeProduitDialog;
       }
    set viewPieceJointeProduitDialog(value: boolean) {
        this.pieceJointeProduitService.viewPieceJointeProduitDialog = value;
       }
       
     get searchPieceJointeProduit(): PieceJointeProduitVo {
        return this.pieceJointeProduitService.searchPieceJointeProduit;
       }
    set searchPieceJointeProduit(value: PieceJointeProduitVo) {
        this.pieceJointeProduitService.searchPieceJointeProduit = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
