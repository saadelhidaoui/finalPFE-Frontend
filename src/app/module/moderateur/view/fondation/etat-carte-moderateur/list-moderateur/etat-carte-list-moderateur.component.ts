import {Component, OnInit} from '@angular/core';
import {EtatCarteService} from '../../../../../../controller/service/EtatCarte.service';
import {EtatCarteVo} from '../../../../../../controller/model/EtatCarte.model';
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
  selector: 'app-etat-carte-list-moderateur',
  templateUrl: './etat-carte-list-moderateur.component.html',
  styleUrls: ['./etat-carte-list-moderateur.component.css']
})
export class EtatCarteListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatCarte';


    constructor(private datePipe: DatePipe, private etatCarteService: EtatCarteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatCartes();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatCartes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatCarte', 'list');
        isPermistted ? this.etatCarteService.findAll().subscribe(etatCartes => this.etatCartes = etatCartes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatCarteService.findByCriteria(this.searchEtatCarte).subscribe(etatCartes=>{
            
            this.etatCartes = etatCartes;
           // this.searchEtatCarte = new EtatCarteVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editEtatCarte(etatCarte:EtatCarteVo){
        const isPermistted = await this.roleService.isPermitted('EtatCarte', 'edit');
         if(isPermistted){
          this.etatCarteService.findByIdWithAssociatedList(etatCarte).subscribe(res => {
           this.selectedEtatCarte = res;
            this.editEtatCarteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatCarte(etatCarte:EtatCarteVo){
        const isPermistted = await this.roleService.isPermitted('EtatCarte', 'view');
        if(isPermistted){
           this.etatCarteService.findByIdWithAssociatedList(etatCarte).subscribe(res => {
           this.selectedEtatCarte = res;
            this.viewEtatCarteDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatCarte(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatCarte = new EtatCarteVo();
            this.createEtatCarteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatCarte(etatCarte:EtatCarteVo){
       const isPermistted = await this.roleService.isPermitted('EtatCarte', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat carte) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatCarteService.delete(etatCarte).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatCartes.indexOf(etatCarte);
                          position > -1 ? this.etatCartes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat carte Supprimé',
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


public async duplicateEtatCarte(etatCarte: EtatCarteVo) {

     this.etatCarteService.findByIdWithAssociatedList(etatCarte).subscribe(
	 res => {
	       this.initDuplicateEtatCarte(res);
	       this.selectedEtatCarte = res;
	       this.selectedEtatCarte.id = null;
            this.createEtatCarteDialog = true;

});

	}

	initDuplicateEtatCarte(res: EtatCarteVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatCartes.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEtatCarte.reference ? this.searchEtatCarte.reference : environment.emptyForExport ,
            'Libelle': this.searchEtatCarte.libelle ? this.searchEtatCarte.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatCartes(): Array<EtatCarteVo> {
           return this.etatCarteService.etatCartes;
       }
    set etatCartes(value: Array<EtatCarteVo>) {
        this.etatCarteService.etatCartes = value;
       }

    get etatCarteSelections(): Array<EtatCarteVo> {
           return this.etatCarteService.etatCarteSelections;
       }
    set etatCarteSelections(value: Array<EtatCarteVo>) {
        this.etatCarteService.etatCarteSelections = value;
       }
   
     


    get selectedEtatCarte():EtatCarteVo {
           return this.etatCarteService.selectedEtatCarte;
       }
    set selectedEtatCarte(value: EtatCarteVo) {
        this.etatCarteService.selectedEtatCarte = value;
       }
    
    get createEtatCarteDialog():boolean {
           return this.etatCarteService.createEtatCarteDialog;
       }
    set createEtatCarteDialog(value: boolean) {
        this.etatCarteService.createEtatCarteDialog= value;
       }
    
    get editEtatCarteDialog():boolean {
           return this.etatCarteService.editEtatCarteDialog;
       }
    set editEtatCarteDialog(value: boolean) {
        this.etatCarteService.editEtatCarteDialog= value;
       }
    get viewEtatCarteDialog():boolean {
           return this.etatCarteService.viewEtatCarteDialog;
       }
    set viewEtatCarteDialog(value: boolean) {
        this.etatCarteService.viewEtatCarteDialog = value;
       }
       
     get searchEtatCarte(): EtatCarteVo {
        return this.etatCarteService.searchEtatCarte;
       }
    set searchEtatCarte(value: EtatCarteVo) {
        this.etatCarteService.searchEtatCarte = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
