import {Component, OnInit, Input} from '@angular/core';
import {PieceJointeConventionService} from '../../../../../../controller/service/PieceJointeConvention.service';
import {PieceJointeConventionVo} from '../../../../../../controller/model/PieceJointeConvention.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {ConventionVo} from '../../../../../../controller/model/Convention.model';
import {ConventionService} from '../../../../../../controller/service/Convention.service';
@Component({
  selector: 'app-piece-jointe-convention-create-chercheur',
  templateUrl: './piece-jointe-convention-create-chercheur.component.html',
  styleUrls: ['./piece-jointe-convention-create-chercheur.component.css']
})
export class PieceJointeConventionCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validConventionLibelle = true;
    _validConventionOrganisme = true;
    _validConventionDateDebut = true;



constructor(private datePipe: DatePipe, private pieceJointeConventionService: PieceJointeConventionService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private conventionService :ConventionService
) {

}


// methods
ngOnInit(): void {

    this.selectedConvention = new ConventionVo();
    this.conventionService.findAll().subscribe((data) => this.conventions = data);
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
     this.pieceJointeConventionService.save().subscribe(pieceJointeConvention=>{
       this.pieceJointeConventions.push({...pieceJointeConvention});
       this.createPieceJointeConventionDialog = false;
       this.submitted = false;
       this.selectedPieceJointeConvention = new PieceJointeConventionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }















//openPopup
              public async openCreateconvention(convention: string) {
                      const isPermistted = await this.roleService.isPermitted('Convention', 'add');
                       if(isPermistted){
         this.selectedConvention = new ConventionVo();
        this.createConventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPieceJointeConventionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get pieceJointeConventions(): Array<PieceJointeConventionVo> {
    return this.pieceJointeConventionService.pieceJointeConventions;
       }
set pieceJointeConventions(value: Array<PieceJointeConventionVo>) {
        this.pieceJointeConventionService.pieceJointeConventions = value;
       }

 get selectedPieceJointeConvention():PieceJointeConventionVo {
           return this.pieceJointeConventionService.selectedPieceJointeConvention;
       }
    set selectedPieceJointeConvention(value: PieceJointeConventionVo) {
        this.pieceJointeConventionService.selectedPieceJointeConvention = value;
       }

   get createPieceJointeConventionDialog(): boolean {
           return this.pieceJointeConventionService.createPieceJointeConventionDialog;

       }
    set createPieceJointeConventionDialog(value: boolean) {
        this.pieceJointeConventionService.createPieceJointeConventionDialog= value;
       }

       get selectedConvention(): ConventionVo {
           return this.conventionService.selectedConvention;
       }
      set selectedConvention(value: ConventionVo) {
        this.conventionService.selectedConvention = value;
       }
       get conventions(): Array<ConventionVo> {
           return this.conventionService.conventions;
       }
       set conventions(value: Array<ConventionVo>) {
        this.conventionService.conventions = value;
       }
       get createConventionDialog(): boolean {
           return this.conventionService.createConventionDialog;
       }
      set createConventionDialog(value: boolean) {
        this.conventionService.createConventionDialog= value;
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
