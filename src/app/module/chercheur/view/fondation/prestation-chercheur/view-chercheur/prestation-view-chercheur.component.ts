import {Component, OnInit} from '@angular/core';
import {PrestationService} from '../../../../../../controller/service/Prestation.service';
import {PrestationVo} from '../../../../../../controller/model/Prestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {EtatPrestationVo} from '../../../../../../controller/model/EtatPrestation.model';
import {EtatPrestationService} from '../../../../../../controller/service/EtatPrestation.service';
import {PieceJointePrestationVo} from '../../../../../../controller/model/PieceJointePrestation.model';
import {PieceJointePrestationService} from '../../../../../../controller/service/PieceJointePrestation.service';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import {NiveauImportanceService} from '../../../../../../controller/service/NiveauImportance.service';
import {TypePrestationVo} from '../../../../../../controller/model/TypePrestation.model';
import {TypePrestationService} from '../../../../../../controller/service/TypePrestation.service';

@Component({
  selector: 'app-prestation-view-chercheur',
  templateUrl: './prestation-view-chercheur.component.html',
  styleUrls: ['./prestation-view-chercheur.component.css']
})
export class PrestationViewChercheurComponent implements OnInit {

        selectedPieceJointePrestations: PieceJointePrestationVo = new PieceJointePrestationVo();
        pieceJointePrestationsListe: Array<PieceJointePrestationVo> = [];



constructor(private datePipe: DatePipe, private prestationService: PrestationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private adherentService :AdherentService
    ,private etatPrestationService :EtatPrestationService
    ,private pieceJointePrestationService :PieceJointePrestationService
    ,private niveauImportanceService :NiveauImportanceService
    ,private typePrestationService :TypePrestationService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtatPrestation = new EtatPrestationVo();
    this.etatPrestationService.findAll().subscribe((data) => this.etatPrestations = data);
    this.selectedNiveauImportance = new NiveauImportanceVo();
    this.niveauImportanceService.findAll().subscribe((data) => this.niveauImportances = data);
    this.selectedTypePrestation = new TypePrestationVo();
    this.typePrestationService.findAll().subscribe((data) => this.typePrestations = data);
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
}

hideViewDialog(){
    this.viewPrestationDialog  = false;
}

// getters and setters

get prestations(): Array<PrestationVo> {
    return this.prestationService.prestations;
       }
set prestations(value: Array<PrestationVo>) {
        this.prestationService.prestations = value;
       }

 get selectedPrestation():PrestationVo {
           return this.prestationService.selectedPrestation;
       }
    set selectedPrestation(value: PrestationVo) {
        this.prestationService.selectedPrestation = value;
       }

   get viewPrestationDialog():boolean {
           return this.prestationService.viewPrestationDialog;

       }
    set viewPrestationDialog(value: boolean) {
        this.prestationService.viewPrestationDialog= value;
       }

       get selectedTypePrestation():TypePrestationVo {
           return this.typePrestationService.selectedTypePrestation;
       }
      set selectedTypePrestation(value: TypePrestationVo) {
        this.typePrestationService.selectedTypePrestation = value;
       }
       get typePrestations():Array<TypePrestationVo> {
           return this.typePrestationService.typePrestations;
       }
       set typePrestations(value: Array<TypePrestationVo>) {
        this.typePrestationService.typePrestations = value;
       }
       get editTypePrestationDialog():boolean {
           return this.typePrestationService.editTypePrestationDialog;
       }
      set editTypePrestationDialog(value: boolean) {
        this.typePrestationService.editTypePrestationDialog= value;
       }
       get selectedNiveauImportance():NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
      set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }
       get niveauImportances():Array<NiveauImportanceVo> {
           return this.niveauImportanceService.niveauImportances;
       }
       set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
       }
       get editNiveauImportanceDialog():boolean {
           return this.niveauImportanceService.editNiveauImportanceDialog;
       }
      set editNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.editNiveauImportanceDialog= value;
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
       get selectedEtatPrestation():EtatPrestationVo {
           return this.etatPrestationService.selectedEtatPrestation;
       }
      set selectedEtatPrestation(value: EtatPrestationVo) {
        this.etatPrestationService.selectedEtatPrestation = value;
       }
       get etatPrestations():Array<EtatPrestationVo> {
           return this.etatPrestationService.etatPrestations;
       }
       set etatPrestations(value: Array<EtatPrestationVo>) {
        this.etatPrestationService.etatPrestations = value;
       }
       get editEtatPrestationDialog():boolean {
           return this.etatPrestationService.editEtatPrestationDialog;
       }
      set editEtatPrestationDialog(value: boolean) {
        this.etatPrestationService.editEtatPrestationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
