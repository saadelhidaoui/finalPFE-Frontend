import {Component, OnInit} from '@angular/core';
import {DemandeEstivageCentreService} from '../../../../../../controller/service/DemandeEstivageCentre.service';
import {DemandeEstivageCentreVo} from '../../../../../../controller/model/DemandeEstivageCentre.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DemandeEstivageVo} from '../../../../../../controller/model/DemandeEstivage.model';
import {DemandeEstivageService} from '../../../../../../controller/service/DemandeEstivage.service';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';

@Component({
  selector: 'app-demande-estivage-centre-view-chercheur',
  templateUrl: './demande-estivage-centre-view-chercheur.component.html',
  styleUrls: ['./demande-estivage-centre-view-chercheur.component.css']
})
export class DemandeEstivageCentreViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private demandeEstivageCentreService: DemandeEstivageCentreService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private demandeEstivageService :DemandeEstivageService
    ,private centreEstivageService :CentreEstivageService
) {
}

// methods
ngOnInit(): void {
    this.selectedDemandeEstivage = new DemandeEstivageVo();
    this.demandeEstivageService.findAll().subscribe((data) => this.demandeEstivages = data);
    this.selectedCentreEstivage = new CentreEstivageVo();
    this.centreEstivageService.findAll().subscribe((data) => this.centreEstivages = data);
}

hideViewDialog(){
    this.viewDemandeEstivageCentreDialog  = false;
}

// getters and setters

get demandeEstivageCentres(): Array<DemandeEstivageCentreVo> {
    return this.demandeEstivageCentreService.demandeEstivageCentres;
       }
set demandeEstivageCentres(value: Array<DemandeEstivageCentreVo>) {
        this.demandeEstivageCentreService.demandeEstivageCentres = value;
       }

 get selectedDemandeEstivageCentre():DemandeEstivageCentreVo {
           return this.demandeEstivageCentreService.selectedDemandeEstivageCentre;
       }
    set selectedDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this.demandeEstivageCentreService.selectedDemandeEstivageCentre = value;
       }

   get viewDemandeEstivageCentreDialog():boolean {
           return this.demandeEstivageCentreService.viewDemandeEstivageCentreDialog;

       }
    set viewDemandeEstivageCentreDialog(value: boolean) {
        this.demandeEstivageCentreService.viewDemandeEstivageCentreDialog= value;
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
       get selectedDemandeEstivage():DemandeEstivageVo {
           return this.demandeEstivageService.selectedDemandeEstivage;
       }
      set selectedDemandeEstivage(value: DemandeEstivageVo) {
        this.demandeEstivageService.selectedDemandeEstivage = value;
       }
       get demandeEstivages():Array<DemandeEstivageVo> {
           return this.demandeEstivageService.demandeEstivages;
       }
       set demandeEstivages(value: Array<DemandeEstivageVo>) {
        this.demandeEstivageService.demandeEstivages = value;
       }
       get editDemandeEstivageDialog():boolean {
           return this.demandeEstivageService.editDemandeEstivageDialog;
       }
      set editDemandeEstivageDialog(value: boolean) {
        this.demandeEstivageService.editDemandeEstivageDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
