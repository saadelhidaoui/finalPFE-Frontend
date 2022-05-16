import {Component, OnInit, Input} from '@angular/core';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';
import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import {NiveauImportanceService} from '../../../../../../controller/service/NiveauImportance.service';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
@Component({
  selector: 'app-estivage-create-moderateur',
  templateUrl: './estivage-create-moderateur.component.html',
  styleUrls: ['./estivage-create-moderateur.component.css']
})
export class EstivageCreateModerateurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEstivageCentreEstivage = true;
   _validEstivageNumArrivee = true;
   _validEstivageNiveauImportance = true;

    _validCentreEstivageVille = true;



constructor(private datePipe: DatePipe, private estivageService: EstivageService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private niveauImportanceService :NiveauImportanceService
,       private centreEstivageService :CentreEstivageService
) {

}


// methods
ngOnInit(): void {

    this.selectedCentreEstivage = new CentreEstivageVo();
    this.centreEstivageService.findAll().subscribe((data) => this.centreEstivages = data);
    this.selectedNiveauImportance = new NiveauImportanceVo();
    this.niveauImportanceService.findAll().subscribe((data) => this.niveauImportances = data);
}




private setValidation(value : boolean){
    this.validEstivageCentreEstivage = value;
    this.validEstivageNumArrivee = value;
    this.validEstivageNiveauImportance = value;
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
     this.estivageService.save().subscribe(estivage=>{
       this.estivages.push({...estivage});
       this.createEstivageDialog = false;
       this.submitted = false;
       this.selectedEstivage = new EstivageVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEstivageCentreEstivage();
this.validateEstivageNumArrivee();
this.validateEstivageNiveauImportance();

    }

private validateEstivageCentreEstivage(){
        if (this.stringUtilService.isEmpty(this.selectedEstivage.centreEstivageVo)) {
            this.errorMessages.push('Centre estivage non valide');
            this.validEstivageCentreEstivage = false;
        } else {
            this.validEstivageCentreEstivage = true;
        }
    }
private validateEstivageNumArrivee(){
        if (this.stringUtilService.isEmpty(this.selectedEstivage.numArrivee)) {
            this.errorMessages.push('Num arrivee non valide');
            this.validEstivageNumArrivee = false;
        } else {
            this.validEstivageNumArrivee = true;
        }
    }
private validateEstivageNiveauImportance(){
        if (this.stringUtilService.isEmpty(this.selectedEstivage.niveauImportanceVo)) {
            this.errorMessages.push('Niveau importance non valide');
            this.validEstivageNiveauImportance = false;
        } else {
            this.validEstivageNiveauImportance = true;
        }
    }



















//openPopup
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
              public async openCreateniveauImportance(niveauImportance: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauImportance', 'add');
                       if(isPermistted){
         this.selectedNiveauImportance = new NiveauImportanceVo();
        this.createNiveauImportanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createEstivageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get estivages(): Array<EstivageVo> {
    return this.estivageService.estivages;
       }
set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }

 get selectedEstivage():EstivageVo {
           return this.estivageService.selectedEstivage;
       }
    set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
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
       get selectedNiveauImportance(): NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
      set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }
       get niveauImportances(): Array<NiveauImportanceVo> {
           return this.niveauImportanceService.niveauImportances;
       }
       set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
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

    get validCentreEstivageVille(): boolean {
    return this._validCentreEstivageVille;
    }

    set validCentreEstivageVille(value: boolean) {
    this._validCentreEstivageVille = value;
    }

}
