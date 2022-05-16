import {Component, OnInit, Input} from '@angular/core';
import {PieceJointeRendezVousService} from '../../../../../../controller/service/PieceJointeRendezVous.service';
import {PieceJointeRendezVousVo} from '../../../../../../controller/model/PieceJointeRendezVous.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {RendezVousVo} from '../../../../../../controller/model/RendezVous.model';
import {RendezVousService} from '../../../../../../controller/service/RendezVous.service';
@Component({
  selector: 'app-piece-jointe-rendez-vous-create-chercheur',
  templateUrl: './piece-jointe-rendez-vous-create-chercheur.component.html',
  styleUrls: ['./piece-jointe-rendez-vous-create-chercheur.component.css']
})
export class PieceJointeRendezVousCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validRendezVousDateDebut = true;



constructor(private datePipe: DatePipe, private pieceJointeRendezVousService: PieceJointeRendezVousService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private rendezVousService :RendezVousService
) {

}


// methods
ngOnInit(): void {

    this.selectedRendezVous = new RendezVousVo();
    this.rendezVousService.findAll().subscribe((data) => this.rendezVouss = data);
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
     this.pieceJointeRendezVousService.save().subscribe(pieceJointeRendezVous=>{
       this.pieceJointeRendezVouss.push({...pieceJointeRendezVous});
       this.createPieceJointeRendezVousDialog = false;
       this.submitted = false;
       this.selectedPieceJointeRendezVous = new PieceJointeRendezVousVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }















//openPopup
              public async openCreaterendezVous(rendezVous: string) {
                      const isPermistted = await this.roleService.isPermitted('RendezVous', 'add');
                       if(isPermistted){
         this.selectedRendezVous = new RendezVousVo();
        this.createRendezVousDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPieceJointeRendezVousDialog  = false;
    this.setValidation(true);
}

// getters and setters

get pieceJointeRendezVouss(): Array<PieceJointeRendezVousVo> {
    return this.pieceJointeRendezVousService.pieceJointeRendezVouss;
       }
set pieceJointeRendezVouss(value: Array<PieceJointeRendezVousVo>) {
        this.pieceJointeRendezVousService.pieceJointeRendezVouss = value;
       }

 get selectedPieceJointeRendezVous():PieceJointeRendezVousVo {
           return this.pieceJointeRendezVousService.selectedPieceJointeRendezVous;
       }
    set selectedPieceJointeRendezVous(value: PieceJointeRendezVousVo) {
        this.pieceJointeRendezVousService.selectedPieceJointeRendezVous = value;
       }

   get createPieceJointeRendezVousDialog(): boolean {
           return this.pieceJointeRendezVousService.createPieceJointeRendezVousDialog;

       }
    set createPieceJointeRendezVousDialog(value: boolean) {
        this.pieceJointeRendezVousService.createPieceJointeRendezVousDialog= value;
       }

       get selectedRendezVous(): RendezVousVo {
           return this.rendezVousService.selectedRendezVous;
       }
      set selectedRendezVous(value: RendezVousVo) {
        this.rendezVousService.selectedRendezVous = value;
       }
       get rendezVouss(): Array<RendezVousVo> {
           return this.rendezVousService.rendezVouss;
       }
       set rendezVouss(value: Array<RendezVousVo>) {
        this.rendezVousService.rendezVouss = value;
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
