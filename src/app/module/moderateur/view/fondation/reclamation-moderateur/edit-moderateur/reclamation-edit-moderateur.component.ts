import {Component, OnInit} from '@angular/core';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';
import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {PieceJointeReclamationVo} from '../../../../../../controller/model/PieceJointeReclamation.model';
import {PieceJointeReclamationService} from '../../../../../../controller/service/PieceJointeReclamation.service';
import {EtatReclamationVo} from '../../../../../../controller/model/EtatReclamation.model';
import {EtatReclamationService} from '../../../../../../controller/service/EtatReclamation.service';

@Component({
  selector: 'app-reclamation-edit-moderateur',
  templateUrl: './reclamation-edit-moderateur.component.html',
  styleUrls: ['./reclamation-edit-moderateur.component.css']
})
export class ReclamationEditModerateurComponent implements OnInit {

        selectedPieceJointeReclamations: PieceJointeReclamationVo = new PieceJointeReclamationVo();
        pieceJointeReclamationsListe: Array<PieceJointeReclamationVo> = [];



constructor(private datePipe: DatePipe, private reclamationService: ReclamationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private adherentService: AdherentService
 ,       private pieceJointeReclamationService: PieceJointeReclamationService
 ,       private etatReclamationService: EtatReclamationService
) {
}

// methods
ngOnInit(): void {
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
    this.selectedEtatReclamation = new EtatReclamationVo();
    this.etatReclamationService.findAll().subscribe((data) => this.etatReclamations = data);
}
        addPieceJointeReclamations() {
        if( this.selectedReclamation.pieceJointeReclamationsVo == null ){
            this.selectedReclamation.pieceJointeReclamationsVo = new Array<PieceJointeReclamationVo>();
        }
        this.selectedReclamation.pieceJointeReclamationsVo.push(this.selectedPieceJointeReclamations);
        this.selectedPieceJointeReclamations = new PieceJointeReclamationVo();
        }

       deletePieceJointeReclamations(p: PieceJointeReclamationVo) {
        this.selectedReclamation.pieceJointeReclamationsVo.forEach((element, index) => {
            if (element === p) { this.selectedReclamation.pieceJointeReclamationsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedReclamation.dateReclamation = DateUtils.toDate(this.selectedReclamation.dateReclamation);
            this.selectedReclamation.dateArchivage = DateUtils.toDate(this.selectedReclamation.dateArchivage);
            this.selectedReclamation.dateCreation = DateUtils.toDate(this.selectedReclamation.dateCreation);
    this.reclamationService.edit().subscribe(reclamation=>{
    const myIndex = this.reclamations.findIndex(e => e.id === this.selectedReclamation.id);
    this.reclamations[myIndex] = this.selectedReclamation;
    this.editReclamationDialog = false;
    this.selectedReclamation = new ReclamationVo();


    }, error => {
        console.log(error);
    });

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
              public async openCreateetatReclamation(etatReclamation: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatReclamation', 'add');
                       if(isPermistted){
         this.selectedEtatReclamation = new EtatReclamationVo();
        this.createEtatReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editReclamationDialog  = false;
}

// getters and setters

get reclamations(): Array<ReclamationVo> {
    return this.reclamationService.reclamations;
       }
set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }

 get selectedReclamation(): ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }

   get editReclamationDialog(): boolean {
           return this.reclamationService.editReclamationDialog;

       }
    set editReclamationDialog(value: boolean) {
        this.reclamationService.editReclamationDialog = value;
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
       get selectedEtatReclamation(): EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
      set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }
       get etatReclamations(): Array<EtatReclamationVo> {
           return this.etatReclamationService.etatReclamations;
       }
       set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }
       get createEtatReclamationDialog(): boolean {
           return this.etatReclamationService.createEtatReclamationDialog;
       }
      set createEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.createEtatReclamationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
