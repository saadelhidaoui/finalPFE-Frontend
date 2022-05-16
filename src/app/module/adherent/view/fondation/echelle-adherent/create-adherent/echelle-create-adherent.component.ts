import {Component, OnInit, Input} from '@angular/core';
import {EchelleService} from '../../../../../../controller/service/Echelle.service';
import {EchelleVo} from '../../../../../../controller/model/Echelle.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EchelonVo} from '../../../../../../controller/model/Echelon.model';
import {EchelonService} from '../../../../../../controller/service/Echelon.service';
@Component({
  selector: 'app-echelle-create-adherent',
  templateUrl: './echelle-create-adherent.component.html',
  styleUrls: ['./echelle-create-adherent.component.css']
})
export class EchelleCreateAdherentComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEchelleEchelon = true;




constructor(private datePipe: DatePipe, private echelleService: EchelleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private echelonService :EchelonService
) {

}


// methods
ngOnInit(): void {

    this.selectedEchelon = new EchelonVo();
    this.echelonService.findAll().subscribe((data) => this.echelons = data);
}




private setValidation(value : boolean){
    this.validEchelleEchelon = value;
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
     this.echelleService.save().subscribe(echelle=>{
       this.echelles.push({...echelle});
       this.createEchelleDialog = false;
       this.submitted = false;
       this.selectedEchelle = new EchelleVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEchelleEchelon();

    }

private validateEchelleEchelon(){
        if (this.stringUtilService.isEmpty(this.selectedEchelle.echelonVo)) {
            this.errorMessages.push('Echelon non valide');
            this.validEchelleEchelon = false;
        } else {
            this.validEchelleEchelon = true;
        }
    }







//openPopup
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

hideCreateDialog(){
    this.createEchelleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get echelles(): Array<EchelleVo> {
    return this.echelleService.echelles;
       }
set echelles(value: Array<EchelleVo>) {
        this.echelleService.echelles = value;
       }

 get selectedEchelle():EchelleVo {
           return this.echelleService.selectedEchelle;
       }
    set selectedEchelle(value: EchelleVo) {
        this.echelleService.selectedEchelle = value;
       }

   get createEchelleDialog(): boolean {
           return this.echelleService.createEchelleDialog;

       }
    set createEchelleDialog(value: boolean) {
        this.echelleService.createEchelleDialog= value;
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

    get validEchelleEchelon(): boolean {
    return this._validEchelleEchelon;
    }

    set validEchelleEchelon(value: boolean) {
    this._validEchelleEchelon = value;
    }


}
