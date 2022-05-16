import {Component, OnInit} from '@angular/core';
import {DemandeEstivageCentreService} from '../../../../../../controller/service/DemandeEstivageCentre.service';
import {DemandeEstivageCentreVo} from '../../../../../../controller/model/DemandeEstivageCentre.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DemandeEstivageService } from '../../../../../../controller/service/DemandeEstivage.service';
import { CentreEstivageService } from '../../../../../../controller/service/CentreEstivage.service';

import {DemandeEstivageVo} from '../../../../../../controller/model/DemandeEstivage.model';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-demande-estivage-centre-list-moderateur',
  templateUrl: './demande-estivage-centre-list-moderateur.component.html',
  styleUrls: ['./demande-estivage-centre-list-moderateur.component.css']
})
export class DemandeEstivageCentreListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DemandeEstivageCentre';
    demandeEstivages :Array<DemandeEstivageVo>;
    centreEstivages :Array<CentreEstivageVo>;


    constructor(private datePipe: DatePipe, private demandeEstivageCentreService: DemandeEstivageCentreService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private demandeEstivageService: DemandeEstivageService
        , private centreEstivageService: CentreEstivageService
) { }

    ngOnInit(): void {
      this.loadDemandeEstivageCentres();
      this.initExport();
      this.initCol();
      this.loadDemandeEstivage();
      this.loadCentreEstivage();
    }
    
    // methods
      public async loadDemandeEstivageCentres(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DemandeEstivageCentre', 'list');
        isPermistted ? this.demandeEstivageCentreService.findAll().subscribe(demandeEstivageCentres => this.demandeEstivageCentres = demandeEstivageCentres,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.demandeEstivageCentreService.findByCriteria(this.searchDemandeEstivageCentre).subscribe(demandeEstivageCentres=>{
            
            this.demandeEstivageCentres = demandeEstivageCentres;
           // this.searchDemandeEstivageCentre = new DemandeEstivageCentreVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                        {field: 'demandeEstivage?.reference', header: 'Demande estivage'},
                        {field: 'centreEstivage?.libelle', header: 'Centre estivage'},
        ];
    }
    
    public async editDemandeEstivageCentre(demandeEstivageCentre:DemandeEstivageCentreVo){
        const isPermistted = await this.roleService.isPermitted('DemandeEstivageCentre', 'edit');
         if(isPermistted){
          this.demandeEstivageCentreService.findByIdWithAssociatedList(demandeEstivageCentre).subscribe(res => {
           this.selectedDemandeEstivageCentre = res;
            this.editDemandeEstivageCentreDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDemandeEstivageCentre(demandeEstivageCentre:DemandeEstivageCentreVo){
        const isPermistted = await this.roleService.isPermitted('DemandeEstivageCentre', 'view');
        if(isPermistted){
           this.demandeEstivageCentreService.findByIdWithAssociatedList(demandeEstivageCentre).subscribe(res => {
           this.selectedDemandeEstivageCentre = res;
            this.viewDemandeEstivageCentreDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDemandeEstivageCentre(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDemandeEstivageCentre = new DemandeEstivageCentreVo();
            this.createDemandeEstivageCentreDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDemandeEstivageCentre(demandeEstivageCentre:DemandeEstivageCentreVo){
       const isPermistted = await this.roleService.isPermitted('DemandeEstivageCentre', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Demande estivage centre) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.demandeEstivageCentreService.delete(demandeEstivageCentre).subscribe(status=>{
                          if(status > 0){
                          const position = this.demandeEstivageCentres.indexOf(demandeEstivageCentre);
                          position > -1 ? this.demandeEstivageCentres.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Demande estivage centre Supprimé',
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

public async loadDemandeEstivage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DemandeEstivageCentre', 'list');
    isPermistted ? this.demandeEstivageService.findAll().subscribe(demandeEstivages => this.demandeEstivages = demandeEstivages,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCentreEstivage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DemandeEstivageCentre', 'list');
    isPermistted ? this.centreEstivageService.findAll().subscribe(centreEstivages => this.centreEstivages = centreEstivages,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDemandeEstivageCentre(demandeEstivageCentre: DemandeEstivageCentreVo) {

     this.demandeEstivageCentreService.findByIdWithAssociatedList(demandeEstivageCentre).subscribe(
	 res => {
	       this.initDuplicateDemandeEstivageCentre(res);
	       this.selectedDemandeEstivageCentre = res;
	       this.selectedDemandeEstivageCentre.id = null;
            this.createDemandeEstivageCentreDialog = true;

});

	}

	initDuplicateDemandeEstivageCentre(res: DemandeEstivageCentreVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.demandeEstivageCentres.map(e => {
    return {
                    'Reference': e.reference ,
            'Demande estivage': e.demandeEstivageVo?.reference ,
            'Centre estivage': e.centreEstivageVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchDemandeEstivageCentre.reference ? this.searchDemandeEstivageCentre.reference : environment.emptyForExport ,
        'Demande estivage': this.searchDemandeEstivageCentre.demandeEstivageVo?.reference ? this.searchDemandeEstivageCentre.demandeEstivageVo?.reference : environment.emptyForExport ,
        'Centre estivage': this.searchDemandeEstivageCentre.centreEstivageVo?.libelle ? this.searchDemandeEstivageCentre.centreEstivageVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get demandeEstivageCentres(): Array<DemandeEstivageCentreVo> {
           return this.demandeEstivageCentreService.demandeEstivageCentres;
       }
    set demandeEstivageCentres(value: Array<DemandeEstivageCentreVo>) {
        this.demandeEstivageCentreService.demandeEstivageCentres = value;
       }

    get demandeEstivageCentreSelections(): Array<DemandeEstivageCentreVo> {
           return this.demandeEstivageCentreService.demandeEstivageCentreSelections;
       }
    set demandeEstivageCentreSelections(value: Array<DemandeEstivageCentreVo>) {
        this.demandeEstivageCentreService.demandeEstivageCentreSelections = value;
       }
   
     


    get selectedDemandeEstivageCentre():DemandeEstivageCentreVo {
           return this.demandeEstivageCentreService.selectedDemandeEstivageCentre;
       }
    set selectedDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this.demandeEstivageCentreService.selectedDemandeEstivageCentre = value;
       }
    
    get createDemandeEstivageCentreDialog():boolean {
           return this.demandeEstivageCentreService.createDemandeEstivageCentreDialog;
       }
    set createDemandeEstivageCentreDialog(value: boolean) {
        this.demandeEstivageCentreService.createDemandeEstivageCentreDialog= value;
       }
    
    get editDemandeEstivageCentreDialog():boolean {
           return this.demandeEstivageCentreService.editDemandeEstivageCentreDialog;
       }
    set editDemandeEstivageCentreDialog(value: boolean) {
        this.demandeEstivageCentreService.editDemandeEstivageCentreDialog= value;
       }
    get viewDemandeEstivageCentreDialog():boolean {
           return this.demandeEstivageCentreService.viewDemandeEstivageCentreDialog;
       }
    set viewDemandeEstivageCentreDialog(value: boolean) {
        this.demandeEstivageCentreService.viewDemandeEstivageCentreDialog = value;
       }
       
     get searchDemandeEstivageCentre(): DemandeEstivageCentreVo {
        return this.demandeEstivageCentreService.searchDemandeEstivageCentre;
       }
    set searchDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this.demandeEstivageCentreService.searchDemandeEstivageCentre = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
