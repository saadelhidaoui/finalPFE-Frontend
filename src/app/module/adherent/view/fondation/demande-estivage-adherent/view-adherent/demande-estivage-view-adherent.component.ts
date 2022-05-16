import {Component, OnInit} from '@angular/core';
import {DemandeEstivageService} from '../../../../../../controller/service/DemandeEstivage.service';
import {DemandeEstivageVo} from '../../../../../../controller/model/DemandeEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {EtatDemandeEstivageVo} from '../../../../../../controller/model/EtatDemandeEstivage.model';
import {EtatDemandeEstivageService} from '../../../../../../controller/service/EtatDemandeEstivage.service';
import {PieceJointeEstivageVo} from '../../../../../../controller/model/PieceJointeEstivage.model';
import {PieceJointeEstivageService} from '../../../../../../controller/service/PieceJointeEstivage.service';
import {DemandeEstivageCentreVo} from '../../../../../../controller/model/DemandeEstivageCentre.model';
import {DemandeEstivageCentreService} from '../../../../../../controller/service/DemandeEstivageCentre.service';
import {EstivageCentreEstivageVo} from '../../../../../../controller/model/EstivageCentreEstivage.model';
import {EstivageCentreEstivageService} from '../../../../../../controller/service/EstivageCentreEstivage.service';
import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';

@Component({
  selector: 'app-demande-estivage-view-adherent',
  templateUrl: './demande-estivage-view-adherent.component.html',
  styleUrls: ['./demande-estivage-view-adherent.component.css']
})
export class DemandeEstivageViewAdherentComponent implements OnInit {

        selectedPieceJointeEstivages: PieceJointeEstivageVo = new PieceJointeEstivageVo();
        pieceJointeEstivagesListe: Array<PieceJointeEstivageVo> = [];

        myEstivages: Array<EstivageVo> = [];


constructor(private datePipe: DatePipe, private demandeEstivageService: DemandeEstivageService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private adherentService :AdherentService
    ,private etatDemandeEstivageService :EtatDemandeEstivageService
    ,private pieceJointeEstivageService :PieceJointeEstivageService
    ,private demandeEstivageCentreService :DemandeEstivageCentreService
    ,private estivageCentreEstivageService :EstivageCentreEstivageService
    ,private estivageService :EstivageService
) {
}

// methods
ngOnInit(): void {
                this.selectedPieceJointeEstivages.estivageVo = new EstivageVo();
                this.estivageService.findAll().subscribe((data) => this.estivages = data);
    this.selectedDemandeEstivageCentre = new DemandeEstivageCentreVo();
    this.demandeEstivageCentreService.findAll().subscribe((data) => this.demandeEstivageCentres = data);
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
    this.selectedEtatDemandeEstivage = new EtatDemandeEstivageVo();
    this.etatDemandeEstivageService.findAll().subscribe((data) => this.etatDemandeEstivages = data);
    this.selectedEstivageCentreEstivage = new EstivageCentreEstivageVo();
    this.estivageCentreEstivageService.findAll().subscribe((data) => this.estivageCentreEstivages = data);
}

hideViewDialog(){
    this.viewDemandeEstivageDialog  = false;
}

// getters and setters

get demandeEstivages(): Array<DemandeEstivageVo> {
    return this.demandeEstivageService.demandeEstivages;
       }
set demandeEstivages(value: Array<DemandeEstivageVo>) {
        this.demandeEstivageService.demandeEstivages = value;
       }

 get selectedDemandeEstivage():DemandeEstivageVo {
           return this.demandeEstivageService.selectedDemandeEstivage;
       }
    set selectedDemandeEstivage(value: DemandeEstivageVo) {
        this.demandeEstivageService.selectedDemandeEstivage = value;
       }

   get viewDemandeEstivageDialog():boolean {
           return this.demandeEstivageService.viewDemandeEstivageDialog;

       }
    set viewDemandeEstivageDialog(value: boolean) {
        this.demandeEstivageService.viewDemandeEstivageDialog= value;
       }

       get selectedEstivage():EstivageVo {
           return this.estivageService.selectedEstivage;
       }
      set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
       }
       get estivages():Array<EstivageVo> {
           return this.estivageService.estivages;
       }
       set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }
       get editEstivageDialog():boolean {
           return this.estivageService.editEstivageDialog;
       }
      set editEstivageDialog(value: boolean) {
        this.estivageService.editEstivageDialog= value;
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
       get selectedEstivageCentreEstivage():EstivageCentreEstivageVo {
           return this.estivageCentreEstivageService.selectedEstivageCentreEstivage;
       }
      set selectedEstivageCentreEstivage(value: EstivageCentreEstivageVo) {
        this.estivageCentreEstivageService.selectedEstivageCentreEstivage = value;
       }
       get estivageCentreEstivages():Array<EstivageCentreEstivageVo> {
           return this.estivageCentreEstivageService.estivageCentreEstivages;
       }
       set estivageCentreEstivages(value: Array<EstivageCentreEstivageVo>) {
        this.estivageCentreEstivageService.estivageCentreEstivages = value;
       }
       get editEstivageCentreEstivageDialog():boolean {
           return this.estivageCentreEstivageService.editEstivageCentreEstivageDialog;
       }
      set editEstivageCentreEstivageDialog(value: boolean) {
        this.estivageCentreEstivageService.editEstivageCentreEstivageDialog= value;
       }
       get selectedDemandeEstivageCentre():DemandeEstivageCentreVo {
           return this.demandeEstivageCentreService.selectedDemandeEstivageCentre;
       }
      set selectedDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this.demandeEstivageCentreService.selectedDemandeEstivageCentre = value;
       }
       get demandeEstivageCentres():Array<DemandeEstivageCentreVo> {
           return this.demandeEstivageCentreService.demandeEstivageCentres;
       }
       set demandeEstivageCentres(value: Array<DemandeEstivageCentreVo>) {
        this.demandeEstivageCentreService.demandeEstivageCentres = value;
       }
       get editDemandeEstivageCentreDialog():boolean {
           return this.demandeEstivageCentreService.editDemandeEstivageCentreDialog;
       }
      set editDemandeEstivageCentreDialog(value: boolean) {
        this.demandeEstivageCentreService.editDemandeEstivageCentreDialog= value;
       }
       get selectedEtatDemandeEstivage():EtatDemandeEstivageVo {
           return this.etatDemandeEstivageService.selectedEtatDemandeEstivage;
       }
      set selectedEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this.etatDemandeEstivageService.selectedEtatDemandeEstivage = value;
       }
       get etatDemandeEstivages():Array<EtatDemandeEstivageVo> {
           return this.etatDemandeEstivageService.etatDemandeEstivages;
       }
       set etatDemandeEstivages(value: Array<EtatDemandeEstivageVo>) {
        this.etatDemandeEstivageService.etatDemandeEstivages = value;
       }
       get editEtatDemandeEstivageDialog():boolean {
           return this.etatDemandeEstivageService.editEtatDemandeEstivageDialog;
       }
      set editEtatDemandeEstivageDialog(value: boolean) {
        this.etatDemandeEstivageService.editEtatDemandeEstivageDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
