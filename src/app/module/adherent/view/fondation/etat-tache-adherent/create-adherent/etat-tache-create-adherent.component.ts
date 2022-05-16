import {Component, OnInit, Input} from '@angular/core';
import {EtatTacheService} from '../../../../../../controller/service/EtatTache.service';
import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-tache-create-adherent',
  templateUrl: './etat-tache-create-adherent.component.html',
  styleUrls: ['./etat-tache-create-adherent.component.css']
})
export class EtatTacheCreateAdherentComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private etatTacheService: EtatTacheService
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
     this.etatTacheService.save().subscribe(etatTache=>{
       this.etatTaches.push({...etatTache});
       this.createEtatTacheDialog = false;
       this.submitted = false;
       this.selectedEtatTache = new EtatTacheVo();


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
    this.createEtatTacheDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatTaches(): Array<EtatTacheVo> {
    return this.etatTacheService.etatTaches;
       }
set etatTaches(value: Array<EtatTacheVo>) {
        this.etatTacheService.etatTaches = value;
       }

 get selectedEtatTache():EtatTacheVo {
           return this.etatTacheService.selectedEtatTache;
       }
    set selectedEtatTache(value: EtatTacheVo) {
        this.etatTacheService.selectedEtatTache = value;
       }

   get createEtatTacheDialog(): boolean {
           return this.etatTacheService.createEtatTacheDialog;

       }
    set createEtatTacheDialog(value: boolean) {
        this.etatTacheService.createEtatTacheDialog= value;
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
