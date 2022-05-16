import {Component, OnInit} from '@angular/core';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';
import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {PieceJointeReclamationVo} from '../../../../../../controller/model/PieceJointeReclamation.model';
import {PieceJointeReclamationService} from '../../../../../../controller/service/PieceJointeReclamation.service';
import {EtatReclamationVo} from '../../../../../../controller/model/EtatReclamation.model';
import {EtatReclamationService} from '../../../../../../controller/service/EtatReclamation.service';

@Component({
  selector: 'app-reclamation-view-adherent',
  templateUrl: './reclamation-view-adherent.component.html',
  styleUrls: ['./reclamation-view-adherent.component.css']
})
export class ReclamationViewAdherentComponent implements OnInit {

        selectedPieceJointeReclamations: PieceJointeReclamationVo = new PieceJointeReclamationVo();
        pieceJointeReclamationsListe: Array<PieceJointeReclamationVo> = [];



constructor(private datePipe: DatePipe, private reclamationService: ReclamationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private adherentService :AdherentService
    ,private pieceJointeReclamationService :PieceJointeReclamationService
    ,private etatReclamationService :EtatReclamationService
) {
}

// methods
ngOnInit(): void {
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
    this.selectedEtatReclamation = new EtatReclamationVo();
    this.etatReclamationService.findAll().subscribe((data) => this.etatReclamations = data);
}

hideViewDialog(){
    this.viewReclamationDialog  = false;
}

// getters and setters

get reclamations(): Array<ReclamationVo> {
    return this.reclamationService.reclamations;
       }
set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }

 get selectedReclamation():ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }

   get viewReclamationDialog():boolean {
           return this.reclamationService.viewReclamationDialog;

       }
    set viewReclamationDialog(value: boolean) {
        this.reclamationService.viewReclamationDialog= value;
       }

       get selectedAdherent():AdherentVo {
           return this.adherentService.selectedAdherent;
       }
      set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }
       get adherents():Array<AdherentVo> {
           return this.adherentService.adherents;
       }
       set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }
       get editAdherentDialog():boolean {
           return this.adherentService.editAdherentDialog;
       }
      set editAdherentDialog(value: boolean) {
        this.adherentService.editAdherentDialog= value;
       }
       get selectedEtatReclamation():EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
      set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }
       get etatReclamations():Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamations;
       }
       set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }
       get editEtatReclamationDialog():boolean {
           return this.etatReclamationService.editEtatReclamationDialog;
       }
      set editEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.editEtatReclamationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
