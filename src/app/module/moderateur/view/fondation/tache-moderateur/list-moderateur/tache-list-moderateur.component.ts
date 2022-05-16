import {Component, OnInit} from '@angular/core';
import {TacheService} from '../../../../../../controller/service/Tache.service';
import {TacheVo} from '../../../../../../controller/model/Tache.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtatTacheService } from '../../../../../../controller/service/EtatTache.service';
import { ModerateurService } from '../../../../../../controller/service/Moderateur.service';

import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-tache-list-moderateur',
  templateUrl: './tache-list-moderateur.component.html',
  styleUrls: ['./tache-list-moderateur.component.css']
})
export class TacheListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Tache';
    etatTaches :Array<EtatTacheVo>;
    moderateurs :Array<ModerateurVo>;


    constructor(private datePipe: DatePipe, private tacheService: TacheService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etatTacheService: EtatTacheService
        , private moderateurService: ModerateurService
) { }

    ngOnInit(): void {
      this.loadTaches();
      this.initExport();
      this.initCol();
      this.loadEtatTache();
      this.loadModerateur();
    }
    
    // methods
      public async loadTaches(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Tache', 'list');
        isPermistted ? this.tacheService.findAll().subscribe(taches => this.taches = taches,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tacheService.findByCriteria(this.searchTache).subscribe(taches=>{
            
            this.taches = taches;
           // this.searchTache = new TacheVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'dateTache', header: 'Date tache'},
                            {field: 'description', header: 'Description'},
                        {field: 'etatTache?.libelle', header: 'Etat tache'},
                        {field: 'moderateur?.numeroMatricule', header: 'Moderateur'},
        ];
    }
    
    public async editTache(tache:TacheVo){
        const isPermistted = await this.roleService.isPermitted('Tache', 'edit');
         if(isPermistted){
          this.tacheService.findByIdWithAssociatedList(tache).subscribe(res => {
           this.selectedTache = res;
            this.selectedTache.dateTache = new Date(tache.dateTache);
            this.editTacheDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTache(tache:TacheVo){
        const isPermistted = await this.roleService.isPermitted('Tache', 'view');
        if(isPermistted){
           this.tacheService.findByIdWithAssociatedList(tache).subscribe(res => {
           this.selectedTache = res;
            this.selectedTache.dateTache = new Date(tache.dateTache);
            this.viewTacheDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTache(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTache = new TacheVo();
            this.createTacheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTache(tache:TacheVo){
       const isPermistted = await this.roleService.isPermitted('Tache', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Tache) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tacheService.delete(tache).subscribe(status=>{
                          if(status > 0){
                          const position = this.taches.indexOf(tache);
                          position > -1 ? this.taches.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Tache Supprimé',
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

public async loadEtatTache(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Tache', 'list');
    isPermistted ? this.etatTacheService.findAll().subscribe(etatTaches => this.etatTaches = etatTaches,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadModerateur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Tache', 'list');
    isPermistted ? this.moderateurService.findAll().subscribe(moderateurs => this.moderateurs = moderateurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTache(tache: TacheVo) {

     this.tacheService.findByIdWithAssociatedList(tache).subscribe(
	 res => {
	       this.initDuplicateTache(res);
	       this.selectedTache = res;
	       this.selectedTache.id = null;
            this.createTacheDialog = true;

});

	}

	initDuplicateTache(res: TacheVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.taches.map(e => {
    return {
                    'Reference': e.reference ,
                    'Date tache': this.datePipe.transform(e.dateTache , 'dd-MM-yyyy'),
                    'Description': e.description ,
            'Etat tache': e.etatTacheVo?.libelle ,
            'Moderateur': e.moderateurVo?.numeroMatricule ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchTache.reference ? this.searchTache.reference : environment.emptyForExport ,
            'Date tache Min': this.searchTache.dateTacheMin ? this.datePipe.transform(this.searchTache.dateTacheMin , this.dateFormat) : environment.emptyForExport ,
            'Date tache Max': this.searchTache.dateTacheMax ? this.datePipe.transform(this.searchTache.dateTacheMax , this.dateFormat) : environment.emptyForExport ,
            'Description': this.searchTache.description ? this.searchTache.description : environment.emptyForExport ,
        'Etat tache': this.searchTache.etatTacheVo?.libelle ? this.searchTache.etatTacheVo?.libelle : environment.emptyForExport ,
        'Moderateur': this.searchTache.moderateurVo?.numeroMatricule ? this.searchTache.moderateurVo?.numeroMatricule : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get taches(): Array<TacheVo> {
           return this.tacheService.taches;
       }
    set taches(value: Array<TacheVo>) {
        this.tacheService.taches = value;
       }

    get tacheSelections(): Array<TacheVo> {
           return this.tacheService.tacheSelections;
       }
    set tacheSelections(value: Array<TacheVo>) {
        this.tacheService.tacheSelections = value;
       }
   
     


    get selectedTache():TacheVo {
           return this.tacheService.selectedTache;
       }
    set selectedTache(value: TacheVo) {
        this.tacheService.selectedTache = value;
       }
    
    get createTacheDialog():boolean {
           return this.tacheService.createTacheDialog;
       }
    set createTacheDialog(value: boolean) {
        this.tacheService.createTacheDialog= value;
       }
    
    get editTacheDialog():boolean {
           return this.tacheService.editTacheDialog;
       }
    set editTacheDialog(value: boolean) {
        this.tacheService.editTacheDialog= value;
       }
    get viewTacheDialog():boolean {
           return this.tacheService.viewTacheDialog;
       }
    set viewTacheDialog(value: boolean) {
        this.tacheService.viewTacheDialog = value;
       }
       
     get searchTache(): TacheVo {
        return this.tacheService.searchTache;
       }
    set searchTache(value: TacheVo) {
        this.tacheService.searchTache = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
