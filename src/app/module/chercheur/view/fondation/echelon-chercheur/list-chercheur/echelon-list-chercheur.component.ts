import {Component, OnInit} from '@angular/core';
import {EchelonService} from '../../../../../../controller/service/Echelon.service';
import {EchelonVo} from '../../../../../../controller/model/Echelon.model';
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
  selector: 'app-echelon-list-chercheur',
  templateUrl: './echelon-list-chercheur.component.html',
  styleUrls: ['./echelon-list-chercheur.component.css']
})
export class EchelonListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Echelon';


    constructor(private datePipe: DatePipe, private echelonService: EchelonService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEchelons();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEchelons(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Echelon', 'list');
        isPermistted ? this.echelonService.findAll().subscribe(echelons => this.echelons = echelons,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.echelonService.findByCriteria(this.searchEchelon).subscribe(echelons=>{
            
            this.echelons = echelons;
           // this.searchEchelon = new EchelonVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editEchelon(echelon:EchelonVo){
        const isPermistted = await this.roleService.isPermitted('Echelon', 'edit');
         if(isPermistted){
          this.echelonService.findByIdWithAssociatedList(echelon).subscribe(res => {
           this.selectedEchelon = res;
            this.editEchelonDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEchelon(echelon:EchelonVo){
        const isPermistted = await this.roleService.isPermitted('Echelon', 'view');
        if(isPermistted){
           this.echelonService.findByIdWithAssociatedList(echelon).subscribe(res => {
           this.selectedEchelon = res;
            this.viewEchelonDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEchelon(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEchelon = new EchelonVo();
            this.createEchelonDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEchelon(echelon:EchelonVo){
       const isPermistted = await this.roleService.isPermitted('Echelon', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Echelon) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.echelonService.delete(echelon).subscribe(status=>{
                          if(status > 0){
                          const position = this.echelons.indexOf(echelon);
                          position > -1 ? this.echelons.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Echelon Supprimé',
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


public async duplicateEchelon(echelon: EchelonVo) {

     this.echelonService.findByIdWithAssociatedList(echelon).subscribe(
	 res => {
	       this.initDuplicateEchelon(res);
	       this.selectedEchelon = res;
	       this.selectedEchelon.id = null;
            this.createEchelonDialog = true;

});

	}

	initDuplicateEchelon(res: EchelonVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.echelons.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEchelon.reference ? this.searchEchelon.reference : environment.emptyForExport ,
            'Libelle': this.searchEchelon.libelle ? this.searchEchelon.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get echelons(): Array<EchelonVo> {
           return this.echelonService.echelons;
       }
    set echelons(value: Array<EchelonVo>) {
        this.echelonService.echelons = value;
       }

    get echelonSelections(): Array<EchelonVo> {
           return this.echelonService.echelonSelections;
       }
    set echelonSelections(value: Array<EchelonVo>) {
        this.echelonService.echelonSelections = value;
       }
   
     


    get selectedEchelon():EchelonVo {
           return this.echelonService.selectedEchelon;
       }
    set selectedEchelon(value: EchelonVo) {
        this.echelonService.selectedEchelon = value;
       }
    
    get createEchelonDialog():boolean {
           return this.echelonService.createEchelonDialog;
       }
    set createEchelonDialog(value: boolean) {
        this.echelonService.createEchelonDialog= value;
       }
    
    get editEchelonDialog():boolean {
           return this.echelonService.editEchelonDialog;
       }
    set editEchelonDialog(value: boolean) {
        this.echelonService.editEchelonDialog= value;
       }
    get viewEchelonDialog():boolean {
           return this.echelonService.viewEchelonDialog;
       }
    set viewEchelonDialog(value: boolean) {
        this.echelonService.viewEchelonDialog = value;
       }
       
     get searchEchelon(): EchelonVo {
        return this.echelonService.searchEchelon;
       }
    set searchEchelon(value: EchelonVo) {
        this.echelonService.searchEchelon = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
