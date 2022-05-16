import {Component, OnInit, Input} from '@angular/core';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-qualite-create-admin',
  templateUrl: './qualite-create-admin.component.html',
  styleUrls: ['./qualite-create-admin.component.css']
})
export class QualiteCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private qualiteService: QualiteService
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
     this.qualiteService.save().subscribe(qualite=>{
       this.qualites.push({...qualite});
       this.createQualiteDialog = false;
       this.submitted = false;
       this.selectedQualite = new QualiteVo();


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
    this.createQualiteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get qualites(): Array<QualiteVo> {
    return this.qualiteService.qualites;
       }
set qualites(value: Array<QualiteVo>) {
        this.qualiteService.qualites = value;
       }

 get selectedQualite():QualiteVo {
           return this.qualiteService.selectedQualite;
       }
    set selectedQualite(value: QualiteVo) {
        this.qualiteService.selectedQualite = value;
       }

   get createQualiteDialog(): boolean {
           return this.qualiteService.createQualiteDialog;

       }
    set createQualiteDialog(value: boolean) {
        this.qualiteService.createQualiteDialog= value;
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
