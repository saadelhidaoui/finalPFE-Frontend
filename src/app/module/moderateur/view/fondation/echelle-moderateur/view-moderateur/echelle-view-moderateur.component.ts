import {Component, OnInit} from '@angular/core';
import {EchelleService} from '../../../../../../controller/service/Echelle.service';
import {EchelleVo} from '../../../../../../controller/model/Echelle.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EchelonVo} from '../../../../../../controller/model/Echelon.model';
import {EchelonService} from '../../../../../../controller/service/Echelon.service';

@Component({
  selector: 'app-echelle-view-moderateur',
  templateUrl: './echelle-view-moderateur.component.html',
  styleUrls: ['./echelle-view-moderateur.component.css']
})
export class EchelleViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private echelleService: EchelleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private echelonService :EchelonService
) {
}

// methods
ngOnInit(): void {
    this.selectedEchelon = new EchelonVo();
    this.echelonService.findAll().subscribe((data) => this.echelons = data);
}

hideViewDialog(){
    this.viewEchelleDialog  = false;
}

// getters and setters

get echelles(): Array<EchelleVo> {
    return this.echelleService.echelles;
       }
set echelles(value: Array<EchelleVo>) {
        this.echelleService.echelles = value;
       }

 get selectedEchelle():EchelleVo {
           return this.echelleService.selectedEchelle;
       }
    set selectedEchelle(value: EchelleVo) {
        this.echelleService.selectedEchelle = value;
       }

   get viewEchelleDialog():boolean {
           return this.echelleService.viewEchelleDialog;

       }
    set viewEchelleDialog(value: boolean) {
        this.echelleService.viewEchelleDialog= value;
       }

       get selectedEchelon():EchelonVo {
           return this.echelonService.selectedEchelon;
       }
      set selectedEchelon(value: EchelonVo) {
        this.echelonService.selectedEchelon = value;
       }
       get echelons():Array<EchelonVo> {
           return this.echelonService.echelons;
       }
       set echelons(value: Array<EchelonVo>) {
        this.echelonService.echelons = value;
       }
       get editEchelonDialog():boolean {
           return this.echelonService.editEchelonDialog;
       }
      set editEchelonDialog(value: boolean) {
        this.echelonService.editEchelonDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
