import {Component, OnInit, Input} from '@angular/core';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {MissionService} from '../../../../../../controller/service/Mission.service';
import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
import {EtatTacheService} from '../../../../../../controller/service/EtatTache.service';
import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
import {SituationModerateurService} from '../../../../../../controller/service/SituationModerateur.service';
import {PieceJointeMissionVo} from '../../../../../../controller/model/PieceJointeMission.model';
import {PieceJointeMissionService} from '../../../../../../controller/service/PieceJointeMission.service';
import {TacheVo} from '../../../../../../controller/model/Tache.model';
import {TacheService} from '../../../../../../controller/service/Tache.service';
import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import {ProfilService} from '../../../../../../controller/service/Profil.service';
@Component({
  selector: 'app-moderateur-create-adherent',
  templateUrl: './moderateur-create-adherent.component.html',
  styleUrls: ['./moderateur-create-adherent.component.css']
})
export class ModerateurCreateAdherentComponent implements OnInit {

        selectedMissions: MissionVo = new MissionVo();
        selectedTaches: TacheVo = new TacheVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validModerateurSituationModerateur = true;
   _validModerateurProfil = true;

    _validSituationModerateurLibelle = true;
    _validProfilGrade = true;
    _validProfilEchelle = true;
    _validMissionDateDebut = true;
    _validMissionVille = true;
    _validTacheDateTache = true;
    _validTacheDescription = true;
    _validTacheEtatTache = true;
    _validTacheModerateur = true;



constructor(private datePipe: DatePipe, private moderateurService: ModerateurService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private situationModerateurService :SituationModerateurService
,       private tacheService :TacheService
,       private villeService :VilleService
,       private missionService :MissionService
,       private etatTacheService :EtatTacheService
,       private profilService :ProfilService
) {

}


// methods
ngOnInit(): void {


                this.selectedMissions.villeVo = new VilleVo();
                this.villeService.findAll().subscribe((data) => this.villes = data);



                this.selectedTaches.etatTacheVo = new EtatTacheVo();
                this.etatTacheService.findAll().subscribe((data) => this.etatTaches = data);


    this.selectedSituationModerateur = new SituationModerateurVo();
    this.situationModerateurService.findAll().subscribe((data) => this.situationModerateurs = data);
    this.selectedProfil = new ProfilVo();
    this.profilService.findAll().subscribe((data) => this.profils = data);
}


    validateMissions(){
    this.errorMessages = new Array();
    this.validateMissionDateDebut();
    this.validateMissionVille();
    }
    validateTaches(){
    this.errorMessages = new Array();
    this.validateTacheDateTache();
    this.validateTacheDescription();
    this.validateTacheEtatTache();
    this.validateTacheModerateur();
    }


private setValidation(value : boolean){
    this.validModerateurSituationModerateur = value;
    this.validModerateurProfil = value;
    this.validMissionDateDebut = value;
    this.validMissionVille = value;
    this.validTacheDateTache = value;
    this.validTacheDescription = value;
    this.validTacheEtatTache = value;
    this.validTacheModerateur = value;
    }

        addMissions() {
        if( this.selectedModerateur.missionsVo == null ){
            this.selectedModerateur.missionsVo = new Array<MissionVo>();
        }
       this.validateMissions();
       if (this.errorMessages.length === 0) {
              this.selectedModerateur.missionsVo.push(this.selectedMissions);
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
        this.selectedModerateur.missionsVo.forEach((element, index) => {
            if (element === p) { this.selectedModerateur.missionsVo.splice(index, 1); }
        });
    }
        addTaches() {
        if( this.selectedModerateur.tachesVo == null ){
            this.selectedModerateur.tachesVo = new Array<TacheVo>();
        }
       this.validateTaches();
       if (this.errorMessages.length === 0) {
              this.selectedModerateur.tachesVo.push(this.selectedTaches);
              this.selectedTaches = new TacheVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteTaches(p: TacheVo) {
        this.selectedModerateur.tachesVo.forEach((element, index) => {
            if (element === p) { this.selectedModerateur.tachesVo.splice(index, 1); }
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
     this.moderateurService.save().subscribe(moderateur=>{
       this.moderateurs.push({...moderateur});
       this.createModerateurDialog = false;
       this.submitted = false;
       this.selectedModerateur = new ModerateurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateModerateurSituationModerateur();
this.validateModerateurProfil();

    }

private validateModerateurSituationModerateur(){
        if (this.stringUtilService.isEmpty(this.selectedModerateur.situationModerateurVo)) {
            this.errorMessages.push('Situation moderateur non valide');
            this.validModerateurSituationModerateur = false;
        } else {
            this.validModerateurSituationModerateur = true;
        }
    }
private validateModerateurProfil(){
        if (this.stringUtilService.isEmpty(this.selectedModerateur.profilVo)) {
            this.errorMessages.push('Profil non valide');
            this.validModerateurProfil = false;
        } else {
            this.validModerateurProfil = true;
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
















            private validateTacheDateTache(){
            if (this.selectedTaches.dateTache == null) {
            this.errorMessages.push('DateTache de la tache est  invalide');
             this.validTacheDateTache = false;
            } else {
            this.validTacheDateTache = true;
            }
            }

            private validateTacheDescription(){
            if (this.selectedTaches.description == null) {
            this.errorMessages.push('Description de la tache est  invalide');
             this.validTacheDescription = false;
            } else {
            this.validTacheDescription = true;
            }
            }

            private validateTacheEtatTache(){
            if (this.selectedTaches.etatTacheVo == null) {
            this.errorMessages.push('EtatTache de la tache est  invalide');
             this.validTacheEtatTache = false;
            } else {
            this.validTacheEtatTache = true;
            }
            }

            private validateTacheModerateur(){
            if (this.selectedTaches.moderateurVo == null) {
            this.errorMessages.push('Moderateur de la tache est  invalide');
             this.validTacheModerateur = false;
            } else {
            this.validTacheModerateur = true;
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
              public async openCreateetatTache(etatTache: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatTache', 'add');
                       if(isPermistted){
         this.selectedEtatTache = new EtatTacheVo();
        this.createEtatTacheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesituationModerateur(situationModerateur: string) {
                      const isPermistted = await this.roleService.isPermitted('SituationModerateur', 'add');
                       if(isPermistted){
         this.selectedSituationModerateur = new SituationModerateurVo();
        this.createSituationModerateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateprofil(profil: string) {
                      const isPermistted = await this.roleService.isPermitted('Profil', 'add');
                       if(isPermistted){
         this.selectedProfil = new ProfilVo();
        this.createProfilDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createModerateurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get moderateurs(): Array<ModerateurVo> {
    return this.moderateurService.moderateurs;
       }
set moderateurs(value: Array<ModerateurVo>) {
        this.moderateurService.moderateurs = value;
       }

 get selectedModerateur():ModerateurVo {
           return this.moderateurService.selectedModerateur;
       }
    set selectedModerateur(value: ModerateurVo) {
        this.moderateurService.selectedModerateur = value;
       }

   get createModerateurDialog(): boolean {
           return this.moderateurService.createModerateurDialog;

       }
    set createModerateurDialog(value: boolean) {
        this.moderateurService.createModerateurDialog= value;
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
       get selectedEtatTache(): EtatTacheVo {
           return this.etatTacheService.selectedEtatTache;
       }
      set selectedEtatTache(value: EtatTacheVo) {
        this.etatTacheService.selectedEtatTache = value;
       }
       get etatTaches(): Array<EtatTacheVo> {
           return this.etatTacheService.etatTaches;
       }
       set etatTaches(value: Array<EtatTacheVo>) {
        this.etatTacheService.etatTaches = value;
       }
       get createEtatTacheDialog(): boolean {
           return this.etatTacheService.createEtatTacheDialog;
       }
      set createEtatTacheDialog(value: boolean) {
        this.etatTacheService.createEtatTacheDialog= value;
       }
       get selectedSituationModerateur(): SituationModerateurVo {
           return this.situationModerateurService.selectedSituationModerateur;
       }
      set selectedSituationModerateur(value: SituationModerateurVo) {
        this.situationModerateurService.selectedSituationModerateur = value;
       }
       get situationModerateurs(): Array<SituationModerateurVo> {
           return this.situationModerateurService.situationModerateurs;
       }
       set situationModerateurs(value: Array<SituationModerateurVo>) {
        this.situationModerateurService.situationModerateurs = value;
       }
       get createSituationModerateurDialog(): boolean {
           return this.situationModerateurService.createSituationModerateurDialog;
       }
      set createSituationModerateurDialog(value: boolean) {
        this.situationModerateurService.createSituationModerateurDialog= value;
       }
       get selectedProfil(): ProfilVo {
           return this.profilService.selectedProfil;
       }
      set selectedProfil(value: ProfilVo) {
        this.profilService.selectedProfil = value;
       }
       get profils(): Array<ProfilVo> {
           return this.profilService.profils;
       }
       set profils(value: Array<ProfilVo>) {
        this.profilService.profils = value;
       }
       get createProfilDialog(): boolean {
           return this.profilService.createProfilDialog;
       }
      set createProfilDialog(value: boolean) {
        this.profilService.createProfilDialog= value;
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

    get validSituationModerateurLibelle(): boolean {
    return this._validSituationModerateurLibelle;
    }

    set validSituationModerateurLibelle(value: boolean) {
    this._validSituationModerateurLibelle = value;
    }
    get validProfilGrade(): boolean {
    return this._validProfilGrade;
    }

    set validProfilGrade(value: boolean) {
    this._validProfilGrade = value;
    }
    get validProfilEchelle(): boolean {
    return this._validProfilEchelle;
    }

    set validProfilEchelle(value: boolean) {
    this._validProfilEchelle = value;
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
    get validTacheDateTache(): boolean {
    return this._validTacheDateTache;
    }

    set validTacheDateTache(value: boolean) {
    this._validTacheDateTache = value;
    }
    get validTacheDescription(): boolean {
    return this._validTacheDescription;
    }

    set validTacheDescription(value: boolean) {
    this._validTacheDescription = value;
    }
    get validTacheEtatTache(): boolean {
    return this._validTacheEtatTache;
    }

    set validTacheEtatTache(value: boolean) {
    this._validTacheEtatTache = value;
    }
    get validTacheModerateur(): boolean {
    return this._validTacheModerateur;
    }

    set validTacheModerateur(value: boolean) {
    this._validTacheModerateur = value;
    }

}
