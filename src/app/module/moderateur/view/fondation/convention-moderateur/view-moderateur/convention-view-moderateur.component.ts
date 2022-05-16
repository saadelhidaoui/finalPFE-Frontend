import {Component, OnInit} from '@angular/core';
import {ConventionService} from '../../../../../../controller/service/Convention.service';
import {ConventionVo} from '../../../../../../controller/model/Convention.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {OrganismeVo} from '../../../../../../controller/model/Organisme.model';
import {OrganismeService} from '../../../../../../controller/service/Organisme.service';
import {PieceJointeConventionVo} from '../../../../../../controller/model/PieceJointeConvention.model';
import {PieceJointeConventionService} from '../../../../../../controller/service/PieceJointeConvention.service';

@Component({
  selector: 'app-convention-view-moderateur',
  templateUrl: './convention-view-moderateur.component.html',
  styleUrls: ['./convention-view-moderateur.component.css']
})
export class ConventionViewModerateurComponent implements OnInit {

        selectedPieceJointeConventions: PieceJointeConventionVo = new PieceJointeConventionVo();
        pieceJointeConventionsListe: Array<PieceJointeConventionVo> = [];



constructor(private datePipe: DatePipe, private conventionService: ConventionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private organismeService :OrganismeService
    ,private pieceJointeConventionService :PieceJointeConventionService
) {
}

// methods
ngOnInit(): void {
    this.selectedOrganisme = new OrganismeVo();
    this.organismeService.findAll().subscribe((data) => this.organismes = data);
}

hideViewDialog(){
    this.viewConventionDialog  = false;
}

// getters and setters

get conventions(): Array<ConventionVo> {
    return this.conventionService.conventions;
       }
set conventions(value: Array<ConventionVo>) {
        this.conventionService.conventions = value;
       }

 get selectedConvention():ConventionVo {
           return this.conventionService.selectedConvention;
       }
    set selectedConvention(value: ConventionVo) {
        this.conventionService.selectedConvention = value;
       }

   get viewConventionDialog():boolean {
           return this.conventionService.viewConventionDialog;

       }
    set viewConventionDialog(value: boolean) {
        this.conventionService.viewConventionDialog= value;
       }

       get selectedOrganisme():OrganismeVo {
           return this.organismeService.selectedOrganisme;
       }
      set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
       }
       get organismes():Array<OrganismeVo> {
           return this.organismeService.organismes;
       }
       set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
       }
       get editOrganismeDialog():boolean {
           return this.organismeService.editOrganismeDialog;
       }
      set editOrganismeDialog(value: boolean) {
        this.organismeService.editOrganismeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
