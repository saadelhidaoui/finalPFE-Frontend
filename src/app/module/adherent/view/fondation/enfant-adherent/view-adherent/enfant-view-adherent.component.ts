import {Component, OnInit} from '@angular/core';
import {EnfantService} from '../../../../../../controller/service/Enfant.service';
import {EnfantVo} from '../../../../../../controller/model/Enfant.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';

@Component({
  selector: 'app-enfant-view-adherent',
  templateUrl: './enfant-view-adherent.component.html',
  styleUrls: ['./enfant-view-adherent.component.css']
})
export class EnfantViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private enfantService: EnfantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private adherentService :AdherentService
    ,private qualiteService :QualiteService
) {
}

// methods
ngOnInit(): void {
    this.selectedQualite = new QualiteVo();
    this.qualiteService.findAll().subscribe((data) => this.qualites = data);
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
}

hideViewDialog(){
    this.viewEnfantDialog  = false;
}

// getters and setters

get enfants(): Array<EnfantVo> {
    return this.enfantService.enfants;
       }
set enfants(value: Array<EnfantVo>) {
        this.enfantService.enfants = value;
       }

 get selectedEnfant():EnfantVo {
           return this.enfantService.selectedEnfant;
       }
    set selectedEnfant(value: EnfantVo) {
        this.enfantService.selectedEnfant = value;
       }

   get viewEnfantDialog():boolean {
           return this.enfantService.viewEnfantDialog;

       }
    set viewEnfantDialog(value: boolean) {
        this.enfantService.viewEnfantDialog= value;
       }

       get selectedQualite():QualiteVo {
           return this.qualiteService.selectedQualite;
       }
      set selectedQualite(value: QualiteVo) {
        this.qualiteService.selectedQualite = value;
       }
       get qualites():Array<QualiteVo> {
           return this.qualiteService.qualites;
       }
       set qualites(value: Array<QualiteVo>) {
        this.qualiteService.qualites = value;
       }
       get editQualiteDialog():boolean {
           return this.qualiteService.editQualiteDialog;
       }
      set editQualiteDialog(value: boolean) {
        this.qualiteService.editQualiteDialog= value;
       }
       get selectedAdherent():AdherentVo {
           return this.adherentService.selectedAdherent;
       }
      set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }
       get adherents():Array<AdherentVo> {
           return this.adherentService.adherents;
       }
       set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }
       get editAdherentDialog():boolean {
           return this.adherentService.editAdherentDialog;
       }
      set editAdherentDialog(value: boolean) {
        this.adherentService.editAdherentDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
