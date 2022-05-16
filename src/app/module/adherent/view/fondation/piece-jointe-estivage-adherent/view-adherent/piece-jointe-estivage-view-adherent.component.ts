import {Component, OnInit} from '@angular/core';
import {PieceJointeEstivageService} from '../../../../../../controller/service/PieceJointeEstivage.service';
import {PieceJointeEstivageVo} from '../../../../../../controller/model/PieceJointeEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';

@Component({
  selector: 'app-piece-jointe-estivage-view-adherent',
  templateUrl: './piece-jointe-estivage-view-adherent.component.html',
  styleUrls: ['./piece-jointe-estivage-view-adherent.component.css']
})
export class PieceJointeEstivageViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeEstivageService: PieceJointeEstivageService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private estivageService :EstivageService
) {
}

// methods
ngOnInit(): void {
    this.selectedEstivage = new EstivageVo();
    this.estivageService.findAll().subscribe((data) => this.estivages = data);
}

hideViewDialog(){
    this.viewPieceJointeEstivageDialog  = false;
}

// getters and setters

get pieceJointeEstivages(): Array<PieceJointeEstivageVo> {
    return this.pieceJointeEstivageService.pieceJointeEstivages;
       }
set pieceJointeEstivages(value: Array<PieceJointeEstivageVo>) {
        this.pieceJointeEstivageService.pieceJointeEstivages = value;
       }

 get selectedPieceJointeEstivage():PieceJointeEstivageVo {
           return this.pieceJointeEstivageService.selectedPieceJointeEstivage;
       }
    set selectedPieceJointeEstivage(value: PieceJointeEstivageVo) {
        this.pieceJointeEstivageService.selectedPieceJointeEstivage = value;
       }

   get viewPieceJointeEstivageDialog():boolean {
           return this.pieceJointeEstivageService.viewPieceJointeEstivageDialog;

       }
    set viewPieceJointeEstivageDialog(value: boolean) {
        this.pieceJointeEstivageService.viewPieceJointeEstivageDialog= value;
       }

       get selectedEstivage():EstivageVo {
           return this.estivageService.selectedEstivage;
       }
      set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
       }
       get estivages():Array<EstivageVo> {
           return this.estivageService.estivages;
       }
       set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }
       get editEstivageDialog():boolean {
           return this.estivageService.editEstivageDialog;
       }
      set editEstivageDialog(value: boolean) {
        this.estivageService.editEstivageDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
