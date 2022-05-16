import {Component, OnInit} from '@angular/core';
import {RendezVousService} from '../../../../../../controller/service/RendezVous.service';
import {RendezVousVo} from '../../../../../../controller/model/RendezVous.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PieceJointeRendezVousVo} from '../../../../../../controller/model/PieceJointeRendezVous.model';
import {PieceJointeRendezVousService} from '../../../../../../controller/service/PieceJointeRendezVous.service';

@Component({
  selector: 'app-rendez-vous-edit-adherent',
  templateUrl: './rendez-vous-edit-adherent.component.html',
  styleUrls: ['./rendez-vous-edit-adherent.component.css']
})
export class RendezVousEditAdherentComponent implements OnInit {

        selectedPieceJointeRendezVous: PieceJointeRendezVousVo = new PieceJointeRendezVousVo();
        pieceJointeRendezVousListe: Array<PieceJointeRendezVousVo> = [];



constructor(private datePipe: DatePipe, private rendezVousService: RendezVousService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private pieceJointeRendezVousService: PieceJointeRendezVousService
) {
}

// methods
ngOnInit(): void {
}
        addPieceJointeRendezVous() {
        if( this.selectedRendezVous.pieceJointeRendezVousVo == null ){
            this.selectedRendezVous.pieceJointeRendezVousVo = new Array<PieceJointeRendezVousVo>();
        }
        this.selectedRendezVous.pieceJointeRendezVousVo.push(this.selectedPieceJointeRendezVous);
        this.selectedPieceJointeRendezVous = new PieceJointeRendezVousVo();
        }

       deletePieceJointeRendezVous(p: PieceJointeRendezVousVo) {
        this.selectedRendezVous.pieceJointeRendezVousVo.forEach((element, index) => {
            if (element === p) { this.selectedRendezVous.pieceJointeRendezVousVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedRendezVous.dateDebut = DateUtils.toDate(this.selectedRendezVous.dateDebut);
            this.selectedRendezVous.dateArchivage = DateUtils.toDate(this.selectedRendezVous.dateArchivage);
            this.selectedRendezVous.dateCreation = DateUtils.toDate(this.selectedRendezVous.dateCreation);
    this.rendezVousService.edit().subscribe(rendezVous=>{
    const myIndex = this.rendezVouss.findIndex(e => e.id === this.selectedRendezVous.id);
    this.rendezVouss[myIndex] = this.selectedRendezVous;
    this.editRendezVousDialog = false;
    this.selectedRendezVous = new RendezVousVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editRendezVousDialog  = false;
}

// getters and setters

get rendezVouss(): Array<RendezVousVo> {
    return this.rendezVousService.rendezVouss;
       }
set rendezVouss(value: Array<RendezVousVo>) {
        this.rendezVousService.rendezVouss = value;
       }

 get selectedRendezVous(): RendezVousVo {
           return this.rendezVousService.selectedRendezVous;
       }
    set selectedRendezVous(value: RendezVousVo) {
        this.rendezVousService.selectedRendezVous = value;
       }

   get editRendezVousDialog(): boolean {
           return this.rendezVousService.editRendezVousDialog;

       }
    set editRendezVousDialog(value: boolean) {
        this.rendezVousService.editRendezVousDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
