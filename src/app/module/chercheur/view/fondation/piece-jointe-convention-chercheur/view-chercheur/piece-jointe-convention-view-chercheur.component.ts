import {Component, OnInit} from '@angular/core';
import {PieceJointeConventionService} from '../../../../../../controller/service/PieceJointeConvention.service';
import {PieceJointeConventionVo} from '../../../../../../controller/model/PieceJointeConvention.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConventionVo} from '../../../../../../controller/model/Convention.model';
import {ConventionService} from '../../../../../../controller/service/Convention.service';

@Component({
  selector: 'app-piece-jointe-convention-view-chercheur',
  templateUrl: './piece-jointe-convention-view-chercheur.component.html',
  styleUrls: ['./piece-jointe-convention-view-chercheur.component.css']
})
export class PieceJointeConventionViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeConventionService: PieceJointeConventionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private conventionService :ConventionService
) {
}

// methods
ngOnInit(): void {
    this.selectedConvention = new ConventionVo();
    this.conventionService.findAll().subscribe((data) => this.conventions = data);
}

hideViewDialog(){
    this.viewPieceJointeConventionDialog  = false;
}

// getters and setters

get pieceJointeConventions(): Array<PieceJointeConventionVo> {
    return this.pieceJointeConventionService.pieceJointeConventions;
       }
set pieceJointeConventions(value: Array<PieceJointeConventionVo>) {
        this.pieceJointeConventionService.pieceJointeConventions = value;
       }

 get selectedPieceJointeConvention():PieceJointeConventionVo {
           return this.pieceJointeConventionService.selectedPieceJointeConvention;
       }
    set selectedPieceJointeConvention(value: PieceJointeConventionVo) {
        this.pieceJointeConventionService.selectedPieceJointeConvention = value;
       }

   get viewPieceJointeConventionDialog():boolean {
           return this.pieceJointeConventionService.viewPieceJointeConventionDialog;

       }
    set viewPieceJointeConventionDialog(value: boolean) {
        this.pieceJointeConventionService.viewPieceJointeConventionDialog= value;
       }

       get selectedConvention():ConventionVo {
           return this.conventionService.selectedConvention;
       }
      set selectedConvention(value: ConventionVo) {
        this.conventionService.selectedConvention = value;
       }
       get conventions():Array<ConventionVo> {
           return this.conventionService.conventions;
       }
       set conventions(value: Array<ConventionVo>) {
        this.conventionService.conventions = value;
       }
       get editConventionDialog():boolean {
           return this.conventionService.editConventionDialog;
       }
      set editConventionDialog(value: boolean) {
        this.conventionService.editConventionDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
