import {Component, OnInit, Input} from '@angular/core';
import {TypePrestationService} from '../../../../../../controller/service/TypePrestation.service';
import {TypePrestationVo} from '../../../../../../controller/model/TypePrestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-prestation-create-admin',
  templateUrl: './type-prestation-create-admin.component.html',
  styleUrls: ['./type-prestation-create-admin.component.css']
})
export class TypePrestationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private typePrestationService: TypePrestationService
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
     this.typePrestationService.save().subscribe(typePrestation=>{
       this.typePrestations.push({...typePrestation});
       this.createTypePrestationDialog = false;
       this.submitted = false;
       this.selectedTypePrestation = new TypePrestationVo();


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
    this.createTypePrestationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typePrestations(): Array<TypePrestationVo> {
    return this.typePrestationService.typePrestations;
       }
set typePrestations(value: Array<TypePrestationVo>) {
        this.typePrestationService.typePrestations = value;
       }

 get selectedTypePrestation():TypePrestationVo {
           return this.typePrestationService.selectedTypePrestation;
       }
    set selectedTypePrestation(value: TypePrestationVo) {
        this.typePrestationService.selectedTypePrestation = value;
       }

   get createTypePrestationDialog(): boolean {
           return this.typePrestationService.createTypePrestationDialog;

       }
    set createTypePrestationDialog(value: boolean) {
        this.typePrestationService.createTypePrestationDialog= value;
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
