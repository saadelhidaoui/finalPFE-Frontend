import {Component, OnInit} from '@angular/core';
import {ImpressionCarteService} from '../../../../../../controller/service/ImpressionCarte.service';
import {ImpressionCarteVo} from '../../../../../../controller/model/ImpressionCarte.model';
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
  selector: 'app-impression-carte-list-chercheur',
  templateUrl: './impression-carte-list-chercheur.component.html',
  styleUrls: ['./impression-carte-list-chercheur.component.css']
})
export class ImpressionCarteListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ImpressionCarte';


    constructor(private datePipe: DatePipe, private impressionCarteService: ImpressionCarteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadImpressionCartes();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadImpressionCartes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ImpressionCarte', 'list');
        isPermistted ? this.impressionCarteService.findAll().subscribe(impressionCartes => this.impressionCartes = impressionCartes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.impressionCarteService.findByCriteria(this.searchImpressionCarte).subscribe(impressionCartes=>{
            
            this.impressionCartes = impressionCartes;
           // this.searchImpressionCarte = new ImpressionCarteVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'aff', header: 'Aff'},
                            {field: 'qualite', header: 'Qualite'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'nomprenomar', header: 'Nomprenomar'},
                            {field: 'nomAr', header: 'Nom ar'},
                            {field: 'prenomAr', header: 'Prenom ar'},
                            {field: 'cinn', header: 'Cinn'},
                            {field: 'cin', header: 'Cin'},
                            {field: 'pprr', header: 'Pprr'},
                            {field: 'ppr', header: 'Ppr'},
                            {field: 'naissance', header: 'Naissance'},
                            {field: 'dateNaissance', header: 'Date naissance'},
                            {field: 'photo', header: 'Photo'},
                            {field: 'cinnConjoint', header: 'Cinn conjoint'},
                            {field: 'cinConjoint', header: 'Cin conjoint'},
                            {field: 'adherent', header: 'Adherent'},
                            {field: 'nomAdherent', header: 'Nom adherent'},
                            {field: 'prenomAdherent', header: 'Prenom adherent'},
                            {field: 'cinnAdherent', header: 'Cinn adherent'},
                            {field: 'cinAdherent', header: 'Cin adherent'},
                            {field: 'pprrAdherent', header: 'Pprr adherent'},
                            {field: 'pprAdherent', header: 'Ppr adherent'},
                            {field: 'versocarte', header: 'Versocarte'},
                            {field: 'aff1', header: 'Aff1'},
                            {field: 'aff2', header: 'Aff2'},
                            {field: 'nval', header: 'Nval'},
        ];
    }
    
    public async editImpressionCarte(impressionCarte:ImpressionCarteVo){
        const isPermistted = await this.roleService.isPermitted('ImpressionCarte', 'edit');
         if(isPermistted){
          this.impressionCarteService.findByIdWithAssociatedList(impressionCarte).subscribe(res => {
           this.selectedImpressionCarte = res;
            this.selectedImpressionCarte.dateNaissance = new Date(impressionCarte.dateNaissance);
            this.editImpressionCarteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewImpressionCarte(impressionCarte:ImpressionCarteVo){
        const isPermistted = await this.roleService.isPermitted('ImpressionCarte', 'view');
        if(isPermistted){
           this.impressionCarteService.findByIdWithAssociatedList(impressionCarte).subscribe(res => {
           this.selectedImpressionCarte = res;
            this.selectedImpressionCarte.dateNaissance = new Date(impressionCarte.dateNaissance);
            this.viewImpressionCarteDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateImpressionCarte(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedImpressionCarte = new ImpressionCarteVo();
            this.createImpressionCarteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteImpressionCarte(impressionCarte:ImpressionCarteVo){
       const isPermistted = await this.roleService.isPermitted('ImpressionCarte', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Impression carte) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.impressionCarteService.delete(impressionCarte).subscribe(status=>{
                          if(status > 0){
                          const position = this.impressionCartes.indexOf(impressionCarte);
                          position > -1 ? this.impressionCartes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Impression carte Supprimé',
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


public async duplicateImpressionCarte(impressionCarte: ImpressionCarteVo) {

     this.impressionCarteService.findByIdWithAssociatedList(impressionCarte).subscribe(
	 res => {
	       this.initDuplicateImpressionCarte(res);
	       this.selectedImpressionCarte = res;
	       this.selectedImpressionCarte.id = null;
            this.createImpressionCarteDialog = true;

});

	}

	initDuplicateImpressionCarte(res: ImpressionCarteVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.impressionCartes.map(e => {
    return {
                    'Aff': e.aff ,
                    'Qualite': e.qualite ,
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
                    'Nomprenomar': e.nomprenomar ,
                    'Nom ar': e.nomAr ,
                    'Prenom ar': e.prenomAr ,
                    'Cinn': e.cinn ,
                    'Cin': e.cin ,
                    'Pprr': e.pprr ,
                    'Ppr': e.ppr ,
                    'Naissance': e.naissance ,
                    'Date naissance': this.datePipe.transform(e.dateNaissance , 'dd-MM-yyyy'),
                    'Photo': e.photo ,
                    'Cinn conjoint': e.cinnConjoint ,
                    'Cin conjoint': e.cinConjoint ,
                    'Adherent': e.adherent ,
                    'Nom adherent': e.nomAdherent ,
                    'Prenom adherent': e.prenomAdherent ,
                    'Cinn adherent': e.cinnAdherent ,
                    'Cin adherent': e.cinAdherent ,
                    'Pprr adherent': e.pprrAdherent ,
                    'Ppr adherent': e.pprAdherent ,
                    'Versocarte': e.versocarte ,
                    'Aff1': e.aff1 ,
                    'Aff2': e.aff2 ,
                    'Nval': e.nval ,
     }
      });

      this.criteriaData = [{
            'Aff': this.searchImpressionCarte.aff ? this.searchImpressionCarte.aff : environment.emptyForExport ,
            'Qualite': this.searchImpressionCarte.qualite ? this.searchImpressionCarte.qualite : environment.emptyForExport ,
            'Nom': this.searchImpressionCarte.nom ? this.searchImpressionCarte.nom : environment.emptyForExport ,
            'Prenom': this.searchImpressionCarte.prenom ? this.searchImpressionCarte.prenom : environment.emptyForExport ,
            'Nomprenomar': this.searchImpressionCarte.nomprenomar ? this.searchImpressionCarte.nomprenomar : environment.emptyForExport ,
            'Nom ar': this.searchImpressionCarte.nomAr ? this.searchImpressionCarte.nomAr : environment.emptyForExport ,
            'Prenom ar': this.searchImpressionCarte.prenomAr ? this.searchImpressionCarte.prenomAr : environment.emptyForExport ,
            'Cinn': this.searchImpressionCarte.cinn ? this.searchImpressionCarte.cinn : environment.emptyForExport ,
            'Cin': this.searchImpressionCarte.cin ? this.searchImpressionCarte.cin : environment.emptyForExport ,
            'Pprr': this.searchImpressionCarte.pprr ? this.searchImpressionCarte.pprr : environment.emptyForExport ,
            'Ppr': this.searchImpressionCarte.ppr ? this.searchImpressionCarte.ppr : environment.emptyForExport ,
            'Naissance': this.searchImpressionCarte.naissance ? this.searchImpressionCarte.naissance : environment.emptyForExport ,
            'Date naissance Min': this.searchImpressionCarte.dateNaissanceMin ? this.datePipe.transform(this.searchImpressionCarte.dateNaissanceMin , this.dateFormat) : environment.emptyForExport ,
            'Date naissance Max': this.searchImpressionCarte.dateNaissanceMax ? this.datePipe.transform(this.searchImpressionCarte.dateNaissanceMax , this.dateFormat) : environment.emptyForExport ,
            'Photo': this.searchImpressionCarte.photo ? this.searchImpressionCarte.photo : environment.emptyForExport ,
            'Cinn conjoint': this.searchImpressionCarte.cinnConjoint ? this.searchImpressionCarte.cinnConjoint : environment.emptyForExport ,
            'Cin conjoint': this.searchImpressionCarte.cinConjoint ? this.searchImpressionCarte.cinConjoint : environment.emptyForExport ,
            'Adherent': this.searchImpressionCarte.adherent ? this.searchImpressionCarte.adherent : environment.emptyForExport ,
            'Nom adherent': this.searchImpressionCarte.nomAdherent ? this.searchImpressionCarte.nomAdherent : environment.emptyForExport ,
            'Prenom adherent': this.searchImpressionCarte.prenomAdherent ? this.searchImpressionCarte.prenomAdherent : environment.emptyForExport ,
            'Cinn adherent': this.searchImpressionCarte.cinnAdherent ? this.searchImpressionCarte.cinnAdherent : environment.emptyForExport ,
            'Cin adherent': this.searchImpressionCarte.cinAdherent ? this.searchImpressionCarte.cinAdherent : environment.emptyForExport ,
            'Pprr adherent': this.searchImpressionCarte.pprrAdherent ? this.searchImpressionCarte.pprrAdherent : environment.emptyForExport ,
            'Ppr adherent': this.searchImpressionCarte.pprAdherent ? this.searchImpressionCarte.pprAdherent : environment.emptyForExport ,
            'Versocarte': this.searchImpressionCarte.versocarte ? this.searchImpressionCarte.versocarte : environment.emptyForExport ,
            'Aff1': this.searchImpressionCarte.aff1 ? this.searchImpressionCarte.aff1 : environment.emptyForExport ,
            'Aff2': this.searchImpressionCarte.aff2 ? this.searchImpressionCarte.aff2 : environment.emptyForExport ,
            'Nval': this.searchImpressionCarte.nval ? this.searchImpressionCarte.nval : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get impressionCartes(): Array<ImpressionCarteVo> {
           return this.impressionCarteService.impressionCartes;
       }
    set impressionCartes(value: Array<ImpressionCarteVo>) {
        this.impressionCarteService.impressionCartes = value;
       }

    get impressionCarteSelections(): Array<ImpressionCarteVo> {
           return this.impressionCarteService.impressionCarteSelections;
       }
    set impressionCarteSelections(value: Array<ImpressionCarteVo>) {
        this.impressionCarteService.impressionCarteSelections = value;
       }
   
     


    get selectedImpressionCarte():ImpressionCarteVo {
           return this.impressionCarteService.selectedImpressionCarte;
       }
    set selectedImpressionCarte(value: ImpressionCarteVo) {
        this.impressionCarteService.selectedImpressionCarte = value;
       }
    
    get createImpressionCarteDialog():boolean {
           return this.impressionCarteService.createImpressionCarteDialog;
       }
    set createImpressionCarteDialog(value: boolean) {
        this.impressionCarteService.createImpressionCarteDialog= value;
       }
    
    get editImpressionCarteDialog():boolean {
           return this.impressionCarteService.editImpressionCarteDialog;
       }
    set editImpressionCarteDialog(value: boolean) {
        this.impressionCarteService.editImpressionCarteDialog= value;
       }
    get viewImpressionCarteDialog():boolean {
           return this.impressionCarteService.viewImpressionCarteDialog;
       }
    set viewImpressionCarteDialog(value: boolean) {
        this.impressionCarteService.viewImpressionCarteDialog = value;
       }
       
     get searchImpressionCarte(): ImpressionCarteVo {
        return this.impressionCarteService.searchImpressionCarte;
       }
    set searchImpressionCarte(value: ImpressionCarteVo) {
        this.impressionCarteService.searchImpressionCarte = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
