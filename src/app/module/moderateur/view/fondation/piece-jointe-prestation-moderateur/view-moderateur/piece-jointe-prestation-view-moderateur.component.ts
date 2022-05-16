import {Component, OnInit} from '@angular/core';
import {PieceJointePrestationService} from '../../../../../../controller/service/PieceJointePrestation.service';
import {PieceJointePrestationVo} from '../../../../../../controller/model/PieceJointePrestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PrestationVo} from '../../../../../../controller/model/Prestation.model';
import {PrestationService} from '../../../../../../controller/service/Prestation.service';

@Component({
  selector: 'app-piece-jointe-prestation-view-moderateur',
  templateUrl: './piece-jointe-prestation-view-moderateur.component.html',
  styleUrls: ['./piece-jointe-prestation-view-moderateur.component.css']
})
export class PieceJointePrestationViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointePrestationService: PieceJointePrestationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private prestationService :PrestationService
) {
}

// methods
ngOnInit(): void {
    this.selectedPrestation = new PrestationVo();
    this.prestationService.findAll().subscribe((data) => this.prestations = data);
}

hideViewDialog(){
    this.viewPieceJointePrestationDialog  = false;
}

// getters and setters

get pieceJointePrestations(): Array<PieceJointePrestationVo> {
    return this.pieceJointePrestationService.pieceJointePrestations;
       }
set pieceJointePrestations(value: Array<PieceJointePrestationVo>) {
        this.pieceJointePrestationService.pieceJointePrestations = value;
       }

 get selectedPieceJointePrestation():PieceJointePrestationVo {
           return this.pieceJointePrestationService.selectedPieceJointePrestation;
       }
    set selectedPieceJointePrestation(value: PieceJointePrestationVo) {
        this.pieceJointePrestationService.selectedPieceJointePrestation = value;
       }

   get viewPieceJointePrestationDialog():boolean {
           return this.pieceJointePrestationService.viewPieceJointePrestationDialog;

       }
    set viewPieceJointePrestationDialog(value: boolean) {
        this.pieceJointePrestationService.viewPieceJointePrestationDialog= value;
       }

       get selectedPrestation():PrestationVo {
           return this.prestationService.selectedPrestation;
       }
      set selectedPrestation(value: PrestationVo) {
        this.prestationService.selectedPrestation = value;
       }
       get prestations():Array<PrestationVo> {
           return this.prestationService.prestations;
       }
       set prestations(value: Array<PrestationVo>) {
        this.prestationService.prestations = value;
       }
       get editPrestationDialog():boolean {
           return this.prestationService.editPrestationDialog;
       }
      set editPrestationDialog(value: boolean) {
        this.prestationService.editPrestationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
