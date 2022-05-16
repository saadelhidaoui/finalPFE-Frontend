import {Component, OnInit} from '@angular/core';
import {FonctionService} from '../../../../../../controller/service/Fonction.service';
import {FonctionVo} from '../../../../../../controller/model/Fonction.model';
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
  selector: 'app-fonction-list-adherent',
  templateUrl: './fonction-list-adherent.component.html',
  styleUrls: ['./fonction-list-adherent.component.css']
})
export class FonctionListAdherentComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Fonction';


    constructor(private datePipe: DatePipe, private fonctionService: FonctionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadFonctions();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadFonctions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Fonction', 'list');
        isPermistted ? this.fonctionService.findAll().subscribe(fonctions => this.fonctions = fonctions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.fonctionService.findByCriteria(this.searchFonction).subscribe(fonctions=>{
            
            this.fonctions = fonctions;
           // this.searchFonction = new FonctionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editFonction(fonction:FonctionVo){
        const isPermistted = await this.roleService.isPermitted('Fonction', 'edit');
         if(isPermistted){
          this.fonctionService.findByIdWithAssociatedList(fonction).subscribe(res => {
           this.selectedFonction = res;
            this.editFonctionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFonction(fonction:FonctionVo){
        const isPermistted = await this.roleService.isPermitted('Fonction', 'view');
        if(isPermistted){
           this.fonctionService.findByIdWithAssociatedList(fonction).subscribe(res => {
           this.selectedFonction = res;
            this.viewFonctionDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFonction(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFonction = new FonctionVo();
            this.createFonctionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFonction(fonction:FonctionVo){
       const isPermistted = await this.roleService.isPermitted('Fonction', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Fonction) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.fonctionService.delete(fonction).subscribe(status=>{
                          if(status > 0){
                          const position = this.fonctions.indexOf(fonction);
                          position > -1 ? this.fonctions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Fonction Supprimé',
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


public async duplicateFonction(fonction: FonctionVo) {

     this.fonctionService.findByIdWithAssociatedList(fonction).subscribe(
	 res => {
	       this.initDuplicateFonction(res);
	       this.selectedFonction = res;
	       this.selectedFonction.id = null;
            this.createFonctionDialog = true;

});

	}

	initDuplicateFonction(res: FonctionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.fonctions.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchFonction.reference ? this.searchFonction.reference : environment.emptyForExport ,
            'Libelle': this.searchFonction.libelle ? this.searchFonction.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get fonctions(): Array<FonctionVo> {
           return this.fonctionService.fonctions;
       }
    set fonctions(value: Array<FonctionVo>) {
        this.fonctionService.fonctions = value;
       }

    get fonctionSelections(): Array<FonctionVo> {
           return this.fonctionService.fonctionSelections;
       }
    set fonctionSelections(value: Array<FonctionVo>) {
        this.fonctionService.fonctionSelections = value;
       }
   
     


    get selectedFonction():FonctionVo {
           return this.fonctionService.selectedFonction;
       }
    set selectedFonction(value: FonctionVo) {
        this.fonctionService.selectedFonction = value;
       }
    
    get createFonctionDialog():boolean {
           return this.fonctionService.createFonctionDialog;
       }
    set createFonctionDialog(value: boolean) {
        this.fonctionService.createFonctionDialog= value;
       }
    
    get editFonctionDialog():boolean {
           return this.fonctionService.editFonctionDialog;
       }
    set editFonctionDialog(value: boolean) {
        this.fonctionService.editFonctionDialog= value;
       }
    get viewFonctionDialog():boolean {
           return this.fonctionService.viewFonctionDialog;
       }
    set viewFonctionDialog(value: boolean) {
        this.fonctionService.viewFonctionDialog = value;
       }
       
     get searchFonction(): FonctionVo {
        return this.fonctionService.searchFonction;
       }
    set searchFonction(value: FonctionVo) {
        this.fonctionService.searchFonction = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
