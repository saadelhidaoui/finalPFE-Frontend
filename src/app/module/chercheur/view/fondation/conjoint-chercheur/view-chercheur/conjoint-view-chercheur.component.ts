import {Component, OnInit} from '@angular/core';
import {ConjointService} from '../../../../../../controller/service/Conjoint.service';
import {ConjointVo} from '../../../../../../controller/model/Conjoint.model';
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
  selector: 'app-conjoint-view-chercheur',
  templateUrl: './conjoint-view-chercheur.component.html',
  styleUrls: ['./conjoint-view-chercheur.component.css']
})
export class ConjointViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private conjointService: ConjointService
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
    this.viewConjointDialog  = false;
}

// getters and setters

get conjoints(): Array<ConjointVo> {
    return this.conjointService.conjoints;
       }
set conjoints(value: Array<ConjointVo>) {
        this.conjointService.conjoints = value;
       }

 get selectedConjoint():ConjointVo {
           return this.conjointService.selectedConjoint;
       }
    set selectedConjoint(value: ConjointVo) {
        this.conjointService.selectedConjoint = value;
       }

   get viewConjointDialog():boolean {
           return this.conjointService.viewConjointDialog;

       }
    set viewConjointDialog(value: boolean) {
        this.conjointService.viewConjointDialog= value;
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
