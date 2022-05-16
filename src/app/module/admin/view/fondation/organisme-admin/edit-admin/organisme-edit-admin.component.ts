import {Component, OnInit} from '@angular/core';
import {OrganismeService} from '../../../../../../controller/service/Organisme.service';
import {OrganismeVo} from '../../../../../../controller/model/Organisme.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';

@Component({
  selector: 'app-organisme-edit-admin',
  templateUrl: './organisme-edit-admin.component.html',
  styleUrls: ['./organisme-edit-admin.component.css']
})
export class OrganismeEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private organismeService: OrganismeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private villeService: VilleService
) {
}

// methods
ngOnInit(): void {
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.organismeService.edit().subscribe(organisme=>{
    const myIndex = this.organismes.findIndex(e => e.id === this.selectedOrganisme.id);
    this.organismes[myIndex] = this.selectedOrganisme;
    this.editOrganismeDialog = false;
    this.selectedOrganisme = new OrganismeVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editOrganismeDialog  = false;
}

// getters and setters

get organismes(): Array<OrganismeVo> {
    return this.organismeService.organismes;
       }
set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
       }

 get selectedOrganisme(): OrganismeVo {
           return this.organismeService.selectedOrganisme;
       }
    set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
       }

   get editOrganismeDialog(): boolean {
           return this.organismeService.editOrganismeDialog;

       }
    set editOrganismeDialog(value: boolean) {
        this.organismeService.editOrganismeDialog = value;
       }

       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
