import {Component, OnInit} from '@angular/core';
import {PrestationService} from '../../../../../../controller/service/Prestation.service';
import {PrestationVo} from '../../../../../../controller/model/Prestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
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
  selector: 'app-prestation-edit-admin',
  templateUrl: './prestation-edit-admin.component.html',
  styleUrls: ['./prestation-edit-admin.component.css']
})
export class PrestationEditAdminComponent implements OnInit {

        selectedPieceJointePrestations: PieceJointePrestationVo = new PieceJointePrestationVo();
        pieceJointePrestationsListe: Array<PieceJointePrestationVo> = [];



constructor(private datePipe: DatePipe, private prestationService: PrestationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private adherentService: AdherentService
 ,       private etatPrestationService: EtatPrestationService
 ,       private pieceJointePrestationService: PieceJointePrestationService
 ,       private niveauImportanceService: NiveauImportanceService
 ,       private typePrestationService: TypePrestationService
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
        addPieceJointePrestations() {
        if( this.selectedPrestation.pieceJointePrestationsVo == null ){
            this.selectedPrestation.pieceJointePrestationsVo = new Array<PieceJointePrestationVo>();
        }
        this.selectedPrestation.pieceJointePrestationsVo.push(this.selectedPieceJointePrestations);
        this.selectedPieceJointePrestations = new PieceJointePrestationVo();
        }

       deletePieceJointePrestations(p: PieceJointePrestationVo) {
        this.selectedPrestation.pieceJointePrestationsVo.forEach((element, index) => {
            if (element === p) { this.selectedPrestation.pieceJointePrestationsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPrestation.dateEnvoi = DateUtils.toDate(this.selectedPrestation.dateEnvoi);
            this.selectedPrestation.dateTraitement = DateUtils.toDate(this.selectedPrestation.dateTraitement);
            this.selectedPrestation.dateArchivage = DateUtils.toDate(this.selectedPrestation.dateArchivage);
            this.selectedPrestation.dateCreation = DateUtils.toDate(this.selectedPrestation.dateCreation);
    this.prestationService.edit().subscribe(prestation=>{
    const myIndex = this.prestations.findIndex(e => e.id === this.selectedPrestation.id);
    this.prestations[myIndex] = this.selectedPrestation;
    this.editPrestationDialog = false;
    this.selectedPrestation = new PrestationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypePrestation(typePrestation: string) {
                      const isPermistted = await this.roleService.isPermitted('TypePrestation', 'add');
                       if(isPermistted){
         this.selectedTypePrestation = new TypePrestationVo();
        this.createTypePrestationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateniveauImportance(niveauImportance: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauImportance', 'add');
                       if(isPermistted){
         this.selectedNiveauImportance = new NiveauImportanceVo();
        this.createNiveauImportanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateadherent(adherent: string) {
                      const isPermistted = await this.roleService.isPermitted('Adherent', 'add');
                       if(isPermistted){
         this.selectedAdherent = new AdherentVo();
        this.createAdherentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatPrestation(etatPrestation: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatPrestation', 'add');
                       if(isPermistted){
         this.selectedEtatPrestation = new EtatPrestationVo();
        this.createEtatPrestationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPrestationDialog  = false;
}

// getters and setters

get prestations(): Array<PrestationVo> {
    return this.prestationService.prestations;
       }
set prestations(value: Array<PrestationVo>) {
        this.prestationService.prestations = value;
       }

 get selectedPrestation(): PrestationVo {
           return this.prestationService.selectedPrestation;
       }
    set selectedPrestation(value: PrestationVo) {
        this.prestationService.selectedPrestation = value;
       }

   get editPrestationDialog(): boolean {
           return this.prestationService.editPrestationDialog;

       }
    set editPrestationDialog(value: boolean) {
        this.prestationService.editPrestationDialog = value;
       }

       get selectedTypePrestation(): TypePrestationVo {
           return this.typePrestationService.selectedTypePrestation;
       }
      set selectedTypePrestation(value: TypePrestationVo) {
        this.typePrestationService.selectedTypePrestation = value;
       }
       get typePrestations(): Array<TypePrestationVo> {
           return this.typePrestationService.typePrestations;
       }
       set typePrestations(value: Array<TypePrestationVo>) {
        this.typePrestationService.typePrestations = value;
       }
       get createTypePrestationDialog(): boolean {
           return this.typePrestationService.createTypePrestationDialog;
       }
      set createTypePrestationDialog(value: boolean) {
        this.typePrestationService.createTypePrestationDialog= value;
       }
       get selectedNiveauImportance(): NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
      set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }
       get niveauImportances(): Array<NiveauImportanceVo> {
           return this.niveauImportanceService.niveauImportances;
       }
       set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
       }
       get createNiveauImportanceDialog(): boolean {
           return this.niveauImportanceService.createNiveauImportanceDialog;
       }
      set createNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.createNiveauImportanceDialog= value;
       }
       get selectedAdherent(): AdherentVo {
           return this.adherentService.selectedAdherent;
       }
      set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }
       get adherents(): Array<AdherentVo> {
           return this.adherentService.adherents;
       }
       set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }
       get createAdherentDialog(): boolean {
           return this.adherentService.createAdherentDialog;
       }
      set createAdherentDialog(value: boolean) {
        this.adherentService.createAdherentDialog= value;
       }
       get selectedEtatPrestation(): EtatPrestationVo {
           return this.etatPrestationService.selectedEtatPrestation;
       }
      set selectedEtatPrestation(value: EtatPrestationVo) {
        this.etatPrestationService.selectedEtatPrestation = value;
       }
       get etatPrestations(): Array<EtatPrestationVo> {
           return this.etatPrestationService.etatPrestations;
       }
       set etatPrestations(value: Array<EtatPrestationVo>) {
        this.etatPrestationService.etatPrestations = value;
       }
       get createEtatPrestationDialog(): boolean {
           return this.etatPrestationService.createEtatPrestationDialog;
       }
      set createEtatPrestationDialog(value: boolean) {
        this.etatPrestationService.createEtatPrestationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
