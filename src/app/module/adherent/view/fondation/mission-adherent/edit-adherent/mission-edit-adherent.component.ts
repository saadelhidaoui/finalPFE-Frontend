import {Component, OnInit} from '@angular/core';
import {MissionService} from '../../../../../../controller/service/Mission.service';
import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import {PieceJointeMissionService} from '../../../../../../controller/service/PieceJointeMission.service';

@Component({
  selector: 'app-mission-edit-adherent',
  templateUrl: './mission-edit-adherent.component.html',
  styleUrls: ['./mission-edit-adherent.component.css']
})
export class MissionEditAdherentComponent implements OnInit {

        selectedPieceJointeMissions: PieceJointeMissionVo = new PieceJointeMissionVo();
        pieceJointeMissionsListe: Array<PieceJointeMissionVo> = [];



constructor(private datePipe: DatePipe, private missionService: MissionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private villeService: VilleService
 ,       private moderateurService: ModerateurService
 ,       private pieceJointeMissionService: PieceJointeMissionService
) {
}

// methods
ngOnInit(): void {
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedModerateur = new ModerateurVo();
    this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
}
        addPieceJointeMissions() {
        if( this.selectedMission.pieceJointeMissionsVo == null ){
            this.selectedMission.pieceJointeMissionsVo = new Array<PieceJointeMissionVo>();
        }
        this.selectedMission.pieceJointeMissionsVo.push(this.selectedPieceJointeMissions);
        this.selectedPieceJointeMissions = new PieceJointeMissionVo();
        }

       deletePieceJointeMissions(p: PieceJointeMissionVo) {
        this.selectedMission.pieceJointeMissionsVo.forEach((element, index) => {
            if (element === p) { this.selectedMission.pieceJointeMissionsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedMission.dateDebut = DateUtils.toDate(this.selectedMission.dateDebut);
            this.selectedMission.dateFin = DateUtils.toDate(this.selectedMission.dateFin);
            this.selectedMission.dateArchivage = DateUtils.toDate(this.selectedMission.dateArchivage);
            this.selectedMission.dateCreation = DateUtils.toDate(this.selectedMission.dateCreation);
    this.missionService.edit().subscribe(mission=>{
    const myIndex = this.missions.findIndex(e => e.id === this.selectedMission.id);
    this.missions[myIndex] = this.selectedMission;
    this.editMissionDialog = false;
    this.selectedMission = new MissionVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatemoderateur(moderateur: string) {
                      const isPermistted = await this.roleService.isPermitted('Moderateur', 'add');
                       if(isPermistted){
         this.selectedModerateur = new ModerateurVo();
        this.createModerateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editMissionDialog  = false;
}

// getters and setters

get missions(): Array<MissionVo> {
    return this.missionService.missions;
       }
set missions(value: Array<MissionVo>) {
        this.missionService.missions = value;
       }

 get selectedMission(): MissionVo {
           return this.missionService.selectedMission;
       }
    set selectedMission(value: MissionVo) {
        this.missionService.selectedMission = value;
       }

   get editMissionDialog(): boolean {
           return this.missionService.editMissionDialog;

       }
    set editMissionDialog(value: boolean) {
        this.missionService.editMissionDialog = value;
       }

       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
       }
       get selectedModerateur(): ModerateurVo {
           return this.moderateurService.selectedModerateur;
       }
      set selectedModerateur(value: ModerateurVo) {
        this.moderateurService.selectedModerateur = value;
       }
       get moderateurs(): Array<ModerateurVo> {
           return this.moderateurService.moderateurs;
       }
       set moderateurs(value: Array<ModerateurVo>) {
        this.moderateurService.moderateurs = value;
       }
       get createModerateurDialog(): boolean {
           return this.moderateurService.createModerateurDialog;
       }
      set createModerateurDialog(value: boolean) {
        this.moderateurService.createModerateurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
