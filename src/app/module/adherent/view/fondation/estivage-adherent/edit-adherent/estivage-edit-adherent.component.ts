import {Component, OnInit} from '@angular/core';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';
import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import {NiveauImportanceService} from '../../../../../../controller/service/NiveauImportance.service';

@Component({
  selector: 'app-estivage-edit-adherent',
  templateUrl: './estivage-edit-adherent.component.html',
  styleUrls: ['./estivage-edit-adherent.component.css']
})
export class EstivageEditAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private estivageService: EstivageService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private centreEstivageService: CentreEstivageService
 ,       private niveauImportanceService: NiveauImportanceService
) {
}

// methods
ngOnInit(): void {
    this.selectedCentreEstivage = new CentreEstivageVo();
    this.centreEstivageService.findAll().subscribe((data) => this.centreEstivages = data);
    this.selectedNiveauImportance = new NiveauImportanceVo();
    this.niveauImportanceService.findAll().subscribe((data) => this.niveauImportances = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedEstivage.dateEnvoi = DateUtils.toDate(this.selectedEstivage.dateEnvoi);
            this.selectedEstivage.dateArchivage = DateUtils.toDate(this.selectedEstivage.dateArchivage);
            this.selectedEstivage.dateCreation = DateUtils.toDate(this.selectedEstivage.dateCreation);
    this.estivageService.edit().subscribe(estivage=>{
    const myIndex = this.estivages.findIndex(e => e.id === this.selectedEstivage.id);
    this.estivages[myIndex] = this.selectedEstivage;
    this.editEstivageDialog = false;
    this.selectedEstivage = new EstivageVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatecentreEstivage(centreEstivage: string) {
                      const isPermistted = await this.roleService.isPermitted('CentreEstivage', 'add');
                       if(isPermistted){
         this.selectedCentreEstivage = new CentreEstivageVo();
        this.createCentreEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateniveauImportance(niveauImportance: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauImportance', 'add');
                       if(isPermistted){
         this.selectedNiveauImportance = new NiveauImportanceVo();
        this.createNiveauImportanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEstivageDialog  = false;
}

// getters and setters

get estivages(): Array<EstivageVo> {
    return this.estivageService.estivages;
       }
set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }

 get selectedEstivage(): EstivageVo {
           return this.estivageService.selectedEstivage;
       }
    set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
       }

   get editEstivageDialog(): boolean {
           return this.estivageService.editEstivageDialog;

       }
    set editEstivageDialog(value: boolean) {
        this.estivageService.editEstivageDialog = value;
       }

       get selectedCentreEstivage(): CentreEstivageVo {
           return this.centreEstivageService.selectedCentreEstivage;
       }
      set selectedCentreEstivage(value: CentreEstivageVo) {
        this.centreEstivageService.selectedCentreEstivage = value;
       }
       get centreEstivages(): Array<CentreEstivageVo> {
           return this.centreEstivageService.centreEstivages;
       }
       set centreEstivages(value: Array<CentreEstivageVo>) {
        this.centreEstivageService.centreEstivages = value;
       }
       get createCentreEstivageDialog(): boolean {
           return this.centreEstivageService.createCentreEstivageDialog;
       }
      set createCentreEstivageDialog(value: boolean) {
        this.centreEstivageService.createCentreEstivageDialog= value;
       }
       get selectedNiveauImportance(): NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
      set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }
       get niveauImportances(): Array<NiveauImportanceVo> {
           return this.niveauImportanceService.niveauImportances;
       }
       set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
       }
       get createNiveauImportanceDialog(): boolean {
           return this.niveauImportanceService.createNiveauImportanceDialog;
       }
      set createNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.createNiveauImportanceDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
