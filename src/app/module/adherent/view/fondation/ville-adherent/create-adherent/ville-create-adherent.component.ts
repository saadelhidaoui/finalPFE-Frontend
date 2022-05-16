import {Component, OnInit, Input} from '@angular/core';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {RegionVo} from '../../../../../../controller/model/Region.model';
import {RegionService} from '../../../../../../controller/service/Region.service';
import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {MissionService} from '../../../../../../controller/service/Mission.service';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import {PieceJointeMissionService} from '../../../../../../controller/service/PieceJointeMission.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
@Component({
  selector: 'app-ville-create-adherent',
  templateUrl: './ville-create-adherent.component.html',
  styleUrls: ['./ville-create-adherent.component.css']
})
export class VilleCreateAdherentComponent implements OnInit {

        selectedMissions: MissionVo = new MissionVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validVilleRegion = true;

    _validMissionDateDebut = true;
    _validMissionVille = true;



constructor(private datePipe: DatePipe, private villeService: VilleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private moderateurService :ModerateurService
,       private regionService :RegionService
,       private missionService :MissionService
) {

}


// methods
ngOnInit(): void {


                this.selectedMissions.moderateurVo = new ModerateurVo();
                this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);


    this.selectedRegion = new RegionVo();
    this.regionService.findAll().subscribe((data) => this.regions = data);
}


    validateMissions(){
    this.errorMessages = new Array();
    this.validateMissionDateDebut();
    this.validateMissionVille();
    }


private setValidation(value : boolean){
    this.validMissionDateDebut = value;
    this.validMissionVille = value;
    this.validVilleRegion = value;
    }

        addMissions() {
        if( this.selectedVille.missionsVo == null ){
            this.selectedVille.missionsVo = new Array<MissionVo>();
        }
       this.validateMissions();
       if (this.errorMessages.length === 0) {
              this.selectedVille.missionsVo.push(this.selectedMissions);
              this.selectedMissions = new MissionVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteMissions(p: MissionVo) {
        this.selectedVille.missionsVo.forEach((element, index) => {
            if (element === p) { this.selectedVille.missionsVo.splice(index, 1); }
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
     this.villeService.save().subscribe(ville=>{
       this.villes.push({...ville});
       this.createVilleDialog = false;
       this.submitted = false;
       this.selectedVille = new VilleVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateVilleRegion();

    }

private validateVilleRegion(){
        if (this.stringUtilService.isEmpty(this.selectedVille.regionVo)) {
            this.errorMessages.push('Region non valide');
            this.validVilleRegion = false;
        } else {
            this.validVilleRegion = true;
        }
    }








            private validateMissionDateDebut(){
            if (this.selectedMissions.dateDebut == null) {
            this.errorMessages.push('DateDebut de la mission est  invalide');
             this.validMissionDateDebut = false;
            } else {
            this.validMissionDateDebut = true;
            }
            }


            private validateMissionVille(){
            if (this.selectedMissions.villeVo == null) {
            this.errorMessages.push('Ville de la mission est  invalide');
             this.validMissionVille = false;
            } else {
            this.validMissionVille = true;
            }
            }















//openPopup
              public async openCreateregion(region: string) {
                      const isPermistted = await this.roleService.isPermitted('Region', 'add');
                       if(isPermistted){
         this.selectedRegion = new RegionVo();
        this.createRegionDialog = true;
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
    this.createVilleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get villes(): Array<VilleVo> {
    return this.villeService.villes;
       }
set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }

 get selectedVille():VilleVo {
           return this.villeService.selectedVille;
       }
    set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }

   get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;

       }
    set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
       }

       get selectedRegion(): RegionVo {
           return this.regionService.selectedRegion;
       }
      set selectedRegion(value: RegionVo) {
        this.regionService.selectedRegion = value;
       }
       get regions(): Array<RegionVo> {
           return this.regionService.regions;
       }
       set regions(value: Array<RegionVo>) {
        this.regionService.regions = value;
       }
       get createRegionDialog(): boolean {
           return this.regionService.createRegionDialog;
       }
      set createRegionDialog(value: boolean) {
        this.regionService.createRegionDialog= value;
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

    get validVilleRegion(): boolean {
    return this._validVilleRegion;
    }

    set validVilleRegion(value: boolean) {
    this._validVilleRegion = value;
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
