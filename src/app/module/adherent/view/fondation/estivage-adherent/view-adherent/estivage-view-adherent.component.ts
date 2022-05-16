import {Component, OnInit} from '@angular/core';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';
import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import {NiveauImportanceService} from '../../../../../../controller/service/NiveauImportance.service';

@Component({
  selector: 'app-estivage-view-adherent',
  templateUrl: './estivage-view-adherent.component.html',
  styleUrls: ['./estivage-view-adherent.component.css']
})
export class EstivageViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private estivageService: EstivageService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private centreEstivageService :CentreEstivageService
    ,private niveauImportanceService :NiveauImportanceService
) {
}

// methods
ngOnInit(): void {
    this.selectedCentreEstivage = new CentreEstivageVo();
    this.centreEstivageService.findAll().subscribe((data) => this.centreEstivages = data);
    this.selectedNiveauImportance = new NiveauImportanceVo();
    this.niveauImportanceService.findAll().subscribe((data) => this.niveauImportances = data);
}

hideViewDialog(){
    this.viewEstivageDialog  = false;
}

// getters and setters

get estivages(): Array<EstivageVo> {
    return this.estivageService.estivages;
       }
set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }

 get selectedEstivage():EstivageVo {
           return this.estivageService.selectedEstivage;
       }
    set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
       }

   get viewEstivageDialog():boolean {
           return this.estivageService.viewEstivageDialog;

       }
    set viewEstivageDialog(value: boolean) {
        this.estivageService.viewEstivageDialog= value;
       }

       get selectedCentreEstivage():CentreEstivageVo {
           return this.centreEstivageService.selectedCentreEstivage;
       }
      set selectedCentreEstivage(value: CentreEstivageVo) {
        this.centreEstivageService.selectedCentreEstivage = value;
       }
       get centreEstivages():Array<CentreEstivageVo> {
           return this.centreEstivageService.centreEstivages;
       }
       set centreEstivages(value: Array<CentreEstivageVo>) {
        this.centreEstivageService.centreEstivages = value;
       }
       get editCentreEstivageDialog():boolean {
           return this.centreEstivageService.editCentreEstivageDialog;
       }
      set editCentreEstivageDialog(value: boolean) {
        this.centreEstivageService.editCentreEstivageDialog= value;
       }
       get selectedNiveauImportance():NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
      set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }
       get niveauImportances():Array<NiveauImportanceVo> {
           return this.niveauImportanceService.niveauImportances;
       }
       set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
       }
       get editNiveauImportanceDialog():boolean {
           return this.niveauImportanceService.editNiveauImportanceDialog;
       }
      set editNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.editNiveauImportanceDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
