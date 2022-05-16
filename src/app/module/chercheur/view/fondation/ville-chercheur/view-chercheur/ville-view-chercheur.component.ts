import {Component, OnInit} from '@angular/core';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {MissionService} from '../../../../../../controller/service/Mission.service';
import {RegionVo} from '../../../../../../controller/model/Region.model';
import {RegionService} from '../../../../../../controller/service/Region.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';

@Component({
  selector: 'app-ville-view-chercheur',
  templateUrl: './ville-view-chercheur.component.html',
  styleUrls: ['./ville-view-chercheur.component.css']
})
export class VilleViewChercheurComponent implements OnInit {

        selectedMissions: MissionVo = new MissionVo();
        missionsListe: Array<MissionVo> = [];

        myModerateurs: Array<ModerateurVo> = [];


constructor(private datePipe: DatePipe, private villeService: VilleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private missionService :MissionService
    ,private regionService :RegionService
    ,private moderateurService :ModerateurService
) {
}

// methods
ngOnInit(): void {
                this.selectedMissions.moderateurVo = new ModerateurVo();
                this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
    this.selectedRegion = new RegionVo();
    this.regionService.findAll().subscribe((data) => this.regions = data);
}

hideViewDialog(){
    this.viewVilleDialog  = false;
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

   get viewVilleDialog():boolean {
           return this.villeService.viewVilleDialog;

       }
    set viewVilleDialog(value: boolean) {
        this.villeService.viewVilleDialog= value;
       }

       get selectedRegion():RegionVo {
           return this.regionService.selectedRegion;
       }
      set selectedRegion(value: RegionVo) {
        this.regionService.selectedRegion = value;
       }
       get regions():Array<RegionVo> {
           return this.regionService.regions;
       }
       set regions(value: Array<RegionVo>) {
        this.regionService.regions = value;
       }
       get editRegionDialog():boolean {
           return this.regionService.editRegionDialog;
       }
      set editRegionDialog(value: boolean) {
        this.regionService.editRegionDialog= value;
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
