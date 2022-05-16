import {Component, OnInit} from '@angular/core';
import {PieceJointeMissionService} from '../../../../../../controller/service/PieceJointeMission.service';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {MissionService} from '../../../../../../controller/service/Mission.service';

@Component({
  selector: 'app-piece-jointe-mission-view-admin',
  templateUrl: './piece-jointe-mission-view-admin.component.html',
  styleUrls: ['./piece-jointe-mission-view-admin.component.css']
})
export class PieceJointeMissionViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeMissionService: PieceJointeMissionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private missionService :MissionService
) {
}

// methods
ngOnInit(): void {
    this.selectedMission = new MissionVo();
    this.missionService.findAll().subscribe((data) => this.missions = data);
}

hideViewDialog(){
    this.viewPieceJointeMissionDialog  = false;
}

// getters and setters

get pieceJointeMissions(): Array<PieceJointeMissionVo> {
    return this.pieceJointeMissionService.pieceJointeMissions;
       }
set pieceJointeMissions(value: Array<PieceJointeMissionVo>) {
        this.pieceJointeMissionService.pieceJointeMissions = value;
       }

 get selectedPieceJointeMission():PieceJointeMissionVo {
           return this.pieceJointeMissionService.selectedPieceJointeMission;
       }
    set selectedPieceJointeMission(value: PieceJointeMissionVo) {
        this.pieceJointeMissionService.selectedPieceJointeMission = value;
       }

   get viewPieceJointeMissionDialog():boolean {
           return this.pieceJointeMissionService.viewPieceJointeMissionDialog;

       }
    set viewPieceJointeMissionDialog(value: boolean) {
        this.pieceJointeMissionService.viewPieceJointeMissionDialog= value;
       }

       get selectedMission():MissionVo {
           return this.missionService.selectedMission;
       }
      set selectedMission(value: MissionVo) {
        this.missionService.selectedMission = value;
       }
       get missions():Array<MissionVo> {
           return this.missionService.missions;
       }
       set missions(value: Array<MissionVo>) {
        this.missionService.missions = value;
       }
       get editMissionDialog():boolean {
           return this.missionService.editMissionDialog;
       }
      set editMissionDialog(value: boolean) {
        this.missionService.editMissionDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
