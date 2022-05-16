import {Component, OnInit} from '@angular/core';
import {TypePrestationService} from '../../../../../../controller/service/TypePrestation.service';
import {TypePrestationVo} from '../../../../../../controller/model/TypePrestation.model';
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
  selector: 'app-type-prestation-list-chercheur',
  templateUrl: './type-prestation-list-chercheur.component.html',
  styleUrls: ['./type-prestation-list-chercheur.component.css']
})
export class TypePrestationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypePrestation';


    constructor(private datePipe: DatePipe, private typePrestationService: TypePrestationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypePrestations();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypePrestations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypePrestation', 'list');
        isPermistted ? this.typePrestationService.findAll().subscribe(typePrestations => this.typePrestations = typePrestations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typePrestationService.findByCriteria(this.searchTypePrestation).subscribe(typePrestations=>{
            
            this.typePrestations = typePrestations;
           // this.searchTypePrestation = new TypePrestationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editTypePrestation(typePrestation:TypePrestationVo){
        const isPermistted = await this.roleService.isPermitted('TypePrestation', 'edit');
         if(isPermistted){
          this.typePrestationService.findByIdWithAssociatedList(typePrestation).subscribe(res => {
           this.selectedTypePrestation = res;
            this.editTypePrestationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypePrestation(typePrestation:TypePrestationVo){
        const isPermistted = await this.roleService.isPermitted('TypePrestation', 'view');
        if(isPermistted){
           this.typePrestationService.findByIdWithAssociatedList(typePrestation).subscribe(res => {
           this.selectedTypePrestation = res;
            this.viewTypePrestationDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypePrestation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypePrestation = new TypePrestationVo();
            this.createTypePrestationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypePrestation(typePrestation:TypePrestationVo){
       const isPermistted = await this.roleService.isPermitted('TypePrestation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type prestation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typePrestationService.delete(typePrestation).subscribe(status=>{
                          if(status > 0){
                          const position = this.typePrestations.indexOf(typePrestation);
                          position > -1 ? this.typePrestations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type prestation Supprimé',
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


public async duplicateTypePrestation(typePrestation: TypePrestationVo) {

     this.typePrestationService.findByIdWithAssociatedList(typePrestation).subscribe(
	 res => {
	       this.initDuplicateTypePrestation(res);
	       this.selectedTypePrestation = res;
	       this.selectedTypePrestation.id = null;
            this.createTypePrestationDialog = true;

});

	}

	initDuplicateTypePrestation(res: TypePrestationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typePrestations.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchTypePrestation.reference ? this.searchTypePrestation.reference : environment.emptyForExport ,
            'Libelle': this.searchTypePrestation.libelle ? this.searchTypePrestation.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typePrestations(): Array<TypePrestationVo> {
           return this.typePrestationService.typePrestations;
       }
    set typePrestations(value: Array<TypePrestationVo>) {
        this.typePrestationService.typePrestations = value;
       }

    get typePrestationSelections(): Array<TypePrestationVo> {
           return this.typePrestationService.typePrestationSelections;
       }
    set typePrestationSelections(value: Array<TypePrestationVo>) {
        this.typePrestationService.typePrestationSelections = value;
       }
   
     


    get selectedTypePrestation():TypePrestationVo {
           return this.typePrestationService.selectedTypePrestation;
       }
    set selectedTypePrestation(value: TypePrestationVo) {
        this.typePrestationService.selectedTypePrestation = value;
       }
    
    get createTypePrestationDialog():boolean {
           return this.typePrestationService.createTypePrestationDialog;
       }
    set createTypePrestationDialog(value: boolean) {
        this.typePrestationService.createTypePrestationDialog= value;
       }
    
    get editTypePrestationDialog():boolean {
           return this.typePrestationService.editTypePrestationDialog;
       }
    set editTypePrestationDialog(value: boolean) {
        this.typePrestationService.editTypePrestationDialog= value;
       }
    get viewTypePrestationDialog():boolean {
           return this.typePrestationService.viewTypePrestationDialog;
       }
    set viewTypePrestationDialog(value: boolean) {
        this.typePrestationService.viewTypePrestationDialog = value;
       }
       
     get searchTypePrestation(): TypePrestationVo {
        return this.typePrestationService.searchTypePrestation;
       }
    set searchTypePrestation(value: TypePrestationVo) {
        this.typePrestationService.searchTypePrestation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
