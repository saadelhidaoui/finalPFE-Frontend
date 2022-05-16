import {Component, OnInit} from '@angular/core';
import {ProfilService} from '../../../../../../controller/service/Profil.service';
import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {GradeVo} from '../../../../../../controller/model/Grade.model';
import {GradeService} from '../../../../../../controller/service/Grade.service';
import {EchelleVo} from '../../../../../../controller/model/Echelle.model';
import {EchelleService} from '../../../../../../controller/service/Echelle.service';

@Component({
  selector: 'app-profil-edit-chercheur',
  templateUrl: './profil-edit-chercheur.component.html',
  styleUrls: ['./profil-edit-chercheur.component.css']
})
export class ProfilEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private profilService: ProfilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private gradeService: GradeService
 ,       private echelleService: EchelleService
) {
}

// methods
ngOnInit(): void {
    this.selectedGrade = new GradeVo();
    this.gradeService.findAll().subscribe((data) => this.grades = data);
    this.selectedEchelle = new EchelleVo();
    this.echelleService.findAll().subscribe((data) => this.echelles = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.profilService.edit().subscribe(profil=>{
    const myIndex = this.profils.findIndex(e => e.id === this.selectedProfil.id);
    this.profils[myIndex] = this.selectedProfil;
    this.editProfilDialog = false;
    this.selectedProfil = new ProfilVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateechelle(echelle: string) {
                      const isPermistted = await this.roleService.isPermitted('Echelle', 'add');
                       if(isPermistted){
         this.selectedEchelle = new EchelleVo();
        this.createEchelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreategrade(grade: string) {
                      const isPermistted = await this.roleService.isPermitted('Grade', 'add');
                       if(isPermistted){
         this.selectedGrade = new GradeVo();
        this.createGradeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editProfilDialog  = false;
}

// getters and setters

get profils(): Array<ProfilVo> {
    return this.profilService.profils;
       }
set profils(value: Array<ProfilVo>) {
        this.profilService.profils = value;
       }

 get selectedProfil(): ProfilVo {
           return this.profilService.selectedProfil;
       }
    set selectedProfil(value: ProfilVo) {
        this.profilService.selectedProfil = value;
       }

   get editProfilDialog(): boolean {
           return this.profilService.editProfilDialog;

       }
    set editProfilDialog(value: boolean) {
        this.profilService.editProfilDialog = value;
       }

       get selectedEchelle(): EchelleVo {
           return this.echelleService.selectedEchelle;
       }
      set selectedEchelle(value: EchelleVo) {
        this.echelleService.selectedEchelle = value;
       }
       get echelles(): Array<EchelleVo> {
           return this.echelleService.echelles;
       }
       set echelles(value: Array<EchelleVo>) {
        this.echelleService.echelles = value;
       }
       get createEchelleDialog(): boolean {
           return this.echelleService.createEchelleDialog;
       }
      set createEchelleDialog(value: boolean) {
        this.echelleService.createEchelleDialog= value;
       }
       get selectedGrade(): GradeVo {
           return this.gradeService.selectedGrade;
       }
      set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
       }
       get grades(): Array<GradeVo> {
           return this.gradeService.grades;
       }
       set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
       }
       get createGradeDialog(): boolean {
           return this.gradeService.createGradeDialog;
       }
      set createGradeDialog(value: boolean) {
        this.gradeService.createGradeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
