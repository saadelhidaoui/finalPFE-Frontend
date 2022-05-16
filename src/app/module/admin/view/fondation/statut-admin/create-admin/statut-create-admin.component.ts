import {Component, OnInit, Input} from '@angular/core';
import {StatutService} from '../../../../../../controller/service/Statut.service';
import {StatutVo} from '../../../../../../controller/model/Statut.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-statut-create-admin',
  templateUrl: './statut-create-admin.component.html',
  styleUrls: ['./statut-create-admin.component.css']
})
export class StatutCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private statutService: StatutService
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
     this.statutService.save().subscribe(statut=>{
       this.statuts.push({...statut});
       this.createStatutDialog = false;
       this.submitted = false;
       this.selectedStatut = new StatutVo();


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
    this.createStatutDialog  = false;
    this.setValidation(true);
}

// getters and setters

get statuts(): Array<StatutVo> {
    return this.statutService.statuts;
       }
set statuts(value: Array<StatutVo>) {
        this.statutService.statuts = value;
       }

 get selectedStatut():StatutVo {
           return this.statutService.selectedStatut;
       }
    set selectedStatut(value: StatutVo) {
        this.statutService.selectedStatut = value;
       }

   get createStatutDialog(): boolean {
           return this.statutService.createStatutDialog;

       }
    set createStatutDialog(value: boolean) {
        this.statutService.createStatutDialog= value;
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
