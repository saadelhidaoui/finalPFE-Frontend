import {Component, OnInit, Input} from '@angular/core';
import {PieceJointeEstivageService} from '../../../../../../controller/service/PieceJointeEstivage.service';
import {PieceJointeEstivageVo} from '../../../../../../controller/model/PieceJointeEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';
@Component({
  selector: 'app-piece-jointe-estivage-create-moderateur',
  templateUrl: './piece-jointe-estivage-create-moderateur.component.html',
  styleUrls: ['./piece-jointe-estivage-create-moderateur.component.css']
})
export class PieceJointeEstivageCreateModerateurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEstivageCentreEstivage = true;
    _validEstivageNumArrivee = true;
    _validEstivageNiveauImportance = true;



constructor(private datePipe: DatePipe, private pieceJointeEstivageService: PieceJointeEstivageService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private estivageService :EstivageService
) {

}


// methods
ngOnInit(): void {

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
     this.pieceJointeEstivageService.save().subscribe(pieceJointeEstivage=>{
       this.pieceJointeEstivages.push({...pieceJointeEstivage});
       this.createPieceJointeEstivageDialog = false;
       this.submitted = false;
       this.selectedPieceJointeEstivage = new PieceJointeEstivageVo();


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
// methods

hideCreateDialog(){
    this.createPieceJointeEstivageDialog  = false;
    this.setValidation(true);
}

// getters and setters

get pieceJointeEstivages(): Array<PieceJointeEstivageVo> {
    return this.pieceJointeEstivageService.pieceJointeEstivages;
       }
set pieceJointeEstivages(value: Array<PieceJointeEstivageVo>) {
        this.pieceJointeEstivageService.pieceJointeEstivages = value;
       }

 get selectedPieceJointeEstivage():PieceJointeEstivageVo {
           return this.pieceJointeEstivageService.selectedPieceJointeEstivage;
       }
    set selectedPieceJointeEstivage(value: PieceJointeEstivageVo) {
        this.pieceJointeEstivageService.selectedPieceJointeEstivage = value;
       }

   get createPieceJointeEstivageDialog(): boolean {
           return this.pieceJointeEstivageService.createPieceJointeEstivageDialog;

       }
    set createPieceJointeEstivageDialog(value: boolean) {
        this.pieceJointeEstivageService.createPieceJointeEstivageDialog= value;
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

}
