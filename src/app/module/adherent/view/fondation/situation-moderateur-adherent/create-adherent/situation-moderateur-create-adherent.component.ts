import {Component, OnInit, Input} from '@angular/core';
import {SituationModerateurService} from '../../../../../../controller/service/SituationModerateur.service';
import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-situation-moderateur-create-adherent',
  templateUrl: './situation-moderateur-create-adherent.component.html',
  styleUrls: ['./situation-moderateur-create-adherent.component.css']
})
export class SituationModerateurCreateAdherentComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validSituationModerateurLibelle = true;




constructor(private datePipe: DatePipe, private situationModerateurService: SituationModerateurService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validSituationModerateurLibelle = value;
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
     this.situationModerateurService.save().subscribe(situationModerateur=>{
       this.situationModerateurs.push({...situationModerateur});
       this.createSituationModerateurDialog = false;
       this.submitted = false;
       this.selectedSituationModerateur = new SituationModerateurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateSituationModerateurLibelle();

    }

private validateSituationModerateurLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedSituationModerateur.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSituationModerateurLibelle = false;
        } else {
            this.validSituationModerateurLibelle = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createSituationModerateurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get situationModerateurs(): Array<SituationModerateurVo> {
    return this.situationModerateurService.situationModerateurs;
       }
set situationModerateurs(value: Array<SituationModerateurVo>) {
        this.situationModerateurService.situationModerateurs = value;
       }

 get selectedSituationModerateur():SituationModerateurVo {
           return this.situationModerateurService.selectedSituationModerateur;
       }
    set selectedSituationModerateur(value: SituationModerateurVo) {
        this.situationModerateurService.selectedSituationModerateur = value;
       }

   get createSituationModerateurDialog(): boolean {
           return this.situationModerateurService.createSituationModerateurDialog;

       }
    set createSituationModerateurDialog(value: boolean) {
        this.situationModerateurService.createSituationModerateurDialog= value;
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

    get validSituationModerateurLibelle(): boolean {
    return this._validSituationModerateurLibelle;
    }

    set validSituationModerateurLibelle(value: boolean) {
    this._validSituationModerateurLibelle = value;
    }


}
