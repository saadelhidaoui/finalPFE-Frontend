import {Component, OnInit, Input} from '@angular/core';
import {ImpressionCarteService} from '../../../../../../controller/service/ImpressionCarte.service';
import {ImpressionCarteVo} from '../../../../../../controller/model/ImpressionCarte.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-impression-carte-create-adherent',
  templateUrl: './impression-carte-create-adherent.component.html',
  styleUrls: ['./impression-carte-create-adherent.component.css']
})
export class ImpressionCarteCreateAdherentComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private impressionCarteService: ImpressionCarteService
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
     this.impressionCarteService.save().subscribe(impressionCarte=>{
       this.impressionCartes.push({...impressionCarte});
       this.createImpressionCarteDialog = false;
       this.submitted = false;
       this.selectedImpressionCarte = new ImpressionCarteVo();


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
    this.createImpressionCarteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get impressionCartes(): Array<ImpressionCarteVo> {
    return this.impressionCarteService.impressionCartes;
       }
set impressionCartes(value: Array<ImpressionCarteVo>) {
        this.impressionCarteService.impressionCartes = value;
       }

 get selectedImpressionCarte():ImpressionCarteVo {
           return this.impressionCarteService.selectedImpressionCarte;
       }
    set selectedImpressionCarte(value: ImpressionCarteVo) {
        this.impressionCarteService.selectedImpressionCarte = value;
       }

   get createImpressionCarteDialog(): boolean {
           return this.impressionCarteService.createImpressionCarteDialog;

       }
    set createImpressionCarteDialog(value: boolean) {
        this.impressionCarteService.createImpressionCarteDialog= value;
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
