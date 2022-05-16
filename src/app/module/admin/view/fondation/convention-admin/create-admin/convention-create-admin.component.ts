import {Component, OnInit, Input} from '@angular/core';
import {ConventionService} from '../../../../../../controller/service/Convention.service';
import {ConventionVo} from '../../../../../../controller/model/Convention.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {OrganismeVo} from '../../../../../../controller/model/Organisme.model';
import {OrganismeService} from '../../../../../../controller/service/Organisme.service';
import {PieceJointeConventionVo} from '../../../../../../controller/model/PieceJointeConvention.model';
import {PieceJointeConventionService} from '../../../../../../controller/service/PieceJointeConvention.service';
@Component({
  selector: 'app-convention-create-admin',
  templateUrl: './convention-create-admin.component.html',
  styleUrls: ['./convention-create-admin.component.css']
})
export class ConventionCreateAdminComponent implements OnInit {

        selectedPieceJointeConventions: PieceJointeConventionVo = new PieceJointeConventionVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validConventionLibelle = true;
   _validConventionOrganisme = true;
   _validConventionDateDebut = true;




constructor(private datePipe: DatePipe, private conventionService: ConventionService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private organismeService :OrganismeService
,       private pieceJointeConventionService :PieceJointeConventionService
) {

}


// methods
ngOnInit(): void {




    this.selectedOrganisme = new OrganismeVo();
    this.organismeService.findAll().subscribe((data) => this.organismes = data);
}


    validatePieceJointeConventions(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validConventionLibelle = value;
    this.validConventionOrganisme = value;
    this.validConventionDateDebut = value;
    }

        addPieceJointeConventions() {
        if( this.selectedConvention.pieceJointeConventionsVo == null ){
            this.selectedConvention.pieceJointeConventionsVo = new Array<PieceJointeConventionVo>();
        }
       this.validatePieceJointeConventions();
       if (this.errorMessages.length === 0) {
              this.selectedConvention.pieceJointeConventionsVo.push(this.selectedPieceJointeConventions);
              this.selectedPieceJointeConventions = new PieceJointeConventionVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePieceJointeConventions(p: PieceJointeConventionVo) {
        this.selectedConvention.pieceJointeConventionsVo.forEach((element, index) => {
            if (element === p) { this.selectedConvention.pieceJointeConventionsVo.splice(index, 1); }
        });
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
     this.conventionService.save().subscribe(convention=>{
       this.conventions.push({...convention});
       this.createConventionDialog = false;
       this.submitted = false;
       this.selectedConvention = new ConventionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateConventionLibelle();
this.validateConventionOrganisme();
this.validateConventionDateDebut();

    }

private validateConventionLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedConvention.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validConventionLibelle = false;
        } else {
            this.validConventionLibelle = true;
        }
    }
private validateConventionOrganisme(){
        if (this.stringUtilService.isEmpty(this.selectedConvention.organismeVo)) {
            this.errorMessages.push('Organisme non valide');
            this.validConventionOrganisme = false;
        } else {
            this.validConventionOrganisme = true;
        }
    }
private validateConventionDateDebut(){
        if (this.stringUtilService.isEmpty(this.selectedConvention.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validConventionDateDebut = false;
        } else {
            this.validConventionDateDebut = true;
        }
    }




























//openPopup
              public async openCreateorganisme(organisme: string) {
                      const isPermistted = await this.roleService.isPermitted('Organisme', 'add');
                       if(isPermistted){
         this.selectedOrganisme = new OrganismeVo();
        this.createOrganismeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createConventionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get conventions(): Array<ConventionVo> {
    return this.conventionService.conventions;
       }
set conventions(value: Array<ConventionVo>) {
        this.conventionService.conventions = value;
       }

 get selectedConvention():ConventionVo {
           return this.conventionService.selectedConvention;
       }
    set selectedConvention(value: ConventionVo) {
        this.conventionService.selectedConvention = value;
       }

   get createConventionDialog(): boolean {
           return this.conventionService.createConventionDialog;

       }
    set createConventionDialog(value: boolean) {
        this.conventionService.createConventionDialog= value;
       }

       get selectedOrganisme(): OrganismeVo {
           return this.organismeService.selectedOrganisme;
       }
      set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
       }
       get organismes(): Array<OrganismeVo> {
           return this.organismeService.organismes;
       }
       set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
       }
       get createOrganismeDialog(): boolean {
           return this.organismeService.createOrganismeDialog;
       }
      set createOrganismeDialog(value: boolean) {
        this.organismeService.createOrganismeDialog= value;
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

    get validConventionLibelle(): boolean {
    return this._validConventionLibelle;
    }

    set validConventionLibelle(value: boolean) {
    this._validConventionLibelle = value;
    }
    get validConventionOrganisme(): boolean {
    return this._validConventionOrganisme;
    }

    set validConventionOrganisme(value: boolean) {
    this._validConventionOrganisme = value;
    }
    get validConventionDateDebut(): boolean {
    return this._validConventionDateDebut;
    }

    set validConventionDateDebut(value: boolean) {
    this._validConventionDateDebut = value;
    }


}
