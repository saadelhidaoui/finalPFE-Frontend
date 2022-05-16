import {Component, OnInit} from '@angular/core';
import {PieceJointeAdherentService} from '../../../../../../controller/service/PieceJointeAdherent.service';
import {PieceJointeAdherentVo} from '../../../../../../controller/model/PieceJointeAdherent.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';

@Component({
  selector: 'app-piece-jointe-adherent-view-adherent',
  templateUrl: './piece-jointe-adherent-view-adherent.component.html',
  styleUrls: ['./piece-jointe-adherent-view-adherent.component.css']
})
export class PieceJointeAdherentViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeAdherentService: PieceJointeAdherentService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private adherentService :AdherentService
) {
}

// methods
ngOnInit(): void {
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
}

hideViewDialog(){
    this.viewPieceJointeAdherentDialog  = false;
}

// getters and setters

get pieceJointeAdherents(): Array<PieceJointeAdherentVo> {
    return this.pieceJointeAdherentService.pieceJointeAdherents;
       }
set pieceJointeAdherents(value: Array<PieceJointeAdherentVo>) {
        this.pieceJointeAdherentService.pieceJointeAdherents = value;
       }

 get selectedPieceJointeAdherent():PieceJointeAdherentVo {
           return this.pieceJointeAdherentService.selectedPieceJointeAdherent;
       }
    set selectedPieceJointeAdherent(value: PieceJointeAdherentVo) {
        this.pieceJointeAdherentService.selectedPieceJointeAdherent = value;
       }

   get viewPieceJointeAdherentDialog():boolean {
           return this.pieceJointeAdherentService.viewPieceJointeAdherentDialog;

       }
    set viewPieceJointeAdherentDialog(value: boolean) {
        this.pieceJointeAdherentService.viewPieceJointeAdherentDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
