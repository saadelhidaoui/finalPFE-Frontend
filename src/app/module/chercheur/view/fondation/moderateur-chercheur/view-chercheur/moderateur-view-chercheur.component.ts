import {Component, OnInit} from '@angular/core';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-moderateur-view-chercheur',
  templateUrl: './moderateur-view-chercheur.component.html',
  styleUrls: ['./moderateur-view-chercheur.component.css']
})
export class ModerateurViewChercheurComponent implements OnInit {

        selectedMissions: MissionVo = new MissionVo();
        missionsListe: Array<MissionVo> = [];

        myVilles: Array<VilleVo> = [];

        selectedTaches: TacheVo = new TacheVo();
        tachesListe: Array<TacheVo> = [];

        myEtatTaches: Array<EtatTacheVo> = [];


constructor(private datePipe: DatePipe, private moderateurService: ModerateurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private villeService :VilleService
    ,private etatTacheService :EtatTacheService
    ,private profilService :ProfilService
    ,private situationModerateurService :SituationModerateurService
    ,private missionService :MissionService
    ,private tacheService :TacheService
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

hideViewDialog(){
    this.viewModerateurDialog  = false;
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

   get viewModerateurDialog():boolean {
           return this.moderateurService.viewModerateurDialog;

       }
    set viewModerateurDialog(value: boolean) {
        this.moderateurService.viewModerateurDialog= value;
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
       get selectedEtatTache():EtatTacheVo {
           return this.etatTacheService.selectedEtatTache;
       }
      set selectedEtatTache(value: EtatTacheVo) {
        this.etatTacheService.selectedEtatTache = value;
       }
       get etatTaches():Array<EtatTacheVo> {
           return this.etatTacheService.etatTaches;
       }
       set etatTaches(value: Array<EtatTacheVo>) {
        this.etatTacheService.etatTaches = value;
       }
       get editEtatTacheDialog():boolean {
           return this.etatTacheService.editEtatTacheDialog;
       }
      set editEtatTacheDialog(value: boolean) {
        this.etatTacheService.editEtatTacheDialog= value;
       }
       get selectedSituationModerateur():SituationModerateurVo {
           return this.situationModerateurService.selectedSituationModerateur;
       }
      set selectedSituationModerateur(value: SituationModerateurVo) {
        this.situationModerateurService.selectedSituationModerateur = value;
       }
       get situationModerateurs():Array<SituationModerateurVo> {
           return this.situationModerateurService.situationModerateurs;
       }
       set situationModerateurs(value: Array<SituationModerateurVo>) {
        this.situationModerateurService.situationModerateurs = value;
       }
       get editSituationModerateurDialog():boolean {
           return this.situationModerateurService.editSituationModerateurDialog;
       }
      set editSituationModerateurDialog(value: boolean) {
        this.situationModerateurService.editSituationModerateurDialog= value;
       }
       get selectedProfil():ProfilVo {
           return this.profilService.selectedProfil;
       }
      set selectedProfil(value: ProfilVo) {
        this.profilService.selectedProfil = value;
       }
       get profils():Array<ProfilVo> {
           return this.profilService.profils;
       }
       set profils(value: Array<ProfilVo>) {
        this.profilService.profils = value;
       }
       get editProfilDialog():boolean {
           return this.profilService.editProfilDialog;
       }
      set editProfilDialog(value: boolean) {
        this.profilService.editProfilDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
