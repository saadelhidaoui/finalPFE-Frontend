import {Component, OnInit, Input} from '@angular/core';
import {EtatProjetService} from '../../../../../../controller/service/EtatProjet.service';
import {EtatProjetVo} from '../../../../../../controller/model/EtatProjet.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-projet-create-adherent',
  templateUrl: './etat-projet-create-adherent.component.html',
  styleUrls: ['./etat-projet-create-adherent.component.css']
})
export class EtatProjetCreateAdherentComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatProjetLibelle = true;
   _validEtatProjetCode = true;




constructor(private datePipe: DatePipe, private etatProjetService: EtatProjetService
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
    this.validEtatProjetLibelle = value;
    this.validEtatProjetCode = value;
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
     this.etatProjetService.save().subscribe(etatProjet=>{
       this.etatProjets.push({...etatProjet});
       this.createEtatProjetDialog = false;
       this.submitted = false;
       this.selectedEtatProjet = new EtatProjetVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatProjetLibelle();
this.validateEtatProjetCode();

    }

private validateEtatProjetLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatProjet.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatProjetLibelle = false;
        } else {
            this.validEtatProjetLibelle = true;
        }
    }
private validateEtatProjetCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtatProjet.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtatProjetCode = false;
        } else {
            this.validEtatProjetCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createEtatProjetDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatProjets(): Array<EtatProjetVo> {
    return this.etatProjetService.etatProjets;
       }
set etatProjets(value: Array<EtatProjetVo>) {
        this.etatProjetService.etatProjets = value;
       }

 get selectedEtatProjet():EtatProjetVo {
           return this.etatProjetService.selectedEtatProjet;
       }
    set selectedEtatProjet(value: EtatProjetVo) {
        this.etatProjetService.selectedEtatProjet = value;
       }

   get createEtatProjetDialog(): boolean {
           return this.etatProjetService.createEtatProjetDialog;

       }
    set createEtatProjetDialog(value: boolean) {
        this.etatProjetService.createEtatProjetDialog= value;
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

    get validEtatProjetLibelle(): boolean {
    return this._validEtatProjetLibelle;
    }

    set validEtatProjetLibelle(value: boolean) {
    this._validEtatProjetLibelle = value;
    }
    get validEtatProjetCode(): boolean {
    return this._validEtatProjetCode;
    }

    set validEtatProjetCode(value: boolean) {
    this._validEtatProjetCode = value;
    }


}
