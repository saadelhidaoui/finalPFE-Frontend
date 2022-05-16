import {Component, OnInit, Input} from '@angular/core';
import {EtatDemandeEstivageService} from '../../../../../../controller/service/EtatDemandeEstivage.service';
import {EtatDemandeEstivageVo} from '../../../../../../controller/model/EtatDemandeEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-demande-estivage-create-admin',
  templateUrl: './etat-demande-estivage-create-admin.component.html',
  styleUrls: ['./etat-demande-estivage-create-admin.component.css']
})
export class EtatDemandeEstivageCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private etatDemandeEstivageService: EtatDemandeEstivageService
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
     this.etatDemandeEstivageService.save().subscribe(etatDemandeEstivage=>{
       this.etatDemandeEstivages.push({...etatDemandeEstivage});
       this.createEtatDemandeEstivageDialog = false;
       this.submitted = false;
       this.selectedEtatDemandeEstivage = new EtatDemandeEstivageVo();


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
    this.createEtatDemandeEstivageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatDemandeEstivages(): Array<EtatDemandeEstivageVo> {
    return this.etatDemandeEstivageService.etatDemandeEstivages;
       }
set etatDemandeEstivages(value: Array<EtatDemandeEstivageVo>) {
        this.etatDemandeEstivageService.etatDemandeEstivages = value;
       }

 get selectedEtatDemandeEstivage():EtatDemandeEstivageVo {
           return this.etatDemandeEstivageService.selectedEtatDemandeEstivage;
       }
    set selectedEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this.etatDemandeEstivageService.selectedEtatDemandeEstivage = value;
       }

   get createEtatDemandeEstivageDialog(): boolean {
           return this.etatDemandeEstivageService.createEtatDemandeEstivageDialog;

       }
    set createEtatDemandeEstivageDialog(value: boolean) {
        this.etatDemandeEstivageService.createEtatDemandeEstivageDialog= value;
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
