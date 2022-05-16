import {Component, OnInit} from '@angular/core';
import {DemandeEstivageService} from '../../../../../../controller/service/DemandeEstivage.service';
import {DemandeEstivageVo} from '../../../../../../controller/model/DemandeEstivage.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DemandeEstivageCentreService } from '../../../../../../controller/service/DemandeEstivageCentre.service';
import { AdherentService } from '../../../../../../controller/service/Adherent.service';
import { EtatDemandeEstivageService } from '../../../../../../controller/service/EtatDemandeEstivage.service';
import { EstivageCentreEstivageService } from '../../../../../../controller/service/EstivageCentreEstivage.service';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {EtatDemandeEstivageVo} from '../../../../../../controller/model/EtatDemandeEstivage.model';
import {PieceJointeEstivageVo} from '../../../../../../controller/model/PieceJointeEstivage.model';
import {DemandeEstivageCentreVo} from '../../../../../../controller/model/DemandeEstivageCentre.model';
import {EstivageCentreEstivageVo} from '../../../../../../controller/model/EstivageCentreEstivage.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-demande-estivage-list-moderateur',
  templateUrl: './demande-estivage-list-moderateur.component.html',
  styleUrls: ['./demande-estivage-list-moderateur.component.css']
})
export class DemandeEstivageListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DemandeEstivage';
    demandeEstivageCentres :Array<DemandeEstivageCentreVo>;
    adherents :Array<AdherentVo>;
    etatDemandeEstivages :Array<EtatDemandeEstivageVo>;
    estivageCentreEstivages :Array<EstivageCentreEstivageVo>;


    constructor(private datePipe: DatePipe, private demandeEstivageService: DemandeEstivageService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private demandeEstivageCentreService: DemandeEstivageCentreService
        , private adherentService: AdherentService
        , private etatDemandeEstivageService: EtatDemandeEstivageService
        , private estivageCentreEstivageService: EstivageCentreEstivageService
) { }

    ngOnInit(): void {
      this.loadDemandeEstivages();
      this.initExport();
      this.initCol();
      this.loadDemandeEstivageCentre();
      this.loadAdherent();
      this.loadEtatDemandeEstivage();
      this.loadEstivageCentreEstivage();
    }
    
    // methods
      public async loadDemandeEstivages(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'list');
        isPermistted ? this.demandeEstivageService.findAll().subscribe(demandeEstivages => this.demandeEstivages = demandeEstivages,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.demandeEstivageService.findByCriteria(this.searchDemandeEstivage).subscribe(demandeEstivages=>{
            
            this.demandeEstivages = demandeEstivages;
           // this.searchDemandeEstivage = new DemandeEstivageVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                        {field: 'demandeEstivageCentre?.reference', header: 'Demande estivage centre'},
                            {field: 'dateDebutEstivage', header: 'Date debut estivage'},
                            {field: 'dateFinEstivage', header: 'Date fin estivage'},
                        {field: 'adherent?.username', header: 'Adherent'},
                        {field: 'etatDemandeEstivage?.libelle', header: 'Etat demande estivage'},
                            {field: 'dateTraitement', header: 'Date traitement'},
                        {field: 'estivageCentreEstivage?.reference', header: 'Estivage centre estivage'},
        ];
    }
    
    public async editDemandeEstivage(demandeEstivage:DemandeEstivageVo){
        const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'edit');
         if(isPermistted){
          this.demandeEstivageService.findByIdWithAssociatedList(demandeEstivage).subscribe(res => {
           this.selectedDemandeEstivage = res;
            this.selectedDemandeEstivage.dateDebutEstivage = new Date(demandeEstivage.dateDebutEstivage);
            this.selectedDemandeEstivage.dateFinEstivage = new Date(demandeEstivage.dateFinEstivage);
            this.selectedDemandeEstivage.dateTraitement = new Date(demandeEstivage.dateTraitement);
            this.editDemandeEstivageDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDemandeEstivage(demandeEstivage:DemandeEstivageVo){
        const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'view');
        if(isPermistted){
           this.demandeEstivageService.findByIdWithAssociatedList(demandeEstivage).subscribe(res => {
           this.selectedDemandeEstivage = res;
            this.selectedDemandeEstivage.dateDebutEstivage = new Date(demandeEstivage.dateDebutEstivage);
            this.selectedDemandeEstivage.dateFinEstivage = new Date(demandeEstivage.dateFinEstivage);
            this.selectedDemandeEstivage.dateTraitement = new Date(demandeEstivage.dateTraitement);
            this.viewDemandeEstivageDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDemandeEstivage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDemandeEstivage = new DemandeEstivageVo();
            this.createDemandeEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDemandeEstivage(demandeEstivage:DemandeEstivageVo){
       const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Demande estivage) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.demandeEstivageService.delete(demandeEstivage).subscribe(status=>{
                          if(status > 0){
                          const position = this.demandeEstivages.indexOf(demandeEstivage);
                          position > -1 ? this.demandeEstivages.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Demande estivage Supprimé',
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

public async loadDemandeEstivageCentre(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'list');
    isPermistted ? this.demandeEstivageCentreService.findAll().subscribe(demandeEstivageCentres => this.demandeEstivageCentres = demandeEstivageCentres,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadAdherent(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'list');
    isPermistted ? this.adherentService.findAll().subscribe(adherents => this.adherents = adherents,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatDemandeEstivage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'list');
    isPermistted ? this.etatDemandeEstivageService.findAll().subscribe(etatDemandeEstivages => this.etatDemandeEstivages = etatDemandeEstivages,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEstivageCentreEstivage(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'list');
    isPermistted ? this.estivageCentreEstivageService.findAll().subscribe(estivageCentreEstivages => this.estivageCentreEstivages = estivageCentreEstivages,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDemandeEstivage(demandeEstivage: DemandeEstivageVo) {

     this.demandeEstivageService.findByIdWithAssociatedList(demandeEstivage).subscribe(
	 res => {
	       this.initDuplicateDemandeEstivage(res);
	       this.selectedDemandeEstivage = res;
	       this.selectedDemandeEstivage.id = null;
            this.createDemandeEstivageDialog = true;

});

	}

	initDuplicateDemandeEstivage(res: DemandeEstivageVo) {
        if (res.pieceJointeEstivagesVo != null) {
             res.pieceJointeEstivagesVo.forEach(d => { d.demandeEstivageVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.demandeEstivages.map(e => {
    return {
                    'Reference': e.reference ,
            'Demande estivage centre': e.demandeEstivageCentreVo?.reference ,
                    'Date debut estivage': this.datePipe.transform(e.dateDebutEstivage , 'dd-MM-yyyy'),
                    'Date fin estivage': this.datePipe.transform(e.dateFinEstivage , 'dd-MM-yyyy'),
            'Adherent': e.adherentVo?.username ,
            'Etat demande estivage': e.etatDemandeEstivageVo?.libelle ,
                    'Date traitement': this.datePipe.transform(e.dateTraitement , 'dd-MM-yyyy'),
            'Estivage centre estivage': e.estivageCentreEstivageVo?.reference ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchDemandeEstivage.reference ? this.searchDemandeEstivage.reference : environment.emptyForExport ,
        'Demande estivage centre': this.searchDemandeEstivage.demandeEstivageCentreVo?.reference ? this.searchDemandeEstivage.demandeEstivageCentreVo?.reference : environment.emptyForExport ,
            'Date debut estivage Min': this.searchDemandeEstivage.dateDebutEstivageMin ? this.datePipe.transform(this.searchDemandeEstivage.dateDebutEstivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut estivage Max': this.searchDemandeEstivage.dateDebutEstivageMax ? this.datePipe.transform(this.searchDemandeEstivage.dateDebutEstivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date fin estivage Min': this.searchDemandeEstivage.dateFinEstivageMin ? this.datePipe.transform(this.searchDemandeEstivage.dateFinEstivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date fin estivage Max': this.searchDemandeEstivage.dateFinEstivageMax ? this.datePipe.transform(this.searchDemandeEstivage.dateFinEstivageMax , this.dateFormat) : environment.emptyForExport ,
        'Adherent': this.searchDemandeEstivage.adherentVo?.username ? this.searchDemandeEstivage.adherentVo?.username : environment.emptyForExport ,
        'Etat demande estivage': this.searchDemandeEstivage.etatDemandeEstivageVo?.libelle ? this.searchDemandeEstivage.etatDemandeEstivageVo?.libelle : environment.emptyForExport ,
            'Date traitement Min': this.searchDemandeEstivage.dateTraitementMin ? this.datePipe.transform(this.searchDemandeEstivage.dateTraitementMin , this.dateFormat) : environment.emptyForExport ,
            'Date traitement Max': this.searchDemandeEstivage.dateTraitementMax ? this.datePipe.transform(this.searchDemandeEstivage.dateTraitementMax , this.dateFormat) : environment.emptyForExport ,
        'Estivage centre estivage': this.searchDemandeEstivage.estivageCentreEstivageVo?.reference ? this.searchDemandeEstivage.estivageCentreEstivageVo?.reference : environment.emptyForExport ,
            'Piece jointe estivages Min': this.searchDemandeEstivage.pieceJointeEstivagesMin ? this.searchDemandeEstivage.pieceJointeEstivagesMin : environment.emptyForExport ,
            'Piece jointe estivages Max': this.searchDemandeEstivage.pieceJointeEstivagesMax ? this.searchDemandeEstivage.pieceJointeEstivagesMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get demandeEstivages(): Array<DemandeEstivageVo> {
           return this.demandeEstivageService.demandeEstivages;
       }
    set demandeEstivages(value: Array<DemandeEstivageVo>) {
        this.demandeEstivageService.demandeEstivages = value;
       }

    get demandeEstivageSelections(): Array<DemandeEstivageVo> {
           return this.demandeEstivageService.demandeEstivageSelections;
       }
    set demandeEstivageSelections(value: Array<DemandeEstivageVo>) {
        this.demandeEstivageService.demandeEstivageSelections = value;
       }
   
     


    get selectedDemandeEstivage():DemandeEstivageVo {
           return this.demandeEstivageService.selectedDemandeEstivage;
       }
    set selectedDemandeEstivage(value: DemandeEstivageVo) {
        this.demandeEstivageService.selectedDemandeEstivage = value;
       }
    
    get createDemandeEstivageDialog():boolean {
           return this.demandeEstivageService.createDemandeEstivageDialog;
       }
    set createDemandeEstivageDialog(value: boolean) {
        this.demandeEstivageService.createDemandeEstivageDialog= value;
       }
    
    get editDemandeEstivageDialog():boolean {
           return this.demandeEstivageService.editDemandeEstivageDialog;
       }
    set editDemandeEstivageDialog(value: boolean) {
        this.demandeEstivageService.editDemandeEstivageDialog= value;
       }
    get viewDemandeEstivageDialog():boolean {
           return this.demandeEstivageService.viewDemandeEstivageDialog;
       }
    set viewDemandeEstivageDialog(value: boolean) {
        this.demandeEstivageService.viewDemandeEstivageDialog = value;
       }
       
     get searchDemandeEstivage(): DemandeEstivageVo {
        return this.demandeEstivageService.searchDemandeEstivage;
       }
    set searchDemandeEstivage(value: DemandeEstivageVo) {
        this.demandeEstivageService.searchDemandeEstivage = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
