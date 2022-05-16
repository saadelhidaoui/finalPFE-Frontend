import {Component, OnInit} from '@angular/core';
import {PieceJointeProjetService} from '../../../../../../controller/service/PieceJointeProjet.service';
import {PieceJointeProjetVo} from '../../../../../../controller/model/PieceJointeProjet.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ProjetVo} from '../../../../../../controller/model/Projet.model';
import {ProjetService} from '../../../../../../controller/service/Projet.service';

@Component({
  selector: 'app-piece-jointe-projet-view-adherent',
  templateUrl: './piece-jointe-projet-view-adherent.component.html',
  styleUrls: ['./piece-jointe-projet-view-adherent.component.css']
})
export class PieceJointeProjetViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeProjetService: PieceJointeProjetService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private projetService :ProjetService
) {
}

// methods
ngOnInit(): void {
    this.selectedProjet = new ProjetVo();
    this.projetService.findAll().subscribe((data) => this.projets = data);
}

hideViewDialog(){
    this.viewPieceJointeProjetDialog  = false;
}

// getters and setters

get pieceJointeProjets(): Array<PieceJointeProjetVo> {
    return this.pieceJointeProjetService.pieceJointeProjets;
       }
set pieceJointeProjets(value: Array<PieceJointeProjetVo>) {
        this.pieceJointeProjetService.pieceJointeProjets = value;
       }

 get selectedPieceJointeProjet():PieceJointeProjetVo {
           return this.pieceJointeProjetService.selectedPieceJointeProjet;
       }
    set selectedPieceJointeProjet(value: PieceJointeProjetVo) {
        this.pieceJointeProjetService.selectedPieceJointeProjet = value;
       }

   get viewPieceJointeProjetDialog():boolean {
           return this.pieceJointeProjetService.viewPieceJointeProjetDialog;

       }
    set viewPieceJointeProjetDialog(value: boolean) {
        this.pieceJointeProjetService.viewPieceJointeProjetDialog= value;
       }

       get selectedProjet():ProjetVo {
           return this.projetService.selectedProjet;
       }
      set selectedProjet(value: ProjetVo) {
        this.projetService.selectedProjet = value;
       }
       get projets():Array<ProjetVo> {
           return this.projetService.projets;
       }
       set projets(value: Array<ProjetVo>) {
        this.projetService.projets = value;
       }
       get editProjetDialog():boolean {
           return this.projetService.editProjetDialog;
       }
      set editProjetDialog(value: boolean) {
        this.projetService.editProjetDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
