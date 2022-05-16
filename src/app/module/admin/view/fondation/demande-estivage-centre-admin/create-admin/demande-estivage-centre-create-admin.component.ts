import {Component, OnInit, Input} from '@angular/core';
import {DemandeEstivageCentreService} from '../../../../../../controller/service/DemandeEstivageCentre.service';
import {DemandeEstivageCentreVo} from '../../../../../../controller/model/DemandeEstivageCentre.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {DemandeEstivageVo} from '../../../../../../controller/model/DemandeEstivage.model';
import {DemandeEstivageService} from '../../../../../../controller/service/DemandeEstivage.service';
import {CentreEstivageVo} from '../../../../../../controller/model/CentreEstivage.model';
import {CentreEstivageService} from '../../../../../../controller/service/CentreEstivage.service';
@Component({
  selector: 'app-demande-estivage-centre-create-admin',
  templateUrl: './demande-estivage-centre-create-admin.component.html',
  styleUrls: ['./demande-estivage-centre-create-admin.component.css']
})
export class DemandeEstivageCentreCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validDemandeEstivageDemandeEstivageCentre = true;
    _validDemandeEstivageDateDebutEstivage = true;
    _validDemandeEstivageDateFinEstivage = true;
    _validDemandeEstivageAdherent = true;
    _validDemandeEstivageDateTraitement = true;
    _validCentreEstivageVille = true;



constructor(private datePipe: DatePipe, private demandeEstivageCentreService: DemandeEstivageCentreService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private demandeEstivageService :DemandeEstivageService
,       private centreEstivageService :CentreEstivageService
) {

}


// methods
ngOnInit(): void {

    this.selectedDemandeEstivage = new DemandeEstivageVo();
    this.demandeEstivageService.findAll().subscribe((data) => this.demandeEstivages = data);
    this.selectedCentreEstivage = new CentreEstivageVo();
    this.centreEstivageService.findAll().subscribe((data) => this.centreEstivages = data);
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
     this.demandeEstivageCentreService.save().subscribe(demandeEstivageCentre=>{
       this.demandeEstivageCentres.push({...demandeEstivageCentre});
       this.createDemandeEstivageCentreDialog = false;
       this.submitted = false;
       this.selectedDemandeEstivageCentre = new DemandeEstivageCentreVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

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
              public async openCreatedemandeEstivage(demandeEstivage: string) {
                      const isPermistted = await this.roleService.isPermitted('DemandeEstivage', 'add');
                       if(isPermistted){
         this.selectedDemandeEstivage = new DemandeEstivageVo();
        this.createDemandeEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createDemandeEstivageCentreDialog  = false;
    this.setValidation(true);
}

// getters and setters

get demandeEstivageCentres(): Array<DemandeEstivageCentreVo> {
    return this.demandeEstivageCentreService.demandeEstivageCentres;
       }
set demandeEstivageCentres(value: Array<DemandeEstivageCentreVo>) {
        this.demandeEstivageCentreService.demandeEstivageCentres = value;
       }

 get selectedDemandeEstivageCentre():DemandeEstivageCentreVo {
           return this.demandeEstivageCentreService.selectedDemandeEstivageCentre;
       }
    set selectedDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this.demandeEstivageCentreService.selectedDemandeEstivageCentre = value;
       }

   get createDemandeEstivageCentreDialog(): boolean {
           return this.demandeEstivageCentreService.createDemandeEstivageCentreDialog;

       }
    set createDemandeEstivageCentreDialog(value: boolean) {
        this.demandeEstivageCentreService.createDemandeEstivageCentreDialog= value;
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
       get selectedDemandeEstivage(): DemandeEstivageVo {
           return this.demandeEstivageService.selectedDemandeEstivage;
       }
      set selectedDemandeEstivage(value: DemandeEstivageVo) {
        this.demandeEstivageService.selectedDemandeEstivage = value;
       }
       get demandeEstivages(): Array<DemandeEstivageVo> {
           return this.demandeEstivageService.demandeEstivages;
       }
       set demandeEstivages(value: Array<DemandeEstivageVo>) {
        this.demandeEstivageService.demandeEstivages = value;
       }
       get createDemandeEstivageDialog(): boolean {
           return this.demandeEstivageService.createDemandeEstivageDialog;
       }
      set createDemandeEstivageDialog(value: boolean) {
        this.demandeEstivageService.createDemandeEstivageDialog= value;
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


    get validDemandeEstivageDemandeEstivageCentre(): boolean {
    return this._validDemandeEstivageDemandeEstivageCentre;
    }

    set validDemandeEstivageDemandeEstivageCentre(value: boolean) {
    this._validDemandeEstivageDemandeEstivageCentre = value;
    }
    get validDemandeEstivageDateDebutEstivage(): boolean {
    return this._validDemandeEstivageDateDebutEstivage;
    }

    set validDemandeEstivageDateDebutEstivage(value: boolean) {
    this._validDemandeEstivageDateDebutEstivage = value;
    }
    get validDemandeEstivageDateFinEstivage(): boolean {
    return this._validDemandeEstivageDateFinEstivage;
    }

    set validDemandeEstivageDateFinEstivage(value: boolean) {
    this._validDemandeEstivageDateFinEstivage = value;
    }
    get validDemandeEstivageAdherent(): boolean {
    return this._validDemandeEstivageAdherent;
    }

    set validDemandeEstivageAdherent(value: boolean) {
    this._validDemandeEstivageAdherent = value;
    }
    get validDemandeEstivageDateTraitement(): boolean {
    return this._validDemandeEstivageDateTraitement;
    }

    set validDemandeEstivageDateTraitement(value: boolean) {
    this._validDemandeEstivageDateTraitement = value;
    }
    get validCentreEstivageVille(): boolean {
    return this._validCentreEstivageVille;
    }

    set validCentreEstivageVille(value: boolean) {
    this._validCentreEstivageVille = value;
    }

}
