import {Component, OnInit} from '@angular/core';
import {PieceJointeReclamationService} from '../../../../../../controller/service/PieceJointeReclamation.service';
import {PieceJointeReclamationVo} from '../../../../../../controller/model/PieceJointeReclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';

@Component({
  selector: 'app-piece-jointe-reclamation-view-adherent',
  templateUrl: './piece-jointe-reclamation-view-adherent.component.html',
  styleUrls: ['./piece-jointe-reclamation-view-adherent.component.css']
})
export class PieceJointeReclamationViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeReclamationService: PieceJointeReclamationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private reclamationService :ReclamationService
) {
}

// methods
ngOnInit(): void {
    this.selectedReclamation = new ReclamationVo();
    this.reclamationService.findAll().subscribe((data) => this.reclamations = data);
}

hideViewDialog(){
    this.viewPieceJointeReclamationDialog  = false;
}

// getters and setters

get pieceJointeReclamations(): Array<PieceJointeReclamationVo> {
    return this.pieceJointeReclamationService.pieceJointeReclamations;
       }
set pieceJointeReclamations(value: Array<PieceJointeReclamationVo>) {
        this.pieceJointeReclamationService.pieceJointeReclamations = value;
       }

 get selectedPieceJointeReclamation():PieceJointeReclamationVo {
           return this.pieceJointeReclamationService.selectedPieceJointeReclamation;
       }
    set selectedPieceJointeReclamation(value: PieceJointeReclamationVo) {
        this.pieceJointeReclamationService.selectedPieceJointeReclamation = value;
       }

   get viewPieceJointeReclamationDialog():boolean {
           return this.pieceJointeReclamationService.viewPieceJointeReclamationDialog;

       }
    set viewPieceJointeReclamationDialog(value: boolean) {
        this.pieceJointeReclamationService.viewPieceJointeReclamationDialog= value;
       }

       get selectedReclamation():ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
      set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }
       get reclamations():Array<ReclamationVo> {
           return this.reclamationService.reclamations;
       }
       set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }
       get editReclamationDialog():boolean {
           return this.reclamationService.editReclamationDialog;
       }
      set editReclamationDialog(value: boolean) {
        this.reclamationService.editReclamationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
