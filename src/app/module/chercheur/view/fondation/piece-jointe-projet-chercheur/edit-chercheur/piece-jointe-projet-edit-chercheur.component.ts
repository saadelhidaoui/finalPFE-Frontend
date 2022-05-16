import {Component, OnInit} from '@angular/core';
import {PieceJointeProjetService} from '../../../../../../controller/service/PieceJointeProjet.service';
import {PieceJointeProjetVo} from '../../../../../../controller/model/PieceJointeProjet.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ProjetVo} from '../../../../../../controller/model/Projet.model';
import {ProjetService} from '../../../../../../controller/service/Projet.service';

@Component({
  selector: 'app-piece-jointe-projet-edit-chercheur',
  templateUrl: './piece-jointe-projet-edit-chercheur.component.html',
  styleUrls: ['./piece-jointe-projet-edit-chercheur.component.css']
})
export class PieceJointeProjetEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeProjetService: PieceJointeProjetService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private projetService: ProjetService
) {
}

// methods
ngOnInit(): void {
    this.selectedProjet = new ProjetVo();
    this.projetService.findAll().subscribe((data) => this.projets = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPieceJointeProjet.dateAjout = DateUtils.toDate(this.selectedPieceJointeProjet.dateAjout);
            this.selectedPieceJointeProjet.dateArchivage = DateUtils.toDate(this.selectedPieceJointeProjet.dateArchivage);
            this.selectedPieceJointeProjet.dateCreation = DateUtils.toDate(this.selectedPieceJointeProjet.dateCreation);
    this.pieceJointeProjetService.edit().subscribe(pieceJointeProjet=>{
    const myIndex = this.pieceJointeProjets.findIndex(e => e.id === this.selectedPieceJointeProjet.id);
    this.pieceJointeProjets[myIndex] = this.selectedPieceJointeProjet;
    this.editPieceJointeProjetDialog = false;
    this.selectedPieceJointeProjet = new PieceJointeProjetVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateprojet(projet: string) {
                      const isPermistted = await this.roleService.isPermitted('Projet', 'add');
                       if(isPermistted){
         this.selectedProjet = new ProjetVo();
        this.createProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPieceJointeProjetDialog  = false;
}

// getters and setters

get pieceJointeProjets(): Array<PieceJointeProjetVo> {
    return this.pieceJointeProjetService.pieceJointeProjets;
       }
set pieceJointeProjets(value: Array<PieceJointeProjetVo>) {
        this.pieceJointeProjetService.pieceJointeProjets = value;
       }

 get selectedPieceJointeProjet(): PieceJointeProjetVo {
           return this.pieceJointeProjetService.selectedPieceJointeProjet;
       }
    set selectedPieceJointeProjet(value: PieceJointeProjetVo) {
        this.pieceJointeProjetService.selectedPieceJointeProjet = value;
       }

   get editPieceJointeProjetDialog(): boolean {
           return this.pieceJointeProjetService.editPieceJointeProjetDialog;

       }
    set editPieceJointeProjetDialog(value: boolean) {
        this.pieceJointeProjetService.editPieceJointeProjetDialog = value;
       }

       get selectedProjet(): ProjetVo {
           return this.projetService.selectedProjet;
       }
      set selectedProjet(value: ProjetVo) {
        this.projetService.selectedProjet = value;
       }
       get projets(): Array<ProjetVo> {
           return this.projetService.projets;
       }
       set projets(value: Array<ProjetVo>) {
        this.projetService.projets = value;
       }
       get createProjetDialog(): boolean {
           return this.projetService.createProjetDialog;
       }
      set createProjetDialog(value: boolean) {
        this.projetService.createProjetDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
