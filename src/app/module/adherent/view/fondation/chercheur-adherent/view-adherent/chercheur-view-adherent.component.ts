import {Component, OnInit} from '@angular/core';
import {ChercheurService} from '../../../../../../controller/service/Chercheur.service';
import {ChercheurVo} from '../../../../../../controller/model/Chercheur.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import {ProfilService} from '../../../../../../controller/service/Profil.service';
import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
import {SituationModerateurService} from '../../../../../../controller/service/SituationModerateur.service';

@Component({
  selector: 'app-chercheur-view-adherent',
  templateUrl: './chercheur-view-adherent.component.html',
  styleUrls: ['./chercheur-view-adherent.component.css']
})
export class ChercheurViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private profilService :ProfilService
    ,private situationModerateurService :SituationModerateurService
) {
}

// methods
ngOnInit(): void {
    this.selectedSituationModerateur = new SituationModerateurVo();
    this.situationModerateurService.findAll().subscribe((data) => this.situationModerateurs = data);
    this.selectedProfil = new ProfilVo();
    this.profilService.findAll().subscribe((data) => this.profils = data);
}

hideViewDialog(){
    this.viewChercheurDialog  = false;
}

// getters and setters

get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
       }
set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

 get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }

   get viewChercheurDialog():boolean {
           return this.chercheurService.viewChercheurDialog;

       }
    set viewChercheurDialog(value: boolean) {
        this.chercheurService.viewChercheurDialog= value;
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
