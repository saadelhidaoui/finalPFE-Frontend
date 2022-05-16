import {Component, OnInit, Input} from '@angular/core';
import {OrganismeService} from '../../../../../../controller/service/Organisme.service';
import {OrganismeVo} from '../../../../../../controller/model/Organisme.model';
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
  selector: 'app-organisme-create-adherent',
  templateUrl: './organisme-create-adherent.component.html',
  styleUrls: ['./organisme-create-adherent.component.css']
})
export class OrganismeCreateAdherentComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validVilleRegion = true;



constructor(private datePipe: DatePipe, private organismeService: OrganismeService
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
     this.organismeService.save().subscribe(organisme=>{
       this.organismes.push({...organisme});
       this.createOrganismeDialog = false;
       this.submitted = false;
       this.selectedOrganisme = new OrganismeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

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
    this.createOrganismeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get organismes(): Array<OrganismeVo> {
    return this.organismeService.organismes;
       }
set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
       }

 get selectedOrganisme():OrganismeVo {
           return this.organismeService.selectedOrganisme;
       }
    set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
       }

   get createOrganismeDialog(): boolean {
           return this.organismeService.createOrganismeDialog;

       }
    set createOrganismeDialog(value: boolean) {
        this.organismeService.createOrganismeDialog= value;
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


    get validVilleRegion(): boolean {
    return this._validVilleRegion;
    }

    set validVilleRegion(value: boolean) {
    this._validVilleRegion = value;
    }

}
