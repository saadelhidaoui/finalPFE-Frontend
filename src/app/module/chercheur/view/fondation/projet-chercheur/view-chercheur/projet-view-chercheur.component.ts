import {Component, OnInit} from '@angular/core';
import {ProjetService} from '../../../../../../controller/service/Projet.service';
import {ProjetVo} from '../../../../../../controller/model/Projet.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PieceJointeProjetVo} from '../../../../../../controller/model/PieceJointeProjet.model';
import {PieceJointeProjetService} from '../../../../../../controller/service/PieceJointeProjet.service';
import {EtatProjetVo} from '../../../../../../controller/model/EtatProjet.model';
import {EtatProjetService} from '../../../../../../controller/service/EtatProjet.service';

@Component({
  selector: 'app-projet-view-chercheur',
  templateUrl: './projet-view-chercheur.component.html',
  styleUrls: ['./projet-view-chercheur.component.css']
})
export class ProjetViewChercheurComponent implements OnInit {

        selectedPieceJointeProjets: PieceJointeProjetVo = new PieceJointeProjetVo();
        pieceJointeProjetsListe: Array<PieceJointeProjetVo> = [];



constructor(private datePipe: DatePipe, private projetService: ProjetService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private pieceJointeProjetService :PieceJointeProjetService
    ,private etatProjetService :EtatProjetService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtatProjet = new EtatProjetVo();
    this.etatProjetService.findAll().subscribe((data) => this.etatProjets = data);
}

hideViewDialog(){
    this.viewProjetDialog  = false;
}

// getters and setters

get projets(): Array<ProjetVo> {
    return this.projetService.projets;
       }
set projets(value: Array<ProjetVo>) {
        this.projetService.projets = value;
       }

 get selectedProjet():ProjetVo {
           return this.projetService.selectedProjet;
       }
    set selectedProjet(value: ProjetVo) {
        this.projetService.selectedProjet = value;
       }

   get viewProjetDialog():boolean {
           return this.projetService.viewProjetDialog;

       }
    set viewProjetDialog(value: boolean) {
        this.projetService.viewProjetDialog= value;
       }

       get selectedEtatProjet():EtatProjetVo {
           return this.etatProjetService.selectedEtatProjet;
       }
      set selectedEtatProjet(value: EtatProjetVo) {
        this.etatProjetService.selectedEtatProjet = value;
       }
       get etatProjets():Array<EtatProjetVo> {
           return this.etatProjetService.etatProjets;
       }
       set etatProjets(value: Array<EtatProjetVo>) {
        this.etatProjetService.etatProjets = value;
       }
       get editEtatProjetDialog():boolean {
           return this.etatProjetService.editEtatProjetDialog;
       }
      set editEtatProjetDialog(value: boolean) {
        this.etatProjetService.editEtatProjetDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
