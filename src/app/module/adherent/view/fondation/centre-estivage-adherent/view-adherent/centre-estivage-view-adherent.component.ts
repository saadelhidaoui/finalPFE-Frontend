import {Component, OnInit} from '@angular/core';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';

@Component({
  selector: 'app-centre-estivage-view-adherent',
  templateUrl: './centre-estivage-view-adherent.component.html',
  styleUrls: ['./centre-estivage-view-adherent.component.css']
})
export class CentreEstivageViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private centreEstivageService: CentreEstivageService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private villeService :VilleService
) {
}

// methods
ngOnInit(): void {
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
}

hideViewDialog(){
    this.viewCentreEstivageDialog  = false;
}

// getters and setters

get centreEstivages(): Array<CentreEstivageVo> {
    return this.centreEstivageService.centreEstivages;
       }
set centreEstivages(value: Array<CentreEstivageVo>) {
        this.centreEstivageService.centreEstivages = value;
       }

 get selectedCentreEstivage():CentreEstivageVo {
           return this.centreEstivageService.selectedCentreEstivage;
       }
    set selectedCentreEstivage(value: CentreEstivageVo) {
        this.centreEstivageService.selectedCentreEstivage = value;
       }

   get viewCentreEstivageDialog():boolean {
           return this.centreEstivageService.viewCentreEstivageDialog;

       }
    set viewCentreEstivageDialog(value: boolean) {
        this.centreEstivageService.viewCentreEstivageDialog= value;
       }

       get selectedVille():VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes():Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get editVilleDialog():boolean {
           return this.villeService.editVilleDialog;
       }
      set editVilleDialog(value: boolean) {
        this.villeService.editVilleDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
