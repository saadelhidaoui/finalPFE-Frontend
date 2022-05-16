import {Component, OnInit} from '@angular/core';
import {OrganismeService} from '../../../../../../controller/service/Organisme.service';
import {OrganismeVo} from '../../../../../../controller/model/Organisme.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { VilleService } from '../../../../../../controller/service/Ville.service';

import {VilleVo} from '../../../../../../controller/model/Ville.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-organisme-list-admin',
  templateUrl: './organisme-list-admin.component.html',
  styleUrls: ['./organisme-list-admin.component.css']
})
export class OrganismeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Organisme';
    villes :Array<VilleVo>;


    constructor(private datePipe: DatePipe, private organismeService: OrganismeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private villeService: VilleService
) { }

    ngOnInit(): void {
      this.loadOrganismes();
      this.initExport();
      this.initCol();
      this.loadVille();
    }
    
    // methods
      public async loadOrganismes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Organisme', 'list');
        isPermistted ? this.organismeService.findAll().subscribe(organismes => this.organismes = organismes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.organismeService.findByCriteria(this.searchOrganisme).subscribe(organismes=>{
            
            this.organismes = organismes;
           // this.searchOrganisme = new OrganismeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'telephone', header: 'Telephone'},
                            {field: 'email', header: 'Email'},
                            {field: 'fix', header: 'Fix'},
                            {field: 'fax', header: 'Fax'},
                        {field: 'ville?.libelle', header: 'Ville'},
        ];
    }
    
    public async editOrganisme(organisme:OrganismeVo){
        const isPermistted = await this.roleService.isPermitted('Organisme', 'edit');
         if(isPermistted){
          this.organismeService.findByIdWithAssociatedList(organisme).subscribe(res => {
           this.selectedOrganisme = res;
            this.editOrganismeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOrganisme(organisme:OrganismeVo){
        const isPermistted = await this.roleService.isPermitted('Organisme', 'view');
        if(isPermistted){
           this.organismeService.findByIdWithAssociatedList(organisme).subscribe(res => {
           this.selectedOrganisme = res;
            this.viewOrganismeDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOrganisme(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOrganisme = new OrganismeVo();
            this.createOrganismeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOrganisme(organisme:OrganismeVo){
       const isPermistted = await this.roleService.isPermitted('Organisme', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Organisme) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.organismeService.delete(organisme).subscribe(status=>{
                          if(status > 0){
                          const position = this.organismes.indexOf(organisme);
                          position > -1 ? this.organismes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Organisme Supprimé',
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

public async loadVille(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Organisme', 'list');
    isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOrganisme(organisme: OrganismeVo) {

     this.organismeService.findByIdWithAssociatedList(organisme).subscribe(
	 res => {
	       this.initDuplicateOrganisme(res);
	       this.selectedOrganisme = res;
	       this.selectedOrganisme.id = null;
            this.createOrganismeDialog = true;

});

	}

	initDuplicateOrganisme(res: OrganismeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.organismes.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
                    'Telephone': e.telephone ,
                    'Email': e.email ,
                    'Fix': e.fix ,
                    'Fax': e.fax ,
            'Ville': e.villeVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchOrganisme.reference ? this.searchOrganisme.reference : environment.emptyForExport ,
            'Libelle': this.searchOrganisme.libelle ? this.searchOrganisme.libelle : environment.emptyForExport ,
            'Telephone': this.searchOrganisme.telephone ? this.searchOrganisme.telephone : environment.emptyForExport ,
            'Email': this.searchOrganisme.email ? this.searchOrganisme.email : environment.emptyForExport ,
            'Fix': this.searchOrganisme.fix ? this.searchOrganisme.fix : environment.emptyForExport ,
            'Fax': this.searchOrganisme.fax ? this.searchOrganisme.fax : environment.emptyForExport ,
        'Ville': this.searchOrganisme.villeVo?.libelle ? this.searchOrganisme.villeVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get organismes(): Array<OrganismeVo> {
           return this.organismeService.organismes;
       }
    set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
       }

    get organismeSelections(): Array<OrganismeVo> {
           return this.organismeService.organismeSelections;
       }
    set organismeSelections(value: Array<OrganismeVo>) {
        this.organismeService.organismeSelections = value;
       }
   
     


    get selectedOrganisme():OrganismeVo {
           return this.organismeService.selectedOrganisme;
       }
    set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
       }
    
    get createOrganismeDialog():boolean {
           return this.organismeService.createOrganismeDialog;
       }
    set createOrganismeDialog(value: boolean) {
        this.organismeService.createOrganismeDialog= value;
       }
    
    get editOrganismeDialog():boolean {
           return this.organismeService.editOrganismeDialog;
       }
    set editOrganismeDialog(value: boolean) {
        this.organismeService.editOrganismeDialog= value;
       }
    get viewOrganismeDialog():boolean {
           return this.organismeService.viewOrganismeDialog;
       }
    set viewOrganismeDialog(value: boolean) {
        this.organismeService.viewOrganismeDialog = value;
       }
       
     get searchOrganisme(): OrganismeVo {
        return this.organismeService.searchOrganisme;
       }
    set searchOrganisme(value: OrganismeVo) {
        this.organismeService.searchOrganisme = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
