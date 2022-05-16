import {Component, OnInit} from '@angular/core';
import {MissionService} from '../../../../../../controller/service/Mission.service';
import {MissionVo} from '../../../../../../controller/model/Mission.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { VilleService } from '../../../../../../controller/service/Ville.service';
import { ModerateurService } from '../../../../../../controller/service/Moderateur.service';

import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-mission-list-chercheur',
  templateUrl: './mission-list-chercheur.component.html',
  styleUrls: ['./mission-list-chercheur.component.css']
})
export class MissionListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Mission';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    villes :Array<VilleVo>;
    moderateurs :Array<ModerateurVo>;


    constructor(private datePipe: DatePipe, private missionService: MissionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private villeService: VilleService
        , private moderateurService: ModerateurService
) { }

    ngOnInit(): void {
      this.loadMissions();
      this.initExport();
      this.initCol();
      this.loadVille();
      this.loadModerateur();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadMissions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Mission', 'list');
        isPermistted ? this.missionService.findAll().subscribe(missions => this.missions = missions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.missionService.findByCriteria(this.searchMission).subscribe(missions=>{
            
            this.missions = missions;
           // this.searchMission = new MissionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'dateDebut', header: 'Date debut'},
                            {field: 'dateFin', header: 'Date fin'},
                        {field: 'ville?.libelle', header: 'Ville'},
                            {field: 'moyenDeTransport', header: 'Moyen de transport'},
                            {field: 'distance', header: 'Distance'},
                        {field: 'moderateur?.numeroMatricule', header: 'Moderateur'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editMission(mission:MissionVo){
        const isPermistted = await this.roleService.isPermitted('Mission', 'edit');
         if(isPermistted){
          this.missionService.findByIdWithAssociatedList(mission).subscribe(res => {
           this.selectedMission = res;
            this.selectedMission.dateDebut = new Date(mission.dateDebut);
            this.selectedMission.dateFin = new Date(mission.dateFin);
            this.selectedMission.dateArchivage = new Date(mission.dateArchivage);
            this.selectedMission.dateCreation = new Date(mission.dateCreation);
            this.editMissionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewMission(mission:MissionVo){
        const isPermistted = await this.roleService.isPermitted('Mission', 'view');
        if(isPermistted){
           this.missionService.findByIdWithAssociatedList(mission).subscribe(res => {
           this.selectedMission = res;
            this.selectedMission.dateDebut = new Date(mission.dateDebut);
            this.selectedMission.dateFin = new Date(mission.dateFin);
            this.selectedMission.dateArchivage = new Date(mission.dateArchivage);
            this.selectedMission.dateCreation = new Date(mission.dateCreation);
            this.viewMissionDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateMission(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedMission = new MissionVo();
            this.createMissionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteMission(mission:MissionVo){
       const isPermistted = await this.roleService.isPermitted('Mission', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Mission) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.missionService.delete(mission).subscribe(status=>{
                          if(status > 0){
                          const position = this.missions.indexOf(mission);
                          position > -1 ? this.missions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Mission Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('Mission', 'list');
    isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadModerateur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Mission', 'list');
    isPermistted ? this.moderateurService.findAll().subscribe(moderateurs => this.moderateurs = moderateurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateMission(mission: MissionVo) {

     this.missionService.findByIdWithAssociatedList(mission).subscribe(
	 res => {
	       this.initDuplicateMission(res);
	       this.selectedMission = res;
	       this.selectedMission.id = null;
            this.createMissionDialog = true;

});

	}

	initDuplicateMission(res: MissionVo) {
        if (res.pieceJointeMissionsVo != null) {
             res.pieceJointeMissionsVo.forEach(d => { d.missionVo = null; d.id = null; });
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
    this.exportData = this.missions.map(e => {
    return {
                    'Reference': e.reference ,
                    'Date debut': this.datePipe.transform(e.dateDebut , 'dd-MM-yyyy'),
                    'Date fin': this.datePipe.transform(e.dateFin , 'dd-MM-yyyy'),
            'Ville': e.villeVo?.libelle ,
                    'Moyen de transport': e.moyenDeTransport ,
                    'Distance': e.distance ,
            'Moderateur': e.moderateurVo?.numeroMatricule ,
                    'Pv': e.pv ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchMission.reference ? this.searchMission.reference : environment.emptyForExport ,
            'Date debut Min': this.searchMission.dateDebutMin ? this.datePipe.transform(this.searchMission.dateDebutMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut Max': this.searchMission.dateDebutMax ? this.datePipe.transform(this.searchMission.dateDebutMax , this.dateFormat) : environment.emptyForExport ,
            'Date fin Min': this.searchMission.dateFinMin ? this.datePipe.transform(this.searchMission.dateFinMin , this.dateFormat) : environment.emptyForExport ,
            'Date fin Max': this.searchMission.dateFinMax ? this.datePipe.transform(this.searchMission.dateFinMax , this.dateFormat) : environment.emptyForExport ,
        'Ville': this.searchMission.villeVo?.libelle ? this.searchMission.villeVo?.libelle : environment.emptyForExport ,
            'Moyen de transport': this.searchMission.moyenDeTransport ? this.searchMission.moyenDeTransport : environment.emptyForExport ,
            'Distance Min': this.searchMission.distanceMin ? this.searchMission.distanceMin : environment.emptyForExport ,
            'Distance Max': this.searchMission.distanceMax ? this.searchMission.distanceMax : environment.emptyForExport ,
        'Moderateur': this.searchMission.moderateurVo?.numeroMatricule ? this.searchMission.moderateurVo?.numeroMatricule : environment.emptyForExport ,
            'Pv': this.searchMission.pv ? this.searchMission.pv : environment.emptyForExport ,
            'Piece jointe missions Min': this.searchMission.pieceJointeMissionsMin ? this.searchMission.pieceJointeMissionsMin : environment.emptyForExport ,
            'Piece jointe missions Max': this.searchMission.pieceJointeMissionsMax ? this.searchMission.pieceJointeMissionsMax : environment.emptyForExport ,
            'Archive': this.searchMission.archive ? (this.searchMission.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchMission.dateArchivageMin ? this.datePipe.transform(this.searchMission.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchMission.dateArchivageMax ? this.datePipe.transform(this.searchMission.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchMission.dateCreationMin ? this.datePipe.transform(this.searchMission.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchMission.dateCreationMax ? this.datePipe.transform(this.searchMission.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchMission.admin ? (this.searchMission.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchMission.visible ? (this.searchMission.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchMission.username ? this.searchMission.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get missions(): Array<MissionVo> {
           return this.missionService.missions;
       }
    set missions(value: Array<MissionVo>) {
        this.missionService.missions = value;
       }

    get missionSelections(): Array<MissionVo> {
           return this.missionService.missionSelections;
       }
    set missionSelections(value: Array<MissionVo>) {
        this.missionService.missionSelections = value;
       }
   
     


    get selectedMission():MissionVo {
           return this.missionService.selectedMission;
       }
    set selectedMission(value: MissionVo) {
        this.missionService.selectedMission = value;
       }
    
    get createMissionDialog():boolean {
           return this.missionService.createMissionDialog;
       }
    set createMissionDialog(value: boolean) {
        this.missionService.createMissionDialog= value;
       }
    
    get editMissionDialog():boolean {
           return this.missionService.editMissionDialog;
       }
    set editMissionDialog(value: boolean) {
        this.missionService.editMissionDialog= value;
       }
    get viewMissionDialog():boolean {
           return this.missionService.viewMissionDialog;
       }
    set viewMissionDialog(value: boolean) {
        this.missionService.viewMissionDialog = value;
       }
       
     get searchMission(): MissionVo {
        return this.missionService.searchMission;
       }
    set searchMission(value: MissionVo) {
        this.missionService.searchMission = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
