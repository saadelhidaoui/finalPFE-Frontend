import {Component, OnInit, Input} from '@angular/core';
import {MissionService} from '../../../../../../controller/service/Mission.service';
import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import {PieceJointeMissionService} from '../../../../../../controller/service/PieceJointeMission.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
@Component({
  selector: 'app-mission-create-chercheur',
  templateUrl: './mission-create-chercheur.component.html',
  styleUrls: ['./mission-create-chercheur.component.css']
})
export class MissionCreateChercheurComponent implements OnInit {

        selectedPieceJointeMissions: PieceJointeMissionVo = new PieceJointeMissionVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validMissionDateDebut = true;
   _validMissionVille = true;

    _validVilleRegion = true;
    _validModerateurSituationModerateur = true;
    _validModerateurProfil = true;



constructor(private datePipe: DatePipe, private missionService: MissionService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private pieceJointeMissionService :PieceJointeMissionService
,       private moderateurService :ModerateurService
,       private villeService :VilleService
) {

}


// methods
ngOnInit(): void {




    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedModerateur = new ModerateurVo();
    this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
}


    validatePieceJointeMissions(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validMissionDateDebut = value;
    this.validMissionVille = value;
    }

        addPieceJointeMissions() {
        if( this.selectedMission.pieceJointeMissionsVo == null ){
            this.selectedMission.pieceJointeMissionsVo = new Array<PieceJointeMissionVo>();
        }
       this.validatePieceJointeMissions();
       if (this.errorMessages.length === 0) {
              this.selectedMission.pieceJointeMissionsVo.push(this.selectedPieceJointeMissions);
              this.selectedPieceJointeMissions = new PieceJointeMissionVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePieceJointeMissions(p: PieceJointeMissionVo) {
        this.selectedMission.pieceJointeMissionsVo.forEach((element, index) => {
            if (element === p) { this.selectedMission.pieceJointeMissionsVo.splice(index, 1); }
        });
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
     this.missionService.save().subscribe(mission=>{
       this.missions.push({...mission});
       this.createMissionDialog = false;
       this.submitted = false;
       this.selectedMission = new MissionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateMissionDateDebut();
this.validateMissionVille();

    }

private validateMissionDateDebut(){
        if (this.stringUtilService.isEmpty(this.selectedMission.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validMissionDateDebut = false;
        } else {
            this.validMissionDateDebut = true;
        }
    }
private validateMissionVille(){
        if (this.stringUtilService.isEmpty(this.selectedMission.villeVo)) {
            this.errorMessages.push('Ville non valide');
            this.validMissionVille = false;
        } else {
            this.validMissionVille = true;
        }
    }































//openPopup
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

hideCreateDialog(){
    this.createMissionDialog  = false;
    this.setValidation(true);
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

   get createMissionDialog(): boolean {
           return this.missionService.createMissionDialog;

       }
    set createMissionDialog(value: boolean) {
        this.missionService.createMissionDialog= value;
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

    get validVilleRegion(): boolean {
    return this._validVilleRegion;
    }

    set validVilleRegion(value: boolean) {
    this._validVilleRegion = value;
    }
    get validModerateurSituationModerateur(): boolean {
    return this._validModerateurSituationModerateur;
    }

    set validModerateurSituationModerateur(value: boolean) {
    this._validModerateurSituationModerateur = value;
    }
    get validModerateurProfil(): boolean {
    return this._validModerateurProfil;
    }

    set validModerateurProfil(value: boolean) {
    this._validModerateurProfil = value;
    }

}
