import {Component, OnInit} from '@angular/core';
import {MissionService} from '../../../../../../controller/service/Mission.service';
import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import {PieceJointeMissionService} from '../../../../../../controller/service/PieceJointeMission.service';

@Component({
  selector: 'app-mission-view-admin',
  templateUrl: './mission-view-admin.component.html',
  styleUrls: ['./mission-view-admin.component.css']
})
export class MissionViewAdminComponent implements OnInit {

        selectedPieceJointeMissions: PieceJointeMissionVo = new PieceJointeMissionVo();
        pieceJointeMissionsListe: Array<PieceJointeMissionVo> = [];



constructor(private datePipe: DatePipe, private missionService: MissionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private villeService :VilleService
    ,private moderateurService :ModerateurService
    ,private pieceJointeMissionService :PieceJointeMissionService
) {
}

// methods
ngOnInit(): void {
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedModerateur = new ModerateurVo();
    this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
}

hideViewDialog(){
    this.viewMissionDialog  = false;
}

// getters and setters

get missions(): Array<MissionVo> {
    return this.missionService.missions;
       }
set missions(value: Array<MissionVo>) {
        this.missionService.missions = value;
       }

 get selectedMission():MissionVo {
           return this.missionService.selectedMission;
       }
    set selectedMission(value: MissionVo) {
        this.missionService.selectedMission = value;
       }

   get viewMissionDialog():boolean {
           return this.missionService.viewMissionDialog;

       }
    set viewMissionDialog(value: boolean) {
        this.missionService.viewMissionDialog= value;
       }

       get selectedVille():VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes():Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get editVilleDialog():boolean {
           return this.villeService.editVilleDialog;
       }
      set editVilleDialog(value: boolean) {
        this.villeService.editVilleDialog= value;
       }
       get selectedModerateur():ModerateurVo {
           return this.moderateurService.selectedModerateur;
       }
      set selectedModerateur(value: ModerateurVo) {
        this.moderateurService.selectedModerateur = value;
       }
       get moderateurs():Array<ModerateurVo> {
           return this.moderateurService.moderateurs;
       }
       set moderateurs(value: Array<ModerateurVo>) {
        this.moderateurService.moderateurs = value;
       }
       get editModerateurDialog():boolean {
           return this.moderateurService.editModerateurDialog;
       }
      set editModerateurDialog(value: boolean) {
        this.moderateurService.editModerateurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
