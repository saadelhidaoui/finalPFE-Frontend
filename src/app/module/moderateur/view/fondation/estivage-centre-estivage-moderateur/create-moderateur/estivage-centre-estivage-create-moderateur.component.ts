import {Component, OnInit, Input} from '@angular/core';
import {EstivageCentreEstivageService} from '../../../../../../controller/service/EstivageCentreEstivage.service';
import {EstivageCentreEstivageVo} from '../../../../../../controller/model/EstivageCentreEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
@Component({
  selector: 'app-estivage-centre-estivage-create-moderateur',
  templateUrl: './estivage-centre-estivage-create-moderateur.component.html',
  styleUrls: ['./estivage-centre-estivage-create-moderateur.component.css']
})
export class EstivageCentreEstivageCreateModerateurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCentreEstivageVille = true;
    _validEstivageCentreEstivage = true;
    _validEstivageNumArrivee = true;
    _validEstivageNiveauImportance = true;



constructor(private datePipe: DatePipe, private estivageCentreEstivageService: EstivageCentreEstivageService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private estivageService :EstivageService
,       private centreEstivageService :CentreEstivageService
) {

}


// methods
ngOnInit(): void {

    this.selectedCentreEstivage = new CentreEstivageVo();
    this.centreEstivageService.findAll().subscribe((data) => this.centreEstivages = data);
    this.selectedEstivage = new EstivageVo();
    this.estivageService.findAll().subscribe((data) => this.estivages = data);
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
     this.estivageCentreEstivageService.save().subscribe(estivageCentreEstivage=>{
       this.estivageCentreEstivages.push({...estivageCentreEstivage});
       this.createEstivageCentreEstivageDialog = false;
       this.submitted = false;
       this.selectedEstivageCentreEstivage = new EstivageCentreEstivageVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }









//openPopup
              public async openCreateestivage(estivage: string) {
                      const isPermistted = await this.roleService.isPermitted('Estivage', 'add');
                       if(isPermistted){
         this.selectedEstivage = new EstivageVo();
        this.createEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecentreEstivage(centreEstivage: string) {
                      const isPermistted = await this.roleService.isPermitted('CentreEstivage', 'add');
                       if(isPermistted){
         this.selectedCentreEstivage = new CentreEstivageVo();
        this.createCentreEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createEstivageCentreEstivageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get estivageCentreEstivages(): Array<EstivageCentreEstivageVo> {
    return this.estivageCentreEstivageService.estivageCentreEstivages;
       }
set estivageCentreEstivages(value: Array<EstivageCentreEstivageVo>) {
        this.estivageCentreEstivageService.estivageCentreEstivages = value;
       }

 get selectedEstivageCentreEstivage():EstivageCentreEstivageVo {
           return this.estivageCentreEstivageService.selectedEstivageCentreEstivage;
       }
    set selectedEstivageCentreEstivage(value: EstivageCentreEstivageVo) {
        this.estivageCentreEstivageService.selectedEstivageCentreEstivage = value;
       }

   get createEstivageCentreEstivageDialog(): boolean {
           return this.estivageCentreEstivageService.createEstivageCentreEstivageDialog;

       }
    set createEstivageCentreEstivageDialog(value: boolean) {
        this.estivageCentreEstivageService.createEstivageCentreEstivageDialog= value;
       }

       get selectedEstivage(): EstivageVo {
           return this.estivageService.selectedEstivage;
       }
      set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
       }
       get estivages(): Array<EstivageVo> {
           return this.estivageService.estivages;
       }
       set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }
       get createEstivageDialog(): boolean {
           return this.estivageService.createEstivageDialog;
       }
      set createEstivageDialog(value: boolean) {
        this.estivageService.createEstivageDialog= value;
       }
       get selectedCentreEstivage(): CentreEstivageVo {
           return this.centreEstivageService.selectedCentreEstivage;
       }
      set selectedCentreEstivage(value: CentreEstivageVo) {
        this.centreEstivageService.selectedCentreEstivage = value;
       }
       get centreEstivages(): Array<CentreEstivageVo> {
           return this.centreEstivageService.centreEstivages;
       }
       set centreEstivages(value: Array<CentreEstivageVo>) {
        this.centreEstivageService.centreEstivages = value;
       }
       get createCentreEstivageDialog(): boolean {
           return this.centreEstivageService.createCentreEstivageDialog;
       }
      set createCentreEstivageDialog(value: boolean) {
        this.centreEstivageService.createCentreEstivageDialog= value;
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


    get validCentreEstivageVille(): boolean {
    return this._validCentreEstivageVille;
    }

    set validCentreEstivageVille(value: boolean) {
    this._validCentreEstivageVille = value;
    }
    get validEstivageCentreEstivage(): boolean {
    return this._validEstivageCentreEstivage;
    }

    set validEstivageCentreEstivage(value: boolean) {
    this._validEstivageCentreEstivage = value;
    }
    get validEstivageNumArrivee(): boolean {
    return this._validEstivageNumArrivee;
    }

    set validEstivageNumArrivee(value: boolean) {
    this._validEstivageNumArrivee = value;
    }
    get validEstivageNiveauImportance(): boolean {
    return this._validEstivageNiveauImportance;
    }

    set validEstivageNiveauImportance(value: boolean) {
    this._validEstivageNiveauImportance = value;
    }

}
