import {Component, OnInit, Input} from '@angular/core';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {VilleVo} from '../../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../../controller/service/Ville.service';
@Component({
  selector: 'app-centre-estivage-create-chercheur',
  templateUrl: './centre-estivage-create-chercheur.component.html',
  styleUrls: ['./centre-estivage-create-chercheur.component.css']
})
export class CentreEstivageCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCentreEstivageVille = true;

    _validVilleRegion = true;



constructor(private datePipe: DatePipe, private centreEstivageService: CentreEstivageService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private villeService :VilleService
) {

}


// methods
ngOnInit(): void {

    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
}




private setValidation(value : boolean){
    this.validCentreEstivageVille = value;
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
     this.centreEstivageService.save().subscribe(centreEstivage=>{
       this.centreEstivages.push({...centreEstivage});
       this.createCentreEstivageDialog = false;
       this.submitted = false;
       this.selectedCentreEstivage = new CentreEstivageVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCentreEstivageVille();

    }

private validateCentreEstivageVille(){
        if (this.stringUtilService.isEmpty(this.selectedCentreEstivage.villeVo)) {
            this.errorMessages.push('Ville non valide');
            this.validCentreEstivageVille = false;
        } else {
            this.validCentreEstivageVille = true;
        }
    }









//openPopup
              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createCentreEstivageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get centreEstivages(): Array<CentreEstivageVo> {
    return this.centreEstivageService.centreEstivages;
       }
set centreEstivages(value: Array<CentreEstivageVo>) {
        this.centreEstivageService.centreEstivages = value;
       }

 get selectedCentreEstivage():CentreEstivageVo {
           return this.centreEstivageService.selectedCentreEstivage;
       }
    set selectedCentreEstivage(value: CentreEstivageVo) {
        this.centreEstivageService.selectedCentreEstivage = value;
       }

   get createCentreEstivageDialog(): boolean {
           return this.centreEstivageService.createCentreEstivageDialog;

       }
    set createCentreEstivageDialog(value: boolean) {
        this.centreEstivageService.createCentreEstivageDialog= value;
       }

       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
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

    get validVilleRegion(): boolean {
    return this._validVilleRegion;
    }

    set validVilleRegion(value: boolean) {
    this._validVilleRegion = value;
    }

}
