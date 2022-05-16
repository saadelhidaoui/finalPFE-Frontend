import {Component, OnInit, Input} from '@angular/core';
import {EtatPrestationService} from '../../../../../../controller/service/EtatPrestation.service';
import {EtatPrestationVo} from '../../../../../../controller/model/EtatPrestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-prestation-create-admin',
  templateUrl: './etat-prestation-create-admin.component.html',
  styleUrls: ['./etat-prestation-create-admin.component.css']
})
export class EtatPrestationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private etatPrestationService: EtatPrestationService
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
     this.etatPrestationService.save().subscribe(etatPrestation=>{
       this.etatPrestations.push({...etatPrestation});
       this.createEtatPrestationDialog = false;
       this.submitted = false;
       this.selectedEtatPrestation = new EtatPrestationVo();


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
    this.createEtatPrestationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatPrestations(): Array<EtatPrestationVo> {
    return this.etatPrestationService.etatPrestations;
       }
set etatPrestations(value: Array<EtatPrestationVo>) {
        this.etatPrestationService.etatPrestations = value;
       }

 get selectedEtatPrestation():EtatPrestationVo {
           return this.etatPrestationService.selectedEtatPrestation;
       }
    set selectedEtatPrestation(value: EtatPrestationVo) {
        this.etatPrestationService.selectedEtatPrestation = value;
       }

   get createEtatPrestationDialog(): boolean {
           return this.etatPrestationService.createEtatPrestationDialog;

       }
    set createEtatPrestationDialog(value: boolean) {
        this.etatPrestationService.createEtatPrestationDialog= value;
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
