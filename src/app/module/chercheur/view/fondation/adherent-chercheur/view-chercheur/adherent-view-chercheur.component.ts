import {Component, OnInit} from '@angular/core';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {StatutVo} from '../../../../../../controller/model/Statut.model';
import {StatutService} from '../../../../../../controller/service/Statut.service';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';
import {EtatCarteVo} from '../../../../../../controller/model/EtatCarte.model';
import {EtatCarteService} from '../../../../../../controller/service/EtatCarte.service';
import {FonctionVo} from '../../../../../../controller/model/Fonction.model';
import {FonctionService} from '../../../../../../controller/service/Fonction.service';
import {EnfantVo} from '../../../../../../controller/model/Enfant.model';
import {EnfantService} from '../../../../../../controller/service/Enfant.service';
import {ConjointVo} from '../../../../../../controller/model/Conjoint.model';
import {ConjointService} from '../../../../../../controller/service/Conjoint.service';
import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';
import {PieceJointeAdherentVo} from '../../../../../../controller/model/PieceJointeAdherent.model';
import {PieceJointeAdherentService} from '../../../../../../controller/service/PieceJointeAdherent.service';

@Component({
  selector: 'app-adherent-view-chercheur',
  templateUrl: './adherent-view-chercheur.component.html',
  styleUrls: ['./adherent-view-chercheur.component.css']
})
export class AdherentViewChercheurComponent implements OnInit {

        selectedConjoints: ConjointVo = new ConjointVo();
        conjointsListe: Array<ConjointVo> = [];

        myQualites: Array<QualiteVo> = [];

        selectedEnfants: EnfantVo = new EnfantVo();
        enfantsListe: Array<EnfantVo> = [];


        selectedPieceJointeAdherents: PieceJointeAdherentVo = new PieceJointeAdherentVo();
        pieceJointeAdherentsListe: Array<PieceJointeAdherentVo> = [];



constructor(private datePipe: DatePipe, private adherentService: AdherentService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private statutService :StatutService
    ,private qualiteService :QualiteService
    ,private etatCarteService :EtatCarteService
    ,private fonctionService :FonctionService
    ,private enfantService :EnfantService
    ,private conjointService :ConjointService
    ,private villeService :VilleService
    ,private pieceJointeAdherentService :PieceJointeAdherentService
) {
}

// methods
ngOnInit(): void {
                this.selectedConjoints.qualiteVo = new QualiteVo();
                this.qualiteService.findAll().subscribe((data) => this.qualites = data);
                this.selectedEnfants.qualiteVo = new QualiteVo();
                this.qualiteService.findAll().subscribe((data) => this.qualites = data);
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedQualite = new QualiteVo();
    this.qualiteService.findAll().subscribe((data) => this.qualites = data);
    this.selectedEtatCarte = new EtatCarteVo();
    this.etatCarteService.findAll().subscribe((data) => this.etatCartes = data);
    this.selectedStatut = new StatutVo();
    this.statutService.findAll().subscribe((data) => this.statuts = data);
    this.selectedFonction = new FonctionVo();
    this.fonctionService.findAll().subscribe((data) => this.fonctions = data);
}

hideViewDialog(){
    this.viewAdherentDialog  = false;
}

// getters and setters

get adherents(): Array<AdherentVo> {
    return this.adherentService.adherents;
       }
set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }

 get selectedAdherent():AdherentVo {
           return this.adherentService.selectedAdherent;
       }
    set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }

   get viewAdherentDialog():boolean {
           return this.adherentService.viewAdherentDialog;

       }
    set viewAdherentDialog(value: boolean) {
        this.adherentService.viewAdherentDialog= value;
       }

       get selectedQualite():QualiteVo {
           return this.qualiteService.selectedQualite;
       }
      set selectedQualite(value: QualiteVo) {
        this.qualiteService.selectedQualite = value;
       }
       get qualites():Array<QualiteVo> {
           return this.qualiteService.qualites;
       }
       set qualites(value: Array<QualiteVo>) {
        this.qualiteService.qualites = value;
       }
       get editQualiteDialog():boolean {
           return this.qualiteService.editQualiteDialog;
       }
      set editQualiteDialog(value: boolean) {
        this.qualiteService.editQualiteDialog= value;
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
       get selectedEtatCarte():EtatCarteVo {
           return this.etatCarteService.selectedEtatCarte;
       }
      set selectedEtatCarte(value: EtatCarteVo) {
        this.etatCarteService.selectedEtatCarte = value;
       }
       get etatCartes():Array<EtatCarteVo> {
           return this.etatCarteService.etatCartes;
       }
       set etatCartes(value: Array<EtatCarteVo>) {
        this.etatCarteService.etatCartes = value;
       }
       get editEtatCarteDialog():boolean {
           return this.etatCarteService.editEtatCarteDialog;
       }
      set editEtatCarteDialog(value: boolean) {
        this.etatCarteService.editEtatCarteDialog= value;
       }
       get selectedFonction():FonctionVo {
           return this.fonctionService.selectedFonction;
       }
      set selectedFonction(value: FonctionVo) {
        this.fonctionService.selectedFonction = value;
       }
       get fonctions():Array<FonctionVo> {
           return this.fonctionService.fonctions;
       }
       set fonctions(value: Array<FonctionVo>) {
        this.fonctionService.fonctions = value;
       }
       get editFonctionDialog():boolean {
           return this.fonctionService.editFonctionDialog;
       }
      set editFonctionDialog(value: boolean) {
        this.fonctionService.editFonctionDialog= value;
       }
       get selectedStatut():StatutVo {
           return this.statutService.selectedStatut;
       }
      set selectedStatut(value: StatutVo) {
        this.statutService.selectedStatut = value;
       }
       get statuts():Array<StatutVo> {
           return this.statutService.statuts;
       }
       set statuts(value: Array<StatutVo>) {
        this.statutService.statuts = value;
       }
       get editStatutDialog():boolean {
           return this.statutService.editStatutDialog;
       }
      set editStatutDialog(value: boolean) {
        this.statutService.editStatutDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
