import {Component, OnInit, Input} from '@angular/core';
import {RendezVousService} from '../../../../../../controller/service/RendezVous.service';
import {RendezVousVo} from '../../../../../../controller/model/RendezVous.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {PieceJointeRendezVousVo} from '../../../../../../controller/model/PieceJointeRendezVous.model';
import {PieceJointeRendezVousService} from '../../../../../../controller/service/PieceJointeRendezVous.service';
@Component({
  selector: 'app-rendez-vous-create-chercheur',
  templateUrl: './rendez-vous-create-chercheur.component.html',
  styleUrls: ['./rendez-vous-create-chercheur.component.css']
})
export class RendezVousCreateChercheurComponent implements OnInit {

        selectedPieceJointeRendezVous: PieceJointeRendezVousVo = new PieceJointeRendezVousVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validRendezVousDateDebut = true;




constructor(private datePipe: DatePipe, private rendezVousService: RendezVousService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private pieceJointeRendezVousService :PieceJointeRendezVousService
) {

}


// methods
ngOnInit(): void {




}


    validatePieceJointeRendezVous(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validRendezVousDateDebut = value;
    }

        addPieceJointeRendezVous() {
        if( this.selectedRendezVous.pieceJointeRendezVousVo == null ){
            this.selectedRendezVous.pieceJointeRendezVousVo = new Array<PieceJointeRendezVousVo>();
        }
       this.validatePieceJointeRendezVous();
       if (this.errorMessages.length === 0) {
              this.selectedRendezVous.pieceJointeRendezVousVo.push(this.selectedPieceJointeRendezVous);
              this.selectedPieceJointeRendezVous = new PieceJointeRendezVousVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePieceJointeRendezVous(p: PieceJointeRendezVousVo) {
        this.selectedRendezVous.pieceJointeRendezVousVo.forEach((element, index) => {
            if (element === p) { this.selectedRendezVous.pieceJointeRendezVousVo.splice(index, 1); }
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
     this.rendezVousService.save().subscribe(rendezVous=>{
       this.rendezVouss.push({...rendezVous});
       this.createRendezVousDialog = false;
       this.submitted = false;
       this.selectedRendezVous = new RendezVousVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateRendezVousDateDebut();

    }

private validateRendezVousDateDebut(){
        if (this.stringUtilService.isEmpty(this.selectedRendezVous.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validRendezVousDateDebut = false;
        } else {
            this.validRendezVousDateDebut = true;
        }
    }



























//openPopup
// methods

hideCreateDialog(){
    this.createRendezVousDialog  = false;
    this.setValidation(true);
}

// getters and setters

get rendezVouss(): Array<RendezVousVo> {
    return this.rendezVousService.rendezVouss;
       }
set rendezVouss(value: Array<RendezVousVo>) {
        this.rendezVousService.rendezVouss = value;
       }

 get selectedRendezVous():RendezVousVo {
           return this.rendezVousService.selectedRendezVous;
       }
    set selectedRendezVous(value: RendezVousVo) {
        this.rendezVousService.selectedRendezVous = value;
       }

   get createRendezVousDialog(): boolean {
           return this.rendezVousService.createRendezVousDialog;

       }
    set createRendezVousDialog(value: boolean) {
        this.rendezVousService.createRendezVousDialog= value;
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

    get validRendezVousDateDebut(): boolean {
    return this._validRendezVousDateDebut;
    }

    set validRendezVousDateDebut(value: boolean) {
    this._validRendezVousDateDebut = value;
    }


}
