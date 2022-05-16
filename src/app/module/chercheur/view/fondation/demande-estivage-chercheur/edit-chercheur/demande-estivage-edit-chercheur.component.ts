import {Component, OnInit} from '@angular/core';
import {DemandeEstivageService} from '../../../../../../controller/service/DemandeEstivage.service';
import {DemandeEstivageVo} from '../../../../../../controller/model/DemandeEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
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
  selector: 'app-demande-estivage-edit-chercheur',
  templateUrl: './demande-estivage-edit-chercheur.component.html',
  styleUrls: ['./demande-estivage-edit-chercheur.component.css']
})
export class DemandeEstivageEditChercheurComponent implements OnInit {

        selectedPieceJointeEstivages: PieceJointeEstivageVo = new PieceJointeEstivageVo();
        pieceJointeEstivagesListe: Array<PieceJointeEstivageVo> = [];

        myEstivages: Array<EstivageVo> = [];


constructor(private datePipe: DatePipe, private demandeEstivageService: DemandeEstivageService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private adherentService: AdherentService
 ,       private etatDemandeEstivageService: EtatDemandeEstivageService
 ,       private pieceJointeEstivageService: PieceJointeEstivageService
 ,       private demandeEstivageCentreService: DemandeEstivageCentreService
 ,       private estivageCentreEstivageService: EstivageCentreEstivageService
 ,       private estivageService: EstivageService
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
        addPieceJointeEstivages() {
        if( this.selectedDemandeEstivage.pieceJointeEstivagesVo == null ){
            this.selectedDemandeEstivage.pieceJointeEstivagesVo = new Array<PieceJointeEstivageVo>();
        }
        this.selectedDemandeEstivage.pieceJointeEstivagesVo.push(this.selectedPieceJointeEstivages);
        this.selectedPieceJointeEstivages = new PieceJointeEstivageVo();
        }

       deletePieceJointeEstivages(p: PieceJointeEstivageVo) {
        this.selectedDemandeEstivage.pieceJointeEstivagesVo.forEach((element, index) => {
            if (element === p) { this.selectedDemandeEstivage.pieceJointeEstivagesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDemandeEstivage.dateDebutEstivage = DateUtils.toDate(this.selectedDemandeEstivage.dateDebutEstivage);
            this.selectedDemandeEstivage.dateFinEstivage = DateUtils.toDate(this.selectedDemandeEstivage.dateFinEstivage);
            this.selectedDemandeEstivage.dateTraitement = DateUtils.toDate(this.selectedDemandeEstivage.dateTraitement);
    this.demandeEstivageService.edit().subscribe(demandeEstivage=>{
    const myIndex = this.demandeEstivages.findIndex(e => e.id === this.selectedDemandeEstivage.id);
    this.demandeEstivages[myIndex] = this.selectedDemandeEstivage;
    this.editDemandeEstivageDialog = false;
    this.selectedDemandeEstivage = new DemandeEstivageVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateestivage(estivage: string) {
                      const isPermistted = await this.roleService.isPermitted('Estivage', 'add');
                       if(isPermistted){
         this.selectedEstivage = new EstivageVo();
        this.createEstivageDialog = true;
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
              public async openCreateestivageCentreEstivage(estivageCentreEstivage: string) {
                      const isPermistted = await this.roleService.isPermitted('EstivageCentreEstivage', 'add');
                       if(isPermistted){
         this.selectedEstivageCentreEstivage = new EstivageCentreEstivageVo();
        this.createEstivageCentreEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedemandeEstivageCentre(demandeEstivageCentre: string) {
                      const isPermistted = await this.roleService.isPermitted('DemandeEstivageCentre', 'add');
                       if(isPermistted){
         this.selectedDemandeEstivageCentre = new DemandeEstivageCentreVo();
        this.createDemandeEstivageCentreDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatDemandeEstivage(etatDemandeEstivage: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatDemandeEstivage', 'add');
                       if(isPermistted){
         this.selectedEtatDemandeEstivage = new EtatDemandeEstivageVo();
        this.createEtatDemandeEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDemandeEstivageDialog  = false;
}

// getters and setters

get demandeEstivages(): Array<DemandeEstivageVo> {
    return this.demandeEstivageService.demandeEstivages;
       }
set demandeEstivages(value: Array<DemandeEstivageVo>) {
        this.demandeEstivageService.demandeEstivages = value;
       }

 get selectedDemandeEstivage(): DemandeEstivageVo {
           return this.demandeEstivageService.selectedDemandeEstivage;
       }
    set selectedDemandeEstivage(value: DemandeEstivageVo) {
        this.demandeEstivageService.selectedDemandeEstivage = value;
       }

   get editDemandeEstivageDialog(): boolean {
           return this.demandeEstivageService.editDemandeEstivageDialog;

       }
    set editDemandeEstivageDialog(value: boolean) {
        this.demandeEstivageService.editDemandeEstivageDialog = value;
       }

       get selectedEstivage(): EstivageVo {
           return this.estivageService.selectedEstivage;
       }
      set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
       }
       get estivages(): Array<EstivageVo> {
           return this.estivageService.estivages;
       }
       set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }
       get createEstivageDialog(): boolean {
           return this.estivageService.createEstivageDialog;
       }
      set createEstivageDialog(value: boolean) {
        this.estivageService.createEstivageDialog= value;
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
       get selectedEstivageCentreEstivage(): EstivageCentreEstivageVo {
           return this.estivageCentreEstivageService.selectedEstivageCentreEstivage;
       }
      set selectedEstivageCentreEstivage(value: EstivageCentreEstivageVo) {
        this.estivageCentreEstivageService.selectedEstivageCentreEstivage = value;
       }
       get estivageCentreEstivages(): Array<EstivageCentreEstivageVo> {
           return this.estivageCentreEstivageService.estivageCentreEstivages;
       }
       set estivageCentreEstivages(value: Array<EstivageCentreEstivageVo>) {
        this.estivageCentreEstivageService.estivageCentreEstivages = value;
       }
       get createEstivageCentreEstivageDialog(): boolean {
           return this.estivageCentreEstivageService.createEstivageCentreEstivageDialog;
       }
      set createEstivageCentreEstivageDialog(value: boolean) {
        this.estivageCentreEstivageService.createEstivageCentreEstivageDialog= value;
       }
       get selectedDemandeEstivageCentre(): DemandeEstivageCentreVo {
           return this.demandeEstivageCentreService.selectedDemandeEstivageCentre;
       }
      set selectedDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this.demandeEstivageCentreService.selectedDemandeEstivageCentre = value;
       }
       get demandeEstivageCentres(): Array<DemandeEstivageCentreVo> {
           return this.demandeEstivageCentreService.demandeEstivageCentres;
       }
       set demandeEstivageCentres(value: Array<DemandeEstivageCentreVo>) {
        this.demandeEstivageCentreService.demandeEstivageCentres = value;
       }
       get createDemandeEstivageCentreDialog(): boolean {
           return this.demandeEstivageCentreService.createDemandeEstivageCentreDialog;
       }
      set createDemandeEstivageCentreDialog(value: boolean) {
        this.demandeEstivageCentreService.createDemandeEstivageCentreDialog= value;
       }
       get selectedEtatDemandeEstivage(): EtatDemandeEstivageVo {
           return this.etatDemandeEstivageService.selectedEtatDemandeEstivage;
       }
      set selectedEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this.etatDemandeEstivageService.selectedEtatDemandeEstivage = value;
       }
       get etatDemandeEstivages(): Array<EtatDemandeEstivageVo> {
           return this.etatDemandeEstivageService.etatDemandeEstivages;
       }
       set etatDemandeEstivages(value: Array<EtatDemandeEstivageVo>) {
        this.etatDemandeEstivageService.etatDemandeEstivages = value;
       }
       get createEtatDemandeEstivageDialog(): boolean {
           return this.etatDemandeEstivageService.createEtatDemandeEstivageDialog;
       }
      set createEtatDemandeEstivageDialog(value: boolean) {
        this.etatDemandeEstivageService.createEtatDemandeEstivageDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
