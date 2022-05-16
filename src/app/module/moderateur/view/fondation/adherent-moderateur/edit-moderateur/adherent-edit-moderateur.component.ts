import {Component, OnInit} from '@angular/core';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
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
  selector: 'app-adherent-edit-moderateur',
  templateUrl: './adherent-edit-moderateur.component.html',
  styleUrls: ['./adherent-edit-moderateur.component.css']
})
export class AdherentEditModerateurComponent implements OnInit {

        selectedConjoints: ConjointVo = new ConjointVo();
        conjointsListe: Array<ConjointVo> = [];

        myQualites: Array<QualiteVo> = [];

        selectedEnfants: EnfantVo = new EnfantVo();
        enfantsListe: Array<EnfantVo> = [];


        selectedPieceJointeAdherents: PieceJointeAdherentVo = new PieceJointeAdherentVo();
        pieceJointeAdherentsListe: Array<PieceJointeAdherentVo> = [];



constructor(private datePipe: DatePipe, private adherentService: AdherentService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private statutService: StatutService
 ,       private qualiteService: QualiteService
 ,       private etatCarteService: EtatCarteService
 ,       private fonctionService: FonctionService
 ,       private enfantService: EnfantService
 ,       private conjointService: ConjointService
 ,       private villeService: VilleService
 ,       private pieceJointeAdherentService: PieceJointeAdherentService
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
        addConjoints() {
        if( this.selectedAdherent.conjointsVo == null ){
            this.selectedAdherent.conjointsVo = new Array<ConjointVo>();
        }
        this.selectedAdherent.conjointsVo.push(this.selectedConjoints);
        this.selectedConjoints = new ConjointVo();
        }

       deleteConjoints(p: ConjointVo) {
        this.selectedAdherent.conjointsVo.forEach((element, index) => {
            if (element === p) { this.selectedAdherent.conjointsVo.splice(index, 1); }
        });
    }
        addEnfants() {
        if( this.selectedAdherent.enfantsVo == null ){
            this.selectedAdherent.enfantsVo = new Array<EnfantVo>();
        }
        this.selectedAdherent.enfantsVo.push(this.selectedEnfants);
        this.selectedEnfants = new EnfantVo();
        }

       deleteEnfants(p: EnfantVo) {
        this.selectedAdherent.enfantsVo.forEach((element, index) => {
            if (element === p) { this.selectedAdherent.enfantsVo.splice(index, 1); }
        });
    }
        addPieceJointeAdherents() {
        if( this.selectedAdherent.pieceJointeAdherentsVo == null ){
            this.selectedAdherent.pieceJointeAdherentsVo = new Array<PieceJointeAdherentVo>();
        }
        this.selectedAdherent.pieceJointeAdherentsVo.push(this.selectedPieceJointeAdherents);
        this.selectedPieceJointeAdherents = new PieceJointeAdherentVo();
        }

       deletePieceJointeAdherents(p: PieceJointeAdherentVo) {
        this.selectedAdherent.pieceJointeAdherentsVo.forEach((element, index) => {
            if (element === p) { this.selectedAdherent.pieceJointeAdherentsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedAdherent.dateNaissance = DateUtils.toDate(this.selectedAdherent.dateNaissance);
            this.selectedAdherent.dateArrivee = DateUtils.toDate(this.selectedAdherent.dateArrivee);
            this.selectedAdherent.dateReception = DateUtils.toDate(this.selectedAdherent.dateReception);
            this.selectedAdherent.createdAt = DateUtils.toDate(this.selectedAdherent.createdAt);
            this.selectedAdherent.updatedAt = DateUtils.toDate(this.selectedAdherent.updatedAt);
            this.selectedAdherent.dateArchivage = DateUtils.toDate(this.selectedAdherent.dateArchivage);
            this.selectedAdherent.dateCreation = DateUtils.toDate(this.selectedAdherent.dateCreation);
    this.adherentService.edit().subscribe(adherent=>{
    const myIndex = this.adherents.findIndex(e => e.id === this.selectedAdherent.id);
    this.adherents[myIndex] = this.selectedAdherent;
    this.editAdherentDialog = false;
    this.selectedAdherent = new AdherentVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatequalite(qualite: string) {
                      const isPermistted = await this.roleService.isPermitted('Qualite', 'add');
                       if(isPermistted){
         this.selectedQualite = new QualiteVo();
        this.createQualiteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatCarte(etatCarte: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatCarte', 'add');
                       if(isPermistted){
         this.selectedEtatCarte = new EtatCarteVo();
        this.createEtatCarteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatefonction(fonction: string) {
                      const isPermistted = await this.roleService.isPermitted('Fonction', 'add');
                       if(isPermistted){
         this.selectedFonction = new FonctionVo();
        this.createFonctionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestatut(statut: string) {
                      const isPermistted = await this.roleService.isPermitted('Statut', 'add');
                       if(isPermistted){
         this.selectedStatut = new StatutVo();
        this.createStatutDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editAdherentDialog  = false;
}

// getters and setters

get adherents(): Array<AdherentVo> {
    return this.adherentService.adherents;
       }
set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }

 get selectedAdherent(): AdherentVo {
           return this.adherentService.selectedAdherent;
       }
    set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }

   get editAdherentDialog(): boolean {
           return this.adherentService.editAdherentDialog;

       }
    set editAdherentDialog(value: boolean) {
        this.adherentService.editAdherentDialog = value;
       }

       get selectedQualite(): QualiteVo {
           return this.qualiteService.selectedQualite;
       }
      set selectedQualite(value: QualiteVo) {
        this.qualiteService.selectedQualite = value;
       }
       get qualites(): Array<QualiteVo> {
           return this.qualiteService.qualites;
       }
       set qualites(value: Array<QualiteVo>) {
        this.qualiteService.qualites = value;
       }
       get createQualiteDialog(): boolean {
           return this.qualiteService.createQualiteDialog;
       }
      set createQualiteDialog(value: boolean) {
        this.qualiteService.createQualiteDialog= value;
       }
       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
       }
       get selectedEtatCarte(): EtatCarteVo {
           return this.etatCarteService.selectedEtatCarte;
       }
      set selectedEtatCarte(value: EtatCarteVo) {
        this.etatCarteService.selectedEtatCarte = value;
       }
       get etatCartes(): Array<EtatCarteVo> {
           return this.etatCarteService.etatCartes;
       }
       set etatCartes(value: Array<EtatCarteVo>) {
        this.etatCarteService.etatCartes = value;
       }
       get createEtatCarteDialog(): boolean {
           return this.etatCarteService.createEtatCarteDialog;
       }
      set createEtatCarteDialog(value: boolean) {
        this.etatCarteService.createEtatCarteDialog= value;
       }
       get selectedFonction(): FonctionVo {
           return this.fonctionService.selectedFonction;
       }
      set selectedFonction(value: FonctionVo) {
        this.fonctionService.selectedFonction = value;
       }
       get fonctions(): Array<FonctionVo> {
           return this.fonctionService.fonctions;
       }
       set fonctions(value: Array<FonctionVo>) {
        this.fonctionService.fonctions = value;
       }
       get createFonctionDialog(): boolean {
           return this.fonctionService.createFonctionDialog;
       }
      set createFonctionDialog(value: boolean) {
        this.fonctionService.createFonctionDialog= value;
       }
       get selectedStatut(): StatutVo {
           return this.statutService.selectedStatut;
       }
      set selectedStatut(value: StatutVo) {
        this.statutService.selectedStatut = value;
       }
       get statuts(): Array<StatutVo> {
           return this.statutService.statuts;
       }
       set statuts(value: Array<StatutVo>) {
        this.statutService.statuts = value;
       }
       get createStatutDialog(): boolean {
           return this.statutService.createStatutDialog;
       }
      set createStatutDialog(value: boolean) {
        this.statutService.createStatutDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
