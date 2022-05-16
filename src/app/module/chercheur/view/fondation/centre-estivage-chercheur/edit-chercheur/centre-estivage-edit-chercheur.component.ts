import {Component, OnInit} from '@angular/core';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
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
  selector: 'app-centre-estivage-edit-chercheur',
  templateUrl: './centre-estivage-edit-chercheur.component.html',
  styleUrls: ['./centre-estivage-edit-chercheur.component.css']
})
export class CentreEstivageEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private centreEstivageService: CentreEstivageService
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
    this.centreEstivageService.edit().subscribe(centreEstivage=>{
    const myIndex = this.centreEstivages.findIndex(e => e.id === this.selectedCentreEstivage.id);
    this.centreEstivages[myIndex] = this.selectedCentreEstivage;
    this.editCentreEstivageDialog = false;
    this.selectedCentreEstivage = new CentreEstivageVo();


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
    this.editCentreEstivageDialog  = false;
}

// getters and setters

get centreEstivages(): Array<CentreEstivageVo> {
    return this.centreEstivageService.centreEstivages;
       }
set centreEstivages(value: Array<CentreEstivageVo>) {
        this.centreEstivageService.centreEstivages = value;
       }

 get selectedCentreEstivage(): CentreEstivageVo {
           return this.centreEstivageService.selectedCentreEstivage;
       }
    set selectedCentreEstivage(value: CentreEstivageVo) {
        this.centreEstivageService.selectedCentreEstivage = value;
       }

   get editCentreEstivageDialog(): boolean {
           return this.centreEstivageService.editCentreEstivageDialog;

       }
    set editCentreEstivageDialog(value: boolean) {
        this.centreEstivageService.editCentreEstivageDialog = value;
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
