import {Component, OnInit} from '@angular/core';
import {PieceJointeRendezVousService} from '../../../../../../controller/service/PieceJointeRendezVous.service';
import {PieceJointeRendezVousVo} from '../../../../../../controller/model/PieceJointeRendezVous.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RendezVousVo} from '../../../../../../controller/model/RendezVous.model';
import {RendezVousService} from '../../../../../../controller/service/RendezVous.service';

@Component({
  selector: 'app-piece-jointe-rendez-vous-edit-chercheur',
  templateUrl: './piece-jointe-rendez-vous-edit-chercheur.component.html',
  styleUrls: ['./piece-jointe-rendez-vous-edit-chercheur.component.css']
})
export class PieceJointeRendezVousEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeRendezVousService: PieceJointeRendezVousService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rendezVousService: RendezVousService
) {
}

// methods
ngOnInit(): void {
    this.selectedRendezVous = new RendezVousVo();
    this.rendezVousService.findAll().subscribe((data) => this.rendezVouss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPieceJointeRendezVous.dateAjout = DateUtils.toDate(this.selectedPieceJointeRendezVous.dateAjout);
            this.selectedPieceJointeRendezVous.dateArchivage = DateUtils.toDate(this.selectedPieceJointeRendezVous.dateArchivage);
            this.selectedPieceJointeRendezVous.dateCreation = DateUtils.toDate(this.selectedPieceJointeRendezVous.dateCreation);
    this.pieceJointeRendezVousService.edit().subscribe(pieceJointeRendezVous=>{
    const myIndex = this.pieceJointeRendezVouss.findIndex(e => e.id === this.selectedPieceJointeRendezVous.id);
    this.pieceJointeRendezVouss[myIndex] = this.selectedPieceJointeRendezVous;
    this.editPieceJointeRendezVousDialog = false;
    this.selectedPieceJointeRendezVous = new PieceJointeRendezVousVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreaterendezVous(rendezVous: string) {
                      const isPermistted = await this.roleService.isPermitted('RendezVous', 'add');
                       if(isPermistted){
         this.selectedRendezVous = new RendezVousVo();
        this.createRendezVousDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPieceJointeRendezVousDialog  = false;
}

// getters and setters

get pieceJointeRendezVouss(): Array<PieceJointeRendezVousVo> {
    return this.pieceJointeRendezVousService.pieceJointeRendezVouss;
       }
set pieceJointeRendezVouss(value: Array<PieceJointeRendezVousVo>) {
        this.pieceJointeRendezVousService.pieceJointeRendezVouss = value;
       }

 get selectedPieceJointeRendezVous(): PieceJointeRendezVousVo {
           return this.pieceJointeRendezVousService.selectedPieceJointeRendezVous;
       }
    set selectedPieceJointeRendezVous(value: PieceJointeRendezVousVo) {
        this.pieceJointeRendezVousService.selectedPieceJointeRendezVous = value;
       }

   get editPieceJointeRendezVousDialog(): boolean {
           return this.pieceJointeRendezVousService.editPieceJointeRendezVousDialog;

       }
    set editPieceJointeRendezVousDialog(value: boolean) {
        this.pieceJointeRendezVousService.editPieceJointeRendezVousDialog = value;
       }

       get selectedRendezVous(): RendezVousVo {
           return this.rendezVousService.selectedRendezVous;
       }
      set selectedRendezVous(value: RendezVousVo) {
        this.rendezVousService.selectedRendezVous = value;
       }
       get rendezVouss(): Array<RendezVousVo> {
           return this.rendezVousService.rendezVouss;
       }
       set rendezVouss(value: Array<RendezVousVo>) {
        this.rendezVousService.rendezVouss = value;
       }
       get createRendezVousDialog(): boolean {
           return this.rendezVousService.createRendezVousDialog;
       }
      set createRendezVousDialog(value: boolean) {
        this.rendezVousService.createRendezVousDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
