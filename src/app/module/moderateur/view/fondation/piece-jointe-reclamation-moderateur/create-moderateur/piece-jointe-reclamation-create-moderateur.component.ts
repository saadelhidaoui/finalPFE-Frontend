import {Component, OnInit, Input} from '@angular/core';
import {PieceJointeReclamationService} from '../../../../../../controller/service/PieceJointeReclamation.service';
import {PieceJointeReclamationVo} from '../../../../../../controller/model/PieceJointeReclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';
@Component({
  selector: 'app-piece-jointe-reclamation-create-moderateur',
  templateUrl: './piece-jointe-reclamation-create-moderateur.component.html',
  styleUrls: ['./piece-jointe-reclamation-create-moderateur.component.css']
})
export class PieceJointeReclamationCreateModerateurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validReclamationLibelle = true;
    _validReclamationDescription = true;
    _validReclamationAdherent = true;



constructor(private datePipe: DatePipe, private pieceJointeReclamationService: PieceJointeReclamationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private reclamationService :ReclamationService
) {

}


// methods
ngOnInit(): void {

    this.selectedReclamation = new ReclamationVo();
    this.reclamationService.findAll().subscribe((data) => this.reclamations = data);
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
     this.pieceJointeReclamationService.save().subscribe(pieceJointeReclamation=>{
       this.pieceJointeReclamations.push({...pieceJointeReclamation});
       this.createPieceJointeReclamationDialog = false;
       this.submitted = false;
       this.selectedPieceJointeReclamation = new PieceJointeReclamationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }















//openPopup
              public async openCreatereclamation(reclamation: string) {
                      const isPermistted = await this.roleService.isPermitted('Reclamation', 'add');
                       if(isPermistted){
         this.selectedReclamation = new ReclamationVo();
        this.createReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPieceJointeReclamationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get pieceJointeReclamations(): Array<PieceJointeReclamationVo> {
    return this.pieceJointeReclamationService.pieceJointeReclamations;
       }
set pieceJointeReclamations(value: Array<PieceJointeReclamationVo>) {
        this.pieceJointeReclamationService.pieceJointeReclamations = value;
       }

 get selectedPieceJointeReclamation():PieceJointeReclamationVo {
           return this.pieceJointeReclamationService.selectedPieceJointeReclamation;
       }
    set selectedPieceJointeReclamation(value: PieceJointeReclamationVo) {
        this.pieceJointeReclamationService.selectedPieceJointeReclamation = value;
       }

   get createPieceJointeReclamationDialog(): boolean {
           return this.pieceJointeReclamationService.createPieceJointeReclamationDialog;

       }
    set createPieceJointeReclamationDialog(value: boolean) {
        this.pieceJointeReclamationService.createPieceJointeReclamationDialog= value;
       }

       get selectedReclamation(): ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
      set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }
       get reclamations(): Array<ReclamationVo> {
           return this.reclamationService.reclamations;
       }
       set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }
       get createReclamationDialog(): boolean {
           return this.reclamationService.createReclamationDialog;
       }
      set createReclamationDialog(value: boolean) {
        this.reclamationService.createReclamationDialog= value;
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


    get validReclamationLibelle(): boolean {
    return this._validReclamationLibelle;
    }

    set validReclamationLibelle(value: boolean) {
    this._validReclamationLibelle = value;
    }
    get validReclamationDescription(): boolean {
    return this._validReclamationDescription;
    }

    set validReclamationDescription(value: boolean) {
    this._validReclamationDescription = value;
    }
    get validReclamationAdherent(): boolean {
    return this._validReclamationAdherent;
    }

    set validReclamationAdherent(value: boolean) {
    this._validReclamationAdherent = value;
    }

}
