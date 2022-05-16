import {Component, OnInit} from '@angular/core';
import {PieceJointeRendezVousService} from '../../../../../../controller/service/PieceJointeRendezVous.service';
import {PieceJointeRendezVousVo} from '../../../../../../controller/model/PieceJointeRendezVous.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RendezVousVo} from '../../../../../../controller/model/RendezVous.model';
import {RendezVousService} from '../../../../../../controller/service/RendezVous.service';

@Component({
  selector: 'app-piece-jointe-rendez-vous-view-chercheur',
  templateUrl: './piece-jointe-rendez-vous-view-chercheur.component.html',
  styleUrls: ['./piece-jointe-rendez-vous-view-chercheur.component.css']
})
export class PieceJointeRendezVousViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeRendezVousService: PieceJointeRendezVousService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rendezVousService :RendezVousService
) {
}

// methods
ngOnInit(): void {
    this.selectedRendezVous = new RendezVousVo();
    this.rendezVousService.findAll().subscribe((data) => this.rendezVouss = data);
}

hideViewDialog(){
    this.viewPieceJointeRendezVousDialog  = false;
}

// getters and setters

get pieceJointeRendezVouss(): Array<PieceJointeRendezVousVo> {
    return this.pieceJointeRendezVousService.pieceJointeRendezVouss;
       }
set pieceJointeRendezVouss(value: Array<PieceJointeRendezVousVo>) {
        this.pieceJointeRendezVousService.pieceJointeRendezVouss = value;
       }

 get selectedPieceJointeRendezVous():PieceJointeRendezVousVo {
           return this.pieceJointeRendezVousService.selectedPieceJointeRendezVous;
       }
    set selectedPieceJointeRendezVous(value: PieceJointeRendezVousVo) {
        this.pieceJointeRendezVousService.selectedPieceJointeRendezVous = value;
       }

   get viewPieceJointeRendezVousDialog():boolean {
           return this.pieceJointeRendezVousService.viewPieceJointeRendezVousDialog;

       }
    set viewPieceJointeRendezVousDialog(value: boolean) {
        this.pieceJointeRendezVousService.viewPieceJointeRendezVousDialog= value;
       }

       get selectedRendezVous():RendezVousVo {
           return this.rendezVousService.selectedRendezVous;
       }
      set selectedRendezVous(value: RendezVousVo) {
        this.rendezVousService.selectedRendezVous = value;
       }
       get rendezVouss():Array<RendezVousVo> {
           return this.rendezVousService.rendezVouss;
       }
       set rendezVouss(value: Array<RendezVousVo>) {
        this.rendezVousService.rendezVouss = value;
       }
       get editRendezVousDialog():boolean {
           return this.rendezVousService.editRendezVousDialog;
       }
      set editRendezVousDialog(value: boolean) {
        this.rendezVousService.editRendezVousDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
