import {Component, OnInit, Input} from '@angular/core';
import {EchelonService} from '../../../../../../controller/service/Echelon.service';
import {EchelonVo} from '../../../../../../controller/model/Echelon.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-echelon-create-chercheur',
  templateUrl: './echelon-create-chercheur.component.html',
  styleUrls: ['./echelon-create-chercheur.component.css']
})
export class EchelonCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private echelonService: EchelonService
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
     this.echelonService.save().subscribe(echelon=>{
       this.echelons.push({...echelon});
       this.createEchelonDialog = false;
       this.submitted = false;
       this.selectedEchelon = new EchelonVo();


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
    this.createEchelonDialog  = false;
    this.setValidation(true);
}

// getters and setters

get echelons(): Array<EchelonVo> {
    return this.echelonService.echelons;
       }
set echelons(value: Array<EchelonVo>) {
        this.echelonService.echelons = value;
       }

 get selectedEchelon():EchelonVo {
           return this.echelonService.selectedEchelon;
       }
    set selectedEchelon(value: EchelonVo) {
        this.echelonService.selectedEchelon = value;
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



}
