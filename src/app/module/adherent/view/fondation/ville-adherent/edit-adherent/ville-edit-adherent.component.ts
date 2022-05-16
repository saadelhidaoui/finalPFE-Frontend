import {Component, OnInit} from '@angular/core';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {MissionService} from '../../../../../../controller/service/Mission.service';
import {RegionVo} from '../../../../../../controller/model/Region.model';
import {RegionService} from '../../../../../../controller/service/Region.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';

@Component({
  selector: 'app-ville-edit-adherent',
  templateUrl: './ville-edit-adherent.component.html',
  styleUrls: ['./ville-edit-adherent.component.css']
})
export class VilleEditAdherentComponent implements OnInit {

        selectedMissions: MissionVo = new MissionVo();
        missionsListe: Array<MissionVo> = [];

        myModerateurs: Array<ModerateurVo> = [];


constructor(private datePipe: DatePipe, private villeService: VilleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private missionService: MissionService
 ,       private regionService: RegionService
 ,       private moderateurService: ModerateurService
) {
}

// methods
ngOnInit(): void {
                this.selectedMissions.moderateurVo = new ModerateurVo();
                this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
    this.selectedRegion = new RegionVo();
    this.regionService.findAll().subscribe((data) => this.regions = data);
}
        addMissions() {
        if( this.selectedVille.missionsVo == null ){
            this.selectedVille.missionsVo = new Array<MissionVo>();
        }
        this.selectedVille.missionsVo.push(this.selectedMissions);
        this.selectedMissions = new MissionVo();
        }

       deleteMissions(p: MissionVo) {
        this.selectedVille.missionsVo.forEach((element, index) => {
            if (element === p) { this.selectedVille.missionsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.villeService.edit().subscribe(ville=>{
    const myIndex = this.villes.findIndex(e => e.id === this.selectedVille.id);
    this.villes[myIndex] = this.selectedVille;
    this.editVilleDialog = false;
    this.selectedVille = new VilleVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editVilleDialog  = false;
}

// getters and setters

get villes(): Array<VilleVo> {
    return this.villeService.villes;
       }
set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }

 get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
    set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }

   get editVilleDialog(): boolean {
           return this.villeService.editVilleDialog;

       }
    set editVilleDialog(value: boolean) {
        this.villeService.editVilleDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
