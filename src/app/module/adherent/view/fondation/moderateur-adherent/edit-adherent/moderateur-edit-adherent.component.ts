import {Component, OnInit} from '@angular/core';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
import {EtatTacheService} from '../../../../../../controller/service/EtatTache.service';
import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import {ProfilService} from '../../../../../../controller/service/Profil.service';
import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
import {SituationModerateurService} from '../../../../../../controller/service/SituationModerateur.service';
import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {MissionService} from '../../../../../../controller/service/Mission.service';
import {TacheVo} from '../../../../../../controller/model/Tache.model';
import {TacheService} from '../../../../../../controller/service/Tache.service';

@Component({
  selector: 'app-moderateur-edit-adherent',
  templateUrl: './moderateur-edit-adherent.component.html',
  styleUrls: ['./moderateur-edit-adherent.component.css']
})
export class ModerateurEditAdherentComponent implements OnInit {

        selectedMissions: MissionVo = new MissionVo();
        missionsListe: Array<MissionVo> = [];

        myVilles: Array<VilleVo> = [];

        selectedTaches: TacheVo = new TacheVo();
        tachesListe: Array<TacheVo> = [];

        myEtatTaches: Array<EtatTacheVo> = [];


constructor(private datePipe: DatePipe, private moderateurService: ModerateurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private villeService: VilleService
 ,       private etatTacheService: EtatTacheService
 ,       private profilService: ProfilService
 ,       private situationModerateurService: SituationModerateurService
 ,       private missionService: MissionService
 ,       private tacheService: TacheService
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
        addMissions() {
        if( this.selectedModerateur.missionsVo == null ){
            this.selectedModerateur.missionsVo = new Array<MissionVo>();
        }
        this.selectedModerateur.missionsVo.push(this.selectedMissions);
        this.selectedMissions = new MissionVo();
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
        this.selectedModerateur.tachesVo.push(this.selectedTaches);
        this.selectedTaches = new TacheVo();
        }

       deleteTaches(p: TacheVo) {
        this.selectedModerateur.tachesVo.forEach((element, index) => {
            if (element === p) { this.selectedModerateur.tachesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedModerateur.createdAt = DateUtils.toDate(this.selectedModerateur.createdAt);
            this.selectedModerateur.updatedAt = DateUtils.toDate(this.selectedModerateur.updatedAt);
    this.moderateurService.edit().subscribe(moderateur=>{
    const myIndex = this.moderateurs.findIndex(e => e.id === this.selectedModerateur.id);
    this.moderateurs[myIndex] = this.selectedModerateur;
    this.editModerateurDialog = false;
    this.selectedModerateur = new ModerateurVo();


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

hideEditDialog(){
    this.editModerateurDialog  = false;
}

// getters and setters

get moderateurs(): Array<ModerateurVo> {
    return this.moderateurService.moderateurs;
       }
set moderateurs(value: Array<ModerateurVo>) {
        this.moderateurService.moderateurs = value;
       }

 get selectedModerateur(): ModerateurVo {
           return this.moderateurService.selectedModerateur;
       }
    set selectedModerateur(value: ModerateurVo) {
        this.moderateurService.selectedModerateur = value;
       }

   get editModerateurDialog(): boolean {
           return this.moderateurService.editModerateurDialog;

       }
    set editModerateurDialog(value: boolean) {
        this.moderateurService.editModerateurDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
