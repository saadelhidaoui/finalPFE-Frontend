import {Component, OnInit} from '@angular/core';
import {ConjointService} from '../../../../../../controller/service/Conjoint.service';
import {ConjointVo} from '../../../../../../controller/model/Conjoint.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { QualiteService } from '../../../../../../controller/service/Qualite.service';
import { AdherentService } from '../../../../../../controller/service/Adherent.service';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-conjoint-list-moderateur',
  templateUrl: './conjoint-list-moderateur.component.html',
  styleUrls: ['./conjoint-list-moderateur.component.css']
})
export class ConjointListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Conjoint';
    qualites :Array<QualiteVo>;
    adherents :Array<AdherentVo>;


    constructor(private datePipe: DatePipe, private conjointService: ConjointService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private qualiteService: QualiteService
        , private adherentService: AdherentService
) { }

    ngOnInit(): void {
      this.loadConjoints();
      this.initExport();
      this.initCol();
      this.loadQualite();
      this.loadAdherent();
    }
    
    // methods
      public async loadConjoints(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Conjoint', 'list');
        isPermistted ? this.conjointService.findAll().subscribe(conjoints => this.conjoints = conjoints,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.conjointService.findByCriteria(this.searchConjoint).subscribe(conjoints=>{
            
            this.conjoints = conjoints;
           // this.searchConjoint = new ConjointVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'cin', header: 'Cin'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'origin', header: 'Origin'},
                            {field: 'email', header: 'Email'},
                            {field: 'telephone', header: 'Telephone'},
                        {field: 'qualite?.libelle', header: 'Qualite'},
                        {field: 'adherent?.username', header: 'Adherent'},
        ];
    }
    
    public async editConjoint(conjoint:ConjointVo){
        const isPermistted = await this.roleService.isPermitted('Conjoint', 'edit');
         if(isPermistted){
          this.conjointService.findByIdWithAssociatedList(conjoint).subscribe(res => {
           this.selectedConjoint = res;
            this.editConjointDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewConjoint(conjoint:ConjointVo){
        const isPermistted = await this.roleService.isPermitted('Conjoint', 'view');
        if(isPermistted){
           this.conjointService.findByIdWithAssociatedList(conjoint).subscribe(res => {
           this.selectedConjoint = res;
            this.viewConjointDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateConjoint(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedConjoint = new ConjointVo();
            this.createConjointDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteConjoint(conjoint:ConjointVo){
       const isPermistted = await this.roleService.isPermitted('Conjoint', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Conjoint) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.conjointService.delete(conjoint).subscribe(status=>{
                          if(status > 0){
                          const position = this.conjoints.indexOf(conjoint);
                          position > -1 ? this.conjoints.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Conjoint Supprimé',
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

public async loadQualite(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Conjoint', 'list');
    isPermistted ? this.qualiteService.findAll().subscribe(qualites => this.qualites = qualites,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadAdherent(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Conjoint', 'list');
    isPermistted ? this.adherentService.findAll().subscribe(adherents => this.adherents = adherents,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateConjoint(conjoint: ConjointVo) {

     this.conjointService.findByIdWithAssociatedList(conjoint).subscribe(
	 res => {
	       this.initDuplicateConjoint(res);
	       this.selectedConjoint = res;
	       this.selectedConjoint.id = null;
            this.createConjointDialog = true;

});

	}

	initDuplicateConjoint(res: ConjointVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.conjoints.map(e => {
    return {
                    'Cin': e.cin ,
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
                    'Origin': e.origin ,
                    'Email': e.email ,
                    'Telephone': e.telephone ,
            'Qualite': e.qualiteVo?.libelle ,
            'Adherent': e.adherentVo?.username ,
     }
      });

      this.criteriaData = [{
            'Cin': this.searchConjoint.cin ? this.searchConjoint.cin : environment.emptyForExport ,
            'Nom': this.searchConjoint.nom ? this.searchConjoint.nom : environment.emptyForExport ,
            'Prenom': this.searchConjoint.prenom ? this.searchConjoint.prenom : environment.emptyForExport ,
            'Origin': this.searchConjoint.origin ? this.searchConjoint.origin : environment.emptyForExport ,
            'Email': this.searchConjoint.email ? this.searchConjoint.email : environment.emptyForExport ,
            'Telephone': this.searchConjoint.telephone ? this.searchConjoint.telephone : environment.emptyForExport ,
        'Qualite': this.searchConjoint.qualiteVo?.libelle ? this.searchConjoint.qualiteVo?.libelle : environment.emptyForExport ,
        'Adherent': this.searchConjoint.adherentVo?.username ? this.searchConjoint.adherentVo?.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get conjoints(): Array<ConjointVo> {
           return this.conjointService.conjoints;
       }
    set conjoints(value: Array<ConjointVo>) {
        this.conjointService.conjoints = value;
       }

    get conjointSelections(): Array<ConjointVo> {
           return this.conjointService.conjointSelections;
       }
    set conjointSelections(value: Array<ConjointVo>) {
        this.conjointService.conjointSelections = value;
       }
   
     


    get selectedConjoint():ConjointVo {
           return this.conjointService.selectedConjoint;
       }
    set selectedConjoint(value: ConjointVo) {
        this.conjointService.selectedConjoint = value;
       }
    
    get createConjointDialog():boolean {
           return this.conjointService.createConjointDialog;
       }
    set createConjointDialog(value: boolean) {
        this.conjointService.createConjointDialog= value;
       }
    
    get editConjointDialog():boolean {
           return this.conjointService.editConjointDialog;
       }
    set editConjointDialog(value: boolean) {
        this.conjointService.editConjointDialog= value;
       }
    get viewConjointDialog():boolean {
           return this.conjointService.viewConjointDialog;
       }
    set viewConjointDialog(value: boolean) {
        this.conjointService.viewConjointDialog = value;
       }
       
     get searchConjoint(): ConjointVo {
        return this.conjointService.searchConjoint;
       }
    set searchConjoint(value: ConjointVo) {
        this.conjointService.searchConjoint = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
