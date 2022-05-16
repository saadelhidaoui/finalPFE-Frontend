import {Component, OnInit, Input} from '@angular/core';
import {PieceJointeMissionService} from '../../../../../../controller/service/PieceJointeMission.service';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {MissionService} from '../../../../../../controller/service/Mission.service';
@Component({
  selector: 'app-piece-jointe-mission-create-chercheur',
  templateUrl: './piece-jointe-mission-create-chercheur.component.html',
  styleUrls: ['./piece-jointe-mission-create-chercheur.component.css']
})
export class PieceJointeMissionCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validMissionDateDebut = true;
    _validMissionVille = true;



constructor(private datePipe: DatePipe, private pieceJointeMissionService: PieceJointeMissionService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private missionService :MissionService
) {

}


// methods
ngOnInit(): void {

    this.selectedMission = new MissionVo();
    this.missionService.findAll().subscribe((data) => this.missions = data);
}




private setValidation(value : boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.pieceJointeMissionService.save().subscribe(pieceJointeMission=>{
       this.pieceJointeMissions.push({...pieceJointeMission});
       this.createPieceJointeMissionDialog = false;
       this.submitted = false;
       this.selectedPieceJointeMission = new PieceJointeMissionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }















//openPopup
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

hideCreateDialog(){
    this.createPieceJointeMissionDialog  = false;
    this.setValidation(true);
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

   get createPieceJointeMissionDialog(): boolean {
           return this.pieceJointeMissionService.createPieceJointeMissionDialog;

       }
    set createPieceJointeMissionDialog(value: boolean) {
        this.pieceJointeMissionService.createPieceJointeMissionDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validMissionDateDebut(): boolean {
    return this._validMissionDateDebut;
    }

    set validMissionDateDebut(value: boolean) {
    this._validMissionDateDebut = value;
    }
    get validMissionVille(): boolean {
    return this._validMissionVille;
    }

    set validMissionVille(value: boolean) {
    this._validMissionVille = value;
    }

}
