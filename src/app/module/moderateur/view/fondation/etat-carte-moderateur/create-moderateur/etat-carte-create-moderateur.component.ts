import {Component, OnInit, Input} from '@angular/core';
import {EtatCarteService} from '../../../../../../controller/service/EtatCarte.service';
import {EtatCarteVo} from '../../../../../../controller/model/EtatCarte.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-carte-create-moderateur',
  templateUrl: './etat-carte-create-moderateur.component.html',
  styleUrls: ['./etat-carte-create-moderateur.component.css']
})
export class EtatCarteCreateModerateurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private etatCarteService: EtatCarteService
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
     this.etatCarteService.save().subscribe(etatCarte=>{
       this.etatCartes.push({...etatCarte});
       this.createEtatCarteDialog = false;
       this.submitted = false;
       this.selectedEtatCarte = new EtatCarteVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
// methods

hideCreateDialog(){
    this.createEtatCarteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatCartes(): Array<EtatCarteVo> {
    return this.etatCarteService.etatCartes;
       }
set etatCartes(value: Array<EtatCarteVo>) {
        this.etatCarteService.etatCartes = value;
       }

 get selectedEtatCarte():EtatCarteVo {
           return this.etatCarteService.selectedEtatCarte;
       }
    set selectedEtatCarte(value: EtatCarteVo) {
        this.etatCarteService.selectedEtatCarte = value;
       }

   get createEtatCarteDialog(): boolean {
           return this.etatCarteService.createEtatCarteDialog;

       }
    set createEtatCarteDialog(value: boolean) {
        this.etatCarteService.createEtatCarteDialog= value;
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



}
