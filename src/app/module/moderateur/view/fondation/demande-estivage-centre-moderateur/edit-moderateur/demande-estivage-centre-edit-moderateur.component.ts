import {Component, OnInit} from '@angular/core';
import {DemandeEstivageCentreService} from '../../../../../../controller/service/DemandeEstivageCentre.service';
import {DemandeEstivageCentreVo} from '../../../../../../controller/model/DemandeEstivageCentre.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DemandeEstivageVo} from '../../../../../../controller/model/DemandeEstivage.model';
import {DemandeEstivageService} from '../../../../../../controller/service/DemandeEstivage.service';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';

@Component({
  selector: 'app-demande-estivage-centre-edit-moderateur',
  templateUrl: './demande-estivage-centre-edit-moderateur.component.html',
  styleUrls: ['./demande-estivage-centre-edit-moderateur.component.css']
})
export class DemandeEstivageCentreEditModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private demandeEstivageCentreService: DemandeEstivageCentreService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private demandeEstivageService: DemandeEstivageService
 ,       private centreEstivageService: CentreEstivageService
) {
}

// methods
ngOnInit(): void {
    this.selectedDemandeEstivage = new DemandeEstivageVo();
    this.demandeEstivageService.findAll().subscribe((data) => this.demandeEstivages = data);
    this.selectedCentreEstivage = new CentreEstivageVo();
    this.centreEstivageService.findAll().subscribe((data) => this.centreEstivages = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.demandeEstivageCentreService.edit().subscribe(demandeEstivageCentre=>{
    const myIndex = this.demandeEstivageCentres.findIndex(e => e.id === this.selectedDemandeEstivageCentre.id);
    this.demandeEstivageCentres[myIndex] = this.selectedDemandeEstivageCentre;
    this.editDemandeEstivageCentreDialog = false;
    this.selectedDemandeEstivageCentre = new DemandeEstivageCentreVo();


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
              public async openCreatedemandeEstivage(demandeEstivage: string) {
                      const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'add');
                       if(isPermistted){
         this.selectedDemandeEstivage = new DemandeEstivageVo();
        this.createDemandeEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDemandeEstivageCentreDialog  = false;
}

// getters and setters

get demandeEstivageCentres(): Array<DemandeEstivageCentreVo> {
    return this.demandeEstivageCentreService.demandeEstivageCentres;
       }
set demandeEstivageCentres(value: Array<DemandeEstivageCentreVo>) {
        this.demandeEstivageCentreService.demandeEstivageCentres = value;
       }

 get selectedDemandeEstivageCentre(): DemandeEstivageCentreVo {
           return this.demandeEstivageCentreService.selectedDemandeEstivageCentre;
       }
    set selectedDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this.demandeEstivageCentreService.selectedDemandeEstivageCentre = value;
       }

   get editDemandeEstivageCentreDialog(): boolean {
           return this.demandeEstivageCentreService.editDemandeEstivageCentreDialog;

       }
    set editDemandeEstivageCentreDialog(value: boolean) {
        this.demandeEstivageCentreService.editDemandeEstivageCentreDialog = value;
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
       get selectedDemandeEstivage(): DemandeEstivageVo {
           return this.demandeEstivageService.selectedDemandeEstivage;
       }
      set selectedDemandeEstivage(value: DemandeEstivageVo) {
        this.demandeEstivageService.selectedDemandeEstivage = value;
       }
       get demandeEstivages(): Array<DemandeEstivageVo> {
           return this.demandeEstivageService.demandeEstivages;
       }
       set demandeEstivages(value: Array<DemandeEstivageVo>) {
        this.demandeEstivageService.demandeEstivages = value;
       }
       get createDemandeEstivageDialog(): boolean {
           return this.demandeEstivageService.createDemandeEstivageDialog;
       }
      set createDemandeEstivageDialog(value: boolean) {
        this.demandeEstivageService.createDemandeEstivageDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
