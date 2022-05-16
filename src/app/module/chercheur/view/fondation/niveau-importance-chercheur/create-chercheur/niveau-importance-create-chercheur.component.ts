import {Component, OnInit, Input} from '@angular/core';
import {NiveauImportanceService} from '../../../../../../controller/service/NiveauImportance.service';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-niveau-importance-create-chercheur',
  templateUrl: './niveau-importance-create-chercheur.component.html',
  styleUrls: ['./niveau-importance-create-chercheur.component.css']
})
export class NiveauImportanceCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private niveauImportanceService: NiveauImportanceService
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
     this.niveauImportanceService.save().subscribe(niveauImportance=>{
       this.niveauImportances.push({...niveauImportance});
       this.createNiveauImportanceDialog = false;
       this.submitted = false;
       this.selectedNiveauImportance = new NiveauImportanceVo();


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
    this.createNiveauImportanceDialog  = false;
    this.setValidation(true);
}

// getters and setters

get niveauImportances(): Array<NiveauImportanceVo> {
    return this.niveauImportanceService.niveauImportances;
       }
set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
       }

 get selectedNiveauImportance():NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
    set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }

   get createNiveauImportanceDialog(): boolean {
           return this.niveauImportanceService.createNiveauImportanceDialog;

       }
    set createNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.createNiveauImportanceDialog= value;
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
