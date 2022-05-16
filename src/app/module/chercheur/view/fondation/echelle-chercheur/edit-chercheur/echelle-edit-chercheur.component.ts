import {Component, OnInit} from '@angular/core';
import {EchelleService} from '../../../../../../controller/service/Echelle.service';
import {EchelleVo} from '../../../../../../controller/model/Echelle.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EchelonVo} from '../../../../../../controller/model/Echelon.model';
import {EchelonService} from '../../../../../../controller/service/Echelon.service';

@Component({
  selector: 'app-echelle-edit-chercheur',
  templateUrl: './echelle-edit-chercheur.component.html',
  styleUrls: ['./echelle-edit-chercheur.component.css']
})
export class EchelleEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private echelleService: EchelleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private echelonService: EchelonService
) {
}

// methods
ngOnInit(): void {
    this.selectedEchelon = new EchelonVo();
    this.echelonService.findAll().subscribe((data) => this.echelons = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.echelleService.edit().subscribe(echelle=>{
    const myIndex = this.echelles.findIndex(e => e.id === this.selectedEchelle.id);
    this.echelles[myIndex] = this.selectedEchelle;
    this.editEchelleDialog = false;
    this.selectedEchelle = new EchelleVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateechelon(echelon: string) {
                      const isPermistted = await this.roleService.isPermitted('Echelon', 'add');
                       if(isPermistted){
         this.selectedEchelon = new EchelonVo();
        this.createEchelonDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEchelleDialog  = false;
}

// getters and setters

get echelles(): Array<EchelleVo> {
    return this.echelleService.echelles;
       }
set echelles(value: Array<EchelleVo>) {
        this.echelleService.echelles = value;
       }

 get selectedEchelle(): EchelleVo {
           return this.echelleService.selectedEchelle;
       }
    set selectedEchelle(value: EchelleVo) {
        this.echelleService.selectedEchelle = value;
       }

   get editEchelleDialog(): boolean {
           return this.echelleService.editEchelleDialog;

       }
    set editEchelleDialog(value: boolean) {
        this.echelleService.editEchelleDialog = value;
       }

       get selectedEchelon(): EchelonVo {
           return this.echelonService.selectedEchelon;
       }
      set selectedEchelon(value: EchelonVo) {
        this.echelonService.selectedEchelon = value;
       }
       get echelons(): Array<EchelonVo> {
           return this.echelonService.echelons;
       }
       set echelons(value: Array<EchelonVo>) {
        this.echelonService.echelons = value;
       }
       get createEchelonDialog(): boolean {
           return this.echelonService.createEchelonDialog;
       }
      set createEchelonDialog(value: boolean) {
        this.echelonService.createEchelonDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
