import {Component, OnInit, Input} from '@angular/core';
import {FonctionService} from '../../../../../../controller/service/Fonction.service';
import {FonctionVo} from '../../../../../../controller/model/Fonction.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-fonction-create-chercheur',
  templateUrl: './fonction-create-chercheur.component.html',
  styleUrls: ['./fonction-create-chercheur.component.css']
})
export class FonctionCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private fonctionService: FonctionService
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
     this.fonctionService.save().subscribe(fonction=>{
       this.fonctions.push({...fonction});
       this.createFonctionDialog = false;
       this.submitted = false;
       this.selectedFonction = new FonctionVo();


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
    this.createFonctionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get fonctions(): Array<FonctionVo> {
    return this.fonctionService.fonctions;
       }
set fonctions(value: Array<FonctionVo>) {
        this.fonctionService.fonctions = value;
       }

 get selectedFonction():FonctionVo {
           return this.fonctionService.selectedFonction;
       }
    set selectedFonction(value: FonctionVo) {
        this.fonctionService.selectedFonction = value;
       }

   get createFonctionDialog(): boolean {
           return this.fonctionService.createFonctionDialog;

       }
    set createFonctionDialog(value: boolean) {
        this.fonctionService.createFonctionDialog= value;
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
