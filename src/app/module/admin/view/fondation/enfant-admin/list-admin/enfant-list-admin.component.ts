import {Component, OnInit} from '@angular/core';
import {EnfantService} from '../../../../../../controller/service/Enfant.service';
import {EnfantVo} from '../../../../../../controller/model/Enfant.model';
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
  selector: 'app-enfant-list-admin',
  templateUrl: './enfant-list-admin.component.html',
  styleUrls: ['./enfant-list-admin.component.css']
})
export class EnfantListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Enfant';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    qualites :Array<QualiteVo>;
    adherents :Array<AdherentVo>;


    constructor(private datePipe: DatePipe, private enfantService: EnfantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private qualiteService: QualiteService
        , private adherentService: AdherentService
) { }

    ngOnInit(): void {
      this.loadEnfants();
      this.initExport();
      this.initCol();
      this.loadQualite();
      this.loadAdherent();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEnfants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Enfant', 'list');
        isPermistted ? this.enfantService.findAll().subscribe(enfants => this.enfants = enfants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enfantService.findByCriteria(this.searchEnfant).subscribe(enfants=>{
            
            this.enfants = enfants;
           // this.searchEnfant = new EnfantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'age', header: 'Age'},
                            {field: 'dateNaissance', header: 'Date naissance'},
                        {field: 'qualite?.libelle', header: 'Qualite'},
                        {field: 'adherent?.username', header: 'Adherent'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editEnfant(enfant:EnfantVo){
        const isPermistted = await this.roleService.isPermitted('Enfant', 'edit');
         if(isPermistted){
          this.enfantService.findByIdWithAssociatedList(enfant).subscribe(res => {
           this.selectedEnfant = res;
            this.selectedEnfant.dateNaissance = new Date(enfant.dateNaissance);
            this.selectedEnfant.dateArchivage = new Date(enfant.dateArchivage);
            this.selectedEnfant.dateCreation = new Date(enfant.dateCreation);
            this.editEnfantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnfant(enfant:EnfantVo){
        const isPermistted = await this.roleService.isPermitted('Enfant', 'view');
        if(isPermistted){
           this.enfantService.findByIdWithAssociatedList(enfant).subscribe(res => {
           this.selectedEnfant = res;
            this.selectedEnfant.dateNaissance = new Date(enfant.dateNaissance);
            this.selectedEnfant.dateArchivage = new Date(enfant.dateArchivage);
            this.selectedEnfant.dateCreation = new Date(enfant.dateCreation);
            this.viewEnfantDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnfant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnfant = new EnfantVo();
            this.createEnfantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverEnfant(enfant:EnfantVo){
const isPermistted = await this.roleService.isPermitted('Enfant', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Enfant) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.enfantService.archiver(enfant).subscribe(status=>{
const myIndex = this.enfants.indexOf(enfant);
this.enfants[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Enfant archivé',
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

public async desarchiverEnfant(enfant:EnfantVo){
const isPermistted = await this.roleService.isPermitted('Enfant', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Enfant) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.enfantService.desarchiver(enfant).subscribe(status=>{
const myIndex = this.enfants.indexOf(enfant);
this.enfants[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Enfant désarchivé',
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


    public async deleteEnfant(enfant:EnfantVo){
       const isPermistted = await this.roleService.isPermitted('Enfant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enfant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enfantService.delete(enfant).subscribe(status=>{
                          if(status > 0){
                          const position = this.enfants.indexOf(enfant);
                          position > -1 ? this.enfants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enfant Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('Enfant', 'list');
    isPermistted ? this.qualiteService.findAll().subscribe(qualites => this.qualites = qualites,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadAdherent(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Enfant', 'list');
    isPermistted ? this.adherentService.findAll().subscribe(adherents => this.adherents = adherents,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnfant(enfant: EnfantVo) {

     this.enfantService.findByIdWithAssociatedList(enfant).subscribe(
	 res => {
	       this.initDuplicateEnfant(res);
	       this.selectedEnfant = res;
	       this.selectedEnfant.id = null;
            this.createEnfantDialog = true;

});

	}

	initDuplicateEnfant(res: EnfantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.enfants.map(e => {
    return {
                    'Reference': e.reference ,
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
                    'Age': e.age ,
                    'Date naissance': this.datePipe.transform(e.dateNaissance , 'dd-MM-yyyy'),
            'Qualite': e.qualiteVo?.libelle ,
            'Adherent': e.adherentVo?.username ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchEnfant.reference ? this.searchEnfant.reference : environment.emptyForExport ,
            'Nom': this.searchEnfant.nom ? this.searchEnfant.nom : environment.emptyForExport ,
            'Prenom': this.searchEnfant.prenom ? this.searchEnfant.prenom : environment.emptyForExport ,
            'Age Min': this.searchEnfant.ageMin ? this.searchEnfant.ageMin : environment.emptyForExport ,
            'Age Max': this.searchEnfant.ageMax ? this.searchEnfant.ageMax : environment.emptyForExport ,
            'Date naissance Min': this.searchEnfant.dateNaissanceMin ? this.datePipe.transform(this.searchEnfant.dateNaissanceMin , this.dateFormat) : environment.emptyForExport ,
            'Date naissance Max': this.searchEnfant.dateNaissanceMax ? this.datePipe.transform(this.searchEnfant.dateNaissanceMax , this.dateFormat) : environment.emptyForExport ,
        'Qualite': this.searchEnfant.qualiteVo?.libelle ? this.searchEnfant.qualiteVo?.libelle : environment.emptyForExport ,
        'Adherent': this.searchEnfant.adherentVo?.username ? this.searchEnfant.adherentVo?.username : environment.emptyForExport ,
            'Archive': this.searchEnfant.archive ? (this.searchEnfant.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEnfant.dateArchivageMin ? this.datePipe.transform(this.searchEnfant.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEnfant.dateArchivageMax ? this.datePipe.transform(this.searchEnfant.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEnfant.dateCreationMin ? this.datePipe.transform(this.searchEnfant.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEnfant.dateCreationMax ? this.datePipe.transform(this.searchEnfant.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEnfant.admin ? (this.searchEnfant.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEnfant.visible ? (this.searchEnfant.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEnfant.username ? this.searchEnfant.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enfants(): Array<EnfantVo> {
           return this.enfantService.enfants;
       }
    set enfants(value: Array<EnfantVo>) {
        this.enfantService.enfants = value;
       }

    get enfantSelections(): Array<EnfantVo> {
           return this.enfantService.enfantSelections;
       }
    set enfantSelections(value: Array<EnfantVo>) {
        this.enfantService.enfantSelections = value;
       }
   
     


    get selectedEnfant():EnfantVo {
           return this.enfantService.selectedEnfant;
       }
    set selectedEnfant(value: EnfantVo) {
        this.enfantService.selectedEnfant = value;
       }
    
    get createEnfantDialog():boolean {
           return this.enfantService.createEnfantDialog;
       }
    set createEnfantDialog(value: boolean) {
        this.enfantService.createEnfantDialog= value;
       }
    
    get editEnfantDialog():boolean {
           return this.enfantService.editEnfantDialog;
       }
    set editEnfantDialog(value: boolean) {
        this.enfantService.editEnfantDialog= value;
       }
    get viewEnfantDialog():boolean {
           return this.enfantService.viewEnfantDialog;
       }
    set viewEnfantDialog(value: boolean) {
        this.enfantService.viewEnfantDialog = value;
       }
       
     get searchEnfant(): EnfantVo {
        return this.enfantService.searchEnfant;
       }
    set searchEnfant(value: EnfantVo) {
        this.enfantService.searchEnfant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
