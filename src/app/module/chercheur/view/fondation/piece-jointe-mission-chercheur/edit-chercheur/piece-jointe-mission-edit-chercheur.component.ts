import {Component, OnInit} from '@angular/core';
import {PieceJointeMissionService} from '../../../../../../controller/service/PieceJointeMission.service';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {MissionService} from '../../../../../../controller/service/Mission.service';

@Component({
  selector: 'app-piece-jointe-mission-edit-chercheur',
  templateUrl: './piece-jointe-mission-edit-chercheur.component.html',
  styleUrls: ['./piece-jointe-mission-edit-chercheur.component.css']
})
export class PieceJointeMissionEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeMissionService: PieceJointeMissionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private missionService: MissionService
) {
}

// methods
ngOnInit(): void {
    this.selectedMission = new MissionVo();
    this.missionService.findAll().subscribe((data) => this.missions = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPieceJointeMission.dateAjout = DateUtils.toDate(this.selectedPieceJointeMission.dateAjout);
            this.selectedPieceJointeMission.dateArchivage = DateUtils.toDate(this.selectedPieceJointeMission.dateArchivage);
            this.selectedPieceJointeMission.dateCreation = DateUtils.toDate(this.selectedPieceJointeMission.dateCreation);
    this.pieceJointeMissionService.edit().subscribe(pieceJointeMission=>{
    const myIndex = this.pieceJointeMissions.findIndex(e => e.id === this.selectedPieceJointeMission.id);
    this.pieceJointeMissions[myIndex] = this.selectedPieceJointeMission;
    this.editPieceJointeMissionDialog = false;
    this.selectedPieceJointeMission = new PieceJointeMissionVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatemission(mission: string) {
                      const isPermistted = await this.roleService.isPermitted('Mission', 'add');
                       if(isPermistted){
         this.selectedMission = new MissionVo();
        this.createMissionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPieceJointeMissionDialog  = false;
}

// getters and setters

get pieceJointeMissions(): Array<PieceJointeMissionVo> {
    return this.pieceJointeMissionService.pieceJointeMissions;
       }
set pieceJointeMissions(value: Array<PieceJointeMissionVo>) {
        this.pieceJointeMissionService.pieceJointeMissions = value;
       }

 get selectedPieceJointeMission(): PieceJointeMissionVo {
           return this.pieceJointeMissionService.selectedPieceJointeMission;
       }
    set selectedPieceJointeMission(value: PieceJointeMissionVo) {
        this.pieceJointeMissionService.selectedPieceJointeMission = value;
       }

   get editPieceJointeMissionDialog(): boolean {
           return this.pieceJointeMissionService.editPieceJointeMissionDialog;

       }
    set editPieceJointeMissionDialog(value: boolean) {
        this.pieceJointeMissionService.editPieceJointeMissionDialog = value;
       }

       get selectedMission(): MissionVo {
           return this.missionService.selectedMission;
       }
      set selectedMission(value: MissionVo) {
        this.missionService.selectedMission = value;
       }
       get missions(): Array<MissionVo> {
           return this.missionService.missions;
       }
       set missions(value: Array<MissionVo>) {
        this.missionService.missions = value;
       }
       get createMissionDialog(): boolean {
           return this.missionService.createMissionDialog;
       }
      set createMissionDialog(value: boolean) {
        this.missionService.createMissionDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
