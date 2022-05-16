import {Component, OnInit} from '@angular/core';
import {PieceJointeMissionService} from '../../../../../../controller/service/PieceJointeMission.service';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { MissionService } from '../../../../../../controller/service/Mission.service';

import {MissionVo} from '../../../../../../controller/model/Mission.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-piece-jointe-mission-list-moderateur',
  templateUrl: './piece-jointe-mission-list-moderateur.component.html',
  styleUrls: ['./piece-jointe-mission-list-moderateur.component.css']
})
export class PieceJointeMissionListModerateurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PieceJointeMission';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    missions :Array<MissionVo>;


    constructor(private datePipe: DatePipe, private pieceJointeMissionService: PieceJointeMissionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private missionService: MissionService
) { }

    ngOnInit(): void {
      this.loadPieceJointeMissions();
      this.initExport();
      this.initCol();
      this.loadMission();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPieceJointeMissions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PieceJointeMission', 'list');
        isPermistted ? this.pieceJointeMissionService.findAll().subscribe(pieceJointeMissions => this.pieceJointeMissions = pieceJointeMissions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.pieceJointeMissionService.findByCriteria(this.searchPieceJointeMission).subscribe(pieceJointeMissions=>{
            
            this.pieceJointeMissions = pieceJointeMissions;
           // this.searchPieceJointeMission = new PieceJointeMissionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'path', header: 'Path'},
                        {field: 'mission?.reference', header: 'Mission'},
                            {field: 'dateAjout', header: 'Date ajout'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editPieceJointeMission(pieceJointeMission:PieceJointeMissionVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeMission', 'edit');
         if(isPermistted){
          this.pieceJointeMissionService.findByIdWithAssociatedList(pieceJointeMission).subscribe(res => {
           this.selectedPieceJointeMission = res;
            this.selectedPieceJointeMission.dateAjout = new Date(pieceJointeMission.dateAjout);
            this.selectedPieceJointeMission.dateArchivage = new Date(pieceJointeMission.dateArchivage);
            this.selectedPieceJointeMission.dateCreation = new Date(pieceJointeMission.dateCreation);
            this.editPieceJointeMissionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPieceJointeMission(pieceJointeMission:PieceJointeMissionVo){
        const isPermistted = await this.roleService.isPermitted('PieceJointeMission', 'view');
        if(isPermistted){
           this.pieceJointeMissionService.findByIdWithAssociatedList(pieceJointeMission).subscribe(res => {
           this.selectedPieceJointeMission = res;
            this.selectedPieceJointeMission.dateAjout = new Date(pieceJointeMission.dateAjout);
            this.selectedPieceJointeMission.dateArchivage = new Date(pieceJointeMission.dateArchivage);
            this.selectedPieceJointeMission.dateCreation = new Date(pieceJointeMission.dateCreation);
            this.viewPieceJointeMissionDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePieceJointeMission(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPieceJointeMission = new PieceJointeMissionVo();
            this.createPieceJointeMissionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPieceJointeMission(pieceJointeMission:PieceJointeMissionVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeMission', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Piece jointe mission) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeMissionService.archiver(pieceJointeMission).subscribe(status=>{
const myIndex = this.pieceJointeMissions.indexOf(pieceJointeMission);
this.pieceJointeMissions[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe mission archivé',
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

public async desarchiverPieceJointeMission(pieceJointeMission:PieceJointeMissionVo){
const isPermistted = await this.roleService.isPermitted('PieceJointeMission', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Piece jointe mission) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.pieceJointeMissionService.desarchiver(pieceJointeMission).subscribe(status=>{
const myIndex = this.pieceJointeMissions.indexOf(pieceJointeMission);
this.pieceJointeMissions[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Piece jointe mission désarchivé',
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


    public async deletePieceJointeMission(pieceJointeMission:PieceJointeMissionVo){
       const isPermistted = await this.roleService.isPermitted('PieceJointeMission', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Piece jointe mission) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.pieceJointeMissionService.delete(pieceJointeMission).subscribe(status=>{
                          if(status > 0){
                          const position = this.pieceJointeMissions.indexOf(pieceJointeMission);
                          position > -1 ? this.pieceJointeMissions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Piece jointe mission Supprimé',
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

public async loadMission(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PieceJointeMission', 'list');
    isPermistted ? this.missionService.findAll().subscribe(missions => this.missions = missions,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePieceJointeMission(pieceJointeMission: PieceJointeMissionVo) {

     this.pieceJointeMissionService.findByIdWithAssociatedList(pieceJointeMission).subscribe(
	 res => {
	       this.initDuplicatePieceJointeMission(res);
	       this.selectedPieceJointeMission = res;
	       this.selectedPieceJointeMission.id = null;
            this.createPieceJointeMissionDialog = true;

});

	}

	initDuplicatePieceJointeMission(res: PieceJointeMissionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.pieceJointeMissions.map(e => {
    return {
                    'Path': e.path ,
            'Mission': e.missionVo?.reference ,
                    'Date ajout': this.datePipe.transform(e.dateAjout , 'dd-MM-yyyy'),
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Path': this.searchPieceJointeMission.path ? this.searchPieceJointeMission.path : environment.emptyForExport ,
        'Mission': this.searchPieceJointeMission.missionVo?.reference ? this.searchPieceJointeMission.missionVo?.reference : environment.emptyForExport ,
            'Date ajout Min': this.searchPieceJointeMission.dateAjoutMin ? this.datePipe.transform(this.searchPieceJointeMission.dateAjoutMin , this.dateFormat) : environment.emptyForExport ,
            'Date ajout Max': this.searchPieceJointeMission.dateAjoutMax ? this.datePipe.transform(this.searchPieceJointeMission.dateAjoutMax , this.dateFormat) : environment.emptyForExport ,
            'Libelle': this.searchPieceJointeMission.libelle ? this.searchPieceJointeMission.libelle : environment.emptyForExport ,
            'Archive': this.searchPieceJointeMission.archive ? (this.searchPieceJointeMission.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPieceJointeMission.dateArchivageMin ? this.datePipe.transform(this.searchPieceJointeMission.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPieceJointeMission.dateArchivageMax ? this.datePipe.transform(this.searchPieceJointeMission.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPieceJointeMission.dateCreationMin ? this.datePipe.transform(this.searchPieceJointeMission.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPieceJointeMission.dateCreationMax ? this.datePipe.transform(this.searchPieceJointeMission.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPieceJointeMission.admin ? (this.searchPieceJointeMission.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPieceJointeMission.visible ? (this.searchPieceJointeMission.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPieceJointeMission.username ? this.searchPieceJointeMission.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get pieceJointeMissions(): Array<PieceJointeMissionVo> {
           return this.pieceJointeMissionService.pieceJointeMissions;
       }
    set pieceJointeMissions(value: Array<PieceJointeMissionVo>) {
        this.pieceJointeMissionService.pieceJointeMissions = value;
       }

    get pieceJointeMissionSelections(): Array<PieceJointeMissionVo> {
           return this.pieceJointeMissionService.pieceJointeMissionSelections;
       }
    set pieceJointeMissionSelections(value: Array<PieceJointeMissionVo>) {
        this.pieceJointeMissionService.pieceJointeMissionSelections = value;
       }
   
     


    get selectedPieceJointeMission():PieceJointeMissionVo {
           return this.pieceJointeMissionService.selectedPieceJointeMission;
       }
    set selectedPieceJointeMission(value: PieceJointeMissionVo) {
        this.pieceJointeMissionService.selectedPieceJointeMission = value;
       }
    
    get createPieceJointeMissionDialog():boolean {
           return this.pieceJointeMissionService.createPieceJointeMissionDialog;
       }
    set createPieceJointeMissionDialog(value: boolean) {
        this.pieceJointeMissionService.createPieceJointeMissionDialog= value;
       }
    
    get editPieceJointeMissionDialog():boolean {
           return this.pieceJointeMissionService.editPieceJointeMissionDialog;
       }
    set editPieceJointeMissionDialog(value: boolean) {
        this.pieceJointeMissionService.editPieceJointeMissionDialog= value;
       }
    get viewPieceJointeMissionDialog():boolean {
           return this.pieceJointeMissionService.viewPieceJointeMissionDialog;
       }
    set viewPieceJointeMissionDialog(value: boolean) {
        this.pieceJointeMissionService.viewPieceJointeMissionDialog = value;
       }
       
     get searchPieceJointeMission(): PieceJointeMissionVo {
        return this.pieceJointeMissionService.searchPieceJointeMission;
       }
    set searchPieceJointeMission(value: PieceJointeMissionVo) {
        this.pieceJointeMissionService.searchPieceJointeMission = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
