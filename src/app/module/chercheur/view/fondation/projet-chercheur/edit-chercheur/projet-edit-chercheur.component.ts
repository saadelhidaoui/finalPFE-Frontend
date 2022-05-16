import {Component, OnInit} from '@angular/core';
import {ProjetService} from '../../../../../../controller/service/Projet.service';
import {ProjetVo} from '../../../../../../controller/model/Projet.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PieceJointeProjetVo} from '../../../../../../controller/model/PieceJointeProjet.model';
import {PieceJointeProjetService} from '../../../../../../controller/service/PieceJointeProjet.service';
import {EtatProjetVo} from '../../../../../../controller/model/EtatProjet.model';
import {EtatProjetService} from '../../../../../../controller/service/EtatProjet.service';

@Component({
  selector: 'app-projet-edit-chercheur',
  templateUrl: './projet-edit-chercheur.component.html',
  styleUrls: ['./projet-edit-chercheur.component.css']
})
export class ProjetEditChercheurComponent implements OnInit {

        selectedPieceJointeProjets: PieceJointeProjetVo = new PieceJointeProjetVo();
        pieceJointeProjetsListe: Array<PieceJointeProjetVo> = [];



constructor(private datePipe: DatePipe, private projetService: ProjetService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private pieceJointeProjetService: PieceJointeProjetService
 ,       private etatProjetService: EtatProjetService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtatProjet = new EtatProjetVo();
    this.etatProjetService.findAll().subscribe((data) => this.etatProjets = data);
}
        addPieceJointeProjets() {
        if( this.selectedProjet.pieceJointeProjetsVo == null ){
            this.selectedProjet.pieceJointeProjetsVo = new Array<PieceJointeProjetVo>();
        }
        this.selectedProjet.pieceJointeProjetsVo.push(this.selectedPieceJointeProjets);
        this.selectedPieceJointeProjets = new PieceJointeProjetVo();
        }

       deletePieceJointeProjets(p: PieceJointeProjetVo) {
        this.selectedProjet.pieceJointeProjetsVo.forEach((element, index) => {
            if (element === p) { this.selectedProjet.pieceJointeProjetsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedProjet.dateDebut = DateUtils.toDate(this.selectedProjet.dateDebut);
            this.selectedProjet.dateArchivage = DateUtils.toDate(this.selectedProjet.dateArchivage);
            this.selectedProjet.dateCreation = DateUtils.toDate(this.selectedProjet.dateCreation);
    this.projetService.edit().subscribe(projet=>{
    const myIndex = this.projets.findIndex(e => e.id === this.selectedProjet.id);
    this.projets[myIndex] = this.selectedProjet;
    this.editProjetDialog = false;
    this.selectedProjet = new ProjetVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetatProjet(etatProjet: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatProjet', 'add');
                       if(isPermistted){
         this.selectedEtatProjet = new EtatProjetVo();
        this.createEtatProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editProjetDialog  = false;
}

// getters and setters

get projets(): Array<ProjetVo> {
    return this.projetService.projets;
       }
set projets(value: Array<ProjetVo>) {
        this.projetService.projets = value;
       }

 get selectedProjet(): ProjetVo {
           return this.projetService.selectedProjet;
       }
    set selectedProjet(value: ProjetVo) {
        this.projetService.selectedProjet = value;
       }

   get editProjetDialog(): boolean {
           return this.projetService.editProjetDialog;

       }
    set editProjetDialog(value: boolean) {
        this.projetService.editProjetDialog = value;
       }

       get selectedEtatProjet(): EtatProjetVo {
           return this.etatProjetService.selectedEtatProjet;
       }
      set selectedEtatProjet(value: EtatProjetVo) {
        this.etatProjetService.selectedEtatProjet = value;
       }
       get etatProjets(): Array<EtatProjetVo> {
           return this.etatProjetService.etatProjets;
       }
       set etatProjets(value: Array<EtatProjetVo>) {
        this.etatProjetService.etatProjets = value;
       }
       get createEtatProjetDialog(): boolean {
           return this.etatProjetService.createEtatProjetDialog;
       }
      set createEtatProjetDialog(value: boolean) {
        this.etatProjetService.createEtatProjetDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
