import {Component, OnInit} from '@angular/core';
import {TacheService} from '../../../../../../controller/service/Tache.service';
import {TacheVo} from '../../../../../../controller/model/Tache.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
import {EtatTacheService} from '../../../../../../controller/service/EtatTache.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';

@Component({
  selector: 'app-tache-view-chercheur',
  templateUrl: './tache-view-chercheur.component.html',
  styleUrls: ['./tache-view-chercheur.component.css']
})
export class TacheViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private tacheService: TacheService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatTacheService :EtatTacheService
    ,private moderateurService :ModerateurService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtatTache = new EtatTacheVo();
    this.etatTacheService.findAll().subscribe((data) => this.etatTaches = data);
    this.selectedModerateur = new ModerateurVo();
    this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
}

hideViewDialog(){
    this.viewTacheDialog  = false;
}

// getters and setters

get taches(): Array<TacheVo> {
    return this.tacheService.taches;
       }
set taches(value: Array<TacheVo>) {
        this.tacheService.taches = value;
       }

 get selectedTache():TacheVo {
           return this.tacheService.selectedTache;
       }
    set selectedTache(value: TacheVo) {
        this.tacheService.selectedTache = value;
       }

   get viewTacheDialog():boolean {
           return this.tacheService.viewTacheDialog;

       }
    set viewTacheDialog(value: boolean) {
        this.tacheService.viewTacheDialog= value;
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
