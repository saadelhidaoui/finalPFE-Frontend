import {Component, OnInit} from '@angular/core';
import {ProfilService} from '../../../../../../controller/service/Profil.service';
import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {GradeVo} from '../../../../../../controller/model/Grade.model';
import {GradeService} from '../../../../../../controller/service/Grade.service';
import {EchelleVo} from '../../../../../../controller/model/Echelle.model';
import {EchelleService} from '../../../../../../controller/service/Echelle.service';

@Component({
  selector: 'app-profil-view-admin',
  templateUrl: './profil-view-admin.component.html',
  styleUrls: ['./profil-view-admin.component.css']
})
export class ProfilViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private profilService: ProfilService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private gradeService :GradeService
    ,private echelleService :EchelleService
) {
}

// methods
ngOnInit(): void {
    this.selectedGrade = new GradeVo();
    this.gradeService.findAll().subscribe((data) => this.grades = data);
    this.selectedEchelle = new EchelleVo();
    this.echelleService.findAll().subscribe((data) => this.echelles = data);
}

hideViewDialog(){
    this.viewProfilDialog  = false;
}

// getters and setters

get profils(): Array<ProfilVo> {
    return this.profilService.profils;
       }
set profils(value: Array<ProfilVo>) {
        this.profilService.profils = value;
       }

 get selectedProfil():ProfilVo {
           return this.profilService.selectedProfil;
       }
    set selectedProfil(value: ProfilVo) {
        this.profilService.selectedProfil = value;
       }

   get viewProfilDialog():boolean {
           return this.profilService.viewProfilDialog;

       }
    set viewProfilDialog(value: boolean) {
        this.profilService.viewProfilDialog= value;
       }

       get selectedEchelle():EchelleVo {
           return this.echelleService.selectedEchelle;
       }
      set selectedEchelle(value: EchelleVo) {
        this.echelleService.selectedEchelle = value;
       }
       get echelles():Array<EchelleVo> {
           return this.echelleService.echelles;
       }
       set echelles(value: Array<EchelleVo>) {
        this.echelleService.echelles = value;
       }
       get editEchelleDialog():boolean {
           return this.echelleService.editEchelleDialog;
       }
      set editEchelleDialog(value: boolean) {
        this.echelleService.editEchelleDialog= value;
       }
       get selectedGrade():GradeVo {
           return this.gradeService.selectedGrade;
       }
      set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
       }
       get grades():Array<GradeVo> {
           return this.gradeService.grades;
       }
       set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
       }
       get editGradeDialog():boolean {
           return this.gradeService.editGradeDialog;
       }
      set editGradeDialog(value: boolean) {
        this.gradeService.editGradeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
