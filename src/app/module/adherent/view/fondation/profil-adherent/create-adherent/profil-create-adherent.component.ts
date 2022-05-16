import {Component, OnInit, Input} from '@angular/core';
import {ProfilService} from '../../../../../../controller/service/Profil.service';
import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EchelleVo} from '../../../../../../controller/model/Echelle.model';
import {EchelleService} from '../../../../../../controller/service/Echelle.service';
import {GradeVo} from '../../../../../../controller/model/Grade.model';
import {GradeService} from '../../../../../../controller/service/Grade.service';
@Component({
  selector: 'app-profil-create-adherent',
  templateUrl: './profil-create-adherent.component.html',
  styleUrls: ['./profil-create-adherent.component.css']
})
export class ProfilCreateAdherentComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validProfilGrade = true;
   _validProfilEchelle = true;

    _validEchelleEchelon = true;



constructor(private datePipe: DatePipe, private profilService: ProfilService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private echelleService :EchelleService
,       private gradeService :GradeService
) {

}


// methods
ngOnInit(): void {

    this.selectedGrade = new GradeVo();
    this.gradeService.findAll().subscribe((data) => this.grades = data);
    this.selectedEchelle = new EchelleVo();
    this.echelleService.findAll().subscribe((data) => this.echelles = data);
}




private setValidation(value : boolean){
    this.validProfilGrade = value;
    this.validProfilEchelle = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.profilService.save().subscribe(profil=>{
       this.profils.push({...profil});
       this.createProfilDialog = false;
       this.submitted = false;
       this.selectedProfil = new ProfilVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateProfilGrade();
this.validateProfilEchelle();

    }

private validateProfilGrade(){
        if (this.stringUtilService.isEmpty(this.selectedProfil.gradeVo)) {
            this.errorMessages.push('Grade non valide');
            this.validProfilGrade = false;
        } else {
            this.validProfilGrade = true;
        }
    }
private validateProfilEchelle(){
        if (this.stringUtilService.isEmpty(this.selectedProfil.echelleVo)) {
            this.errorMessages.push('Echelle non valide');
            this.validProfilEchelle = false;
        } else {
            this.validProfilEchelle = true;
        }
    }








//openPopup
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

hideCreateDialog(){
    this.createProfilDialog  = false;
    this.setValidation(true);
}

// getters and setters

get profils(): Array<ProfilVo> {
    return this.profilService.profils;
       }
set profils(value: Array<ProfilVo>) {
        this.profilService.profils = value;
       }

 get selectedProfil():ProfilVo {
           return this.profilService.selectedProfil;
       }
    set selectedProfil(value: ProfilVo) {
        this.profilService.selectedProfil = value;
       }

   get createProfilDialog(): boolean {
           return this.profilService.createProfilDialog;

       }
    set createProfilDialog(value: boolean) {
        this.profilService.createProfilDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validProfilGrade(): boolean {
    return this._validProfilGrade;
    }

    set validProfilGrade(value: boolean) {
    this._validProfilGrade = value;
    }
    get validProfilEchelle(): boolean {
    return this._validProfilEchelle;
    }

    set validProfilEchelle(value: boolean) {
    this._validProfilEchelle = value;
    }

    get validEchelleEchelon(): boolean {
    return this._validEchelleEchelon;
    }

    set validEchelleEchelon(value: boolean) {
    this._validEchelleEchelon = value;
    }

}
