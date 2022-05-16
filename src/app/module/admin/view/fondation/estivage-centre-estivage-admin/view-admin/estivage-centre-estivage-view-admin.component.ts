import {Component, OnInit} from '@angular/core';
import {EstivageCentreEstivageService} from '../../../../../../controller/service/EstivageCentreEstivage.service';
import {EstivageCentreEstivageVo} from '../../../../../../controller/model/EstivageCentreEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';

@Component({
  selector: 'app-estivage-centre-estivage-view-admin',
  templateUrl: './estivage-centre-estivage-view-admin.component.html',
  styleUrls: ['./estivage-centre-estivage-view-admin.component.css']
})
export class EstivageCentreEstivageViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private estivageCentreEstivageService: EstivageCentreEstivageService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private centreEstivageService :CentreEstivageService
    ,private estivageService :EstivageService
) {
}

// methods
ngOnInit(): void {
    this.selectedCentreEstivage = new CentreEstivageVo();
    this.centreEstivageService.findAll().subscribe((data) => this.centreEstivages = data);
    this.selectedEstivage = new EstivageVo();
    this.estivageService.findAll().subscribe((data) => this.estivages = data);
}

hideViewDialog(){
    this.viewEstivageCentreEstivageDialog  = false;
}

// getters and setters

get estivageCentreEstivages(): Array<EstivageCentreEstivageVo> {
    return this.estivageCentreEstivageService.estivageCentreEstivages;
       }
set estivageCentreEstivages(value: Array<EstivageCentreEstivageVo>) {
        this.estivageCentreEstivageService.estivageCentreEstivages = value;
       }

 get selectedEstivageCentreEstivage():EstivageCentreEstivageVo {
           return this.estivageCentreEstivageService.selectedEstivageCentreEstivage;
       }
    set selectedEstivageCentreEstivage(value: EstivageCentreEstivageVo) {
        this.estivageCentreEstivageService.selectedEstivageCentreEstivage = value;
       }

   get viewEstivageCentreEstivageDialog():boolean {
           return this.estivageCentreEstivageService.viewEstivageCentreEstivageDialog;

       }
    set viewEstivageCentreEstivageDialog(value: boolean) {
        this.estivageCentreEstivageService.viewEstivageCentreEstivageDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
