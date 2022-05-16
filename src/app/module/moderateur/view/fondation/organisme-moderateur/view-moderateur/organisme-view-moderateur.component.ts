import {Component, OnInit} from '@angular/core';
import {OrganismeService} from '../../../../../../controller/service/Organisme.service';
import {OrganismeVo} from '../../../../../../controller/model/Organisme.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';

@Component({
  selector: 'app-organisme-view-moderateur',
  templateUrl: './organisme-view-moderateur.component.html',
  styleUrls: ['./organisme-view-moderateur.component.css']
})
export class OrganismeViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private organismeService: OrganismeService
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
    this.viewOrganismeDialog  = false;
}

// getters and setters

get organismes(): Array<OrganismeVo> {
    return this.organismeService.organismes;
       }
set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
       }

 get selectedOrganisme():OrganismeVo {
           return this.organismeService.selectedOrganisme;
       }
    set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
       }

   get viewOrganismeDialog():boolean {
           return this.organismeService.viewOrganismeDialog;

       }
    set viewOrganismeDialog(value: boolean) {
        this.organismeService.viewOrganismeDialog= value;
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
