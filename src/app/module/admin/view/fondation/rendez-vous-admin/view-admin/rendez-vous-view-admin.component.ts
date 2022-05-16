import {Component, OnInit} from '@angular/core';
import {RendezVousService} from '../../../../../../controller/service/RendezVous.service';
import {RendezVousVo} from '../../../../../../controller/model/RendezVous.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PieceJointeRendezVousVo} from '../../../../../../controller/model/PieceJointeRendezVous.model';
import {PieceJointeRendezVousService} from '../../../../../../controller/service/PieceJointeRendezVous.service';

@Component({
  selector: 'app-rendez-vous-view-admin',
  templateUrl: './rendez-vous-view-admin.component.html',
  styleUrls: ['./rendez-vous-view-admin.component.css']
})
export class RendezVousViewAdminComponent implements OnInit {

        selectedPieceJointeRendezVous: PieceJointeRendezVousVo = new PieceJointeRendezVousVo();
        pieceJointeRendezVousListe: Array<PieceJointeRendezVousVo> = [];



constructor(private datePipe: DatePipe, private rendezVousService: RendezVousService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private pieceJointeRendezVousService :PieceJointeRendezVousService
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewRendezVousDialog  = false;
}

// getters and setters

get rendezVouss(): Array<RendezVousVo> {
    return this.rendezVousService.rendezVouss;
       }
set rendezVouss(value: Array<RendezVousVo>) {
        this.rendezVousService.rendezVouss = value;
       }

 get selectedRendezVous():RendezVousVo {
           return this.rendezVousService.selectedRendezVous;
       }
    set selectedRendezVous(value: RendezVousVo) {
        this.rendezVousService.selectedRendezVous = value;
       }

   get viewRendezVousDialog():boolean {
           return this.rendezVousService.viewRendezVousDialog;

       }
    set viewRendezVousDialog(value: boolean) {
        this.rendezVousService.viewRendezVousDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
