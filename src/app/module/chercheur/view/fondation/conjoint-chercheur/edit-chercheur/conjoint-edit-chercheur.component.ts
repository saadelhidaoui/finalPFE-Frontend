import {Component, OnInit} from '@angular/core';
import {ConjointService} from '../../../../../../controller/service/Conjoint.service';
import {ConjointVo} from '../../../../../../controller/model/Conjoint.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';

@Component({
  selector: 'app-conjoint-edit-chercheur',
  templateUrl: './conjoint-edit-chercheur.component.html',
  styleUrls: ['./conjoint-edit-chercheur.component.css']
})
export class ConjointEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private conjointService: ConjointService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private adherentService: AdherentService
 ,       private qualiteService: QualiteService
) {
}

// methods
ngOnInit(): void {
    this.selectedQualite = new QualiteVo();
    this.qualiteService.findAll().subscribe((data) => this.qualites = data);
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.conjointService.edit().subscribe(conjoint=>{
    const myIndex = this.conjoints.findIndex(e => e.id === this.selectedConjoint.id);
    this.conjoints[myIndex] = this.selectedConjoint;
    this.editConjointDialog = false;
    this.selectedConjoint = new ConjointVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatequalite(qualite: string) {
                      const isPermistted = await this.roleService.isPermitted('Qualite', 'add');
                       if(isPermistted){
         this.selectedQualite = new QualiteVo();
        this.createQualiteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateadherent(adherent: string) {
                      const isPermistted = await this.roleService.isPermitted('Adherent', 'add');
                       if(isPermistted){
         this.selectedAdherent = new AdherentVo();
        this.createAdherentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editConjointDialog  = false;
}

// getters and setters

get conjoints(): Array<ConjointVo> {
    return this.conjointService.conjoints;
       }
set conjoints(value: Array<ConjointVo>) {
        this.conjointService.conjoints = value;
       }

 get selectedConjoint(): ConjointVo {
           return this.conjointService.selectedConjoint;
       }
    set selectedConjoint(value: ConjointVo) {
        this.conjointService.selectedConjoint = value;
       }

   get editConjointDialog(): boolean {
           return this.conjointService.editConjointDialog;

       }
    set editConjointDialog(value: boolean) {
        this.conjointService.editConjointDialog = value;
       }

       get selectedQualite(): QualiteVo {
           return this.qualiteService.selectedQualite;
       }
      set selectedQualite(value: QualiteVo) {
        this.qualiteService.selectedQualite = value;
       }
       get qualites(): Array<QualiteVo> {
           return this.qualiteService.qualites;
       }
       set qualites(value: Array<QualiteVo>) {
        this.qualiteService.qualites = value;
       }
       get createQualiteDialog(): boolean {
           return this.qualiteService.createQualiteDialog;
       }
      set createQualiteDialog(value: boolean) {
        this.qualiteService.createQualiteDialog= value;
       }
       get selectedAdherent(): AdherentVo {
           return this.adherentService.selectedAdherent;
       }
      set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }
       get adherents(): Array<AdherentVo> {
           return this.adherentService.adherents;
       }
       set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }
       get createAdherentDialog(): boolean {
           return this.adherentService.createAdherentDialog;
       }
      set createAdherentDialog(value: boolean) {
        this.adherentService.createAdherentDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
