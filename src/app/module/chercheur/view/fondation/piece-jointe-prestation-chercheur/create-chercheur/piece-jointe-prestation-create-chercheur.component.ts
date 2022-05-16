import {Component, OnInit, Input} from '@angular/core';
import {PieceJointePrestationService} from '../../../../../../controller/service/PieceJointePrestation.service';
import {PieceJointePrestationVo} from '../../../../../../controller/model/PieceJointePrestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {PrestationVo} from '../../../../../../controller/model/Prestation.model';
import {PrestationService} from '../../../../../../controller/service/Prestation.service';
@Component({
  selector: 'app-piece-jointe-prestation-create-chercheur',
  templateUrl: './piece-jointe-prestation-create-chercheur.component.html',
  styleUrls: ['./piece-jointe-prestation-create-chercheur.component.css']
})
export class PieceJointePrestationCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPrestationNumArrivee = true;
    _validPrestationEtatPrestation = true;
    _validPrestationChargeCas = true;
    _validPrestationNiveauImportance = true;
    _validPrestationTypePrestation = true;
    _validPrestationAdherent = true;



constructor(private datePipe: DatePipe, private pieceJointePrestationService: PieceJointePrestationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private prestationService :PrestationService
) {

}


// methods
ngOnInit(): void {

    this.selectedPrestation = new PrestationVo();
    this.prestationService.findAll().subscribe((data) => this.prestations = data);
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
     this.pieceJointePrestationService.save().subscribe(pieceJointePrestation=>{
       this.pieceJointePrestations.push({...pieceJointePrestation});
       this.createPieceJointePrestationDialog = false;
       this.submitted = false;
       this.selectedPieceJointePrestation = new PieceJointePrestationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }















//openPopup
              public async openCreateprestation(prestation: string) {
                      const isPermistted = await this.roleService.isPermitted('Prestation', 'add');
                       if(isPermistted){
         this.selectedPrestation = new PrestationVo();
        this.createPrestationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPieceJointePrestationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get pieceJointePrestations(): Array<PieceJointePrestationVo> {
    return this.pieceJointePrestationService.pieceJointePrestations;
       }
set pieceJointePrestations(value: Array<PieceJointePrestationVo>) {
        this.pieceJointePrestationService.pieceJointePrestations = value;
       }

 get selectedPieceJointePrestation():PieceJointePrestationVo {
           return this.pieceJointePrestationService.selectedPieceJointePrestation;
       }
    set selectedPieceJointePrestation(value: PieceJointePrestationVo) {
        this.pieceJointePrestationService.selectedPieceJointePrestation = value;
       }

   get createPieceJointePrestationDialog(): boolean {
           return this.pieceJointePrestationService.createPieceJointePrestationDialog;

       }
    set createPieceJointePrestationDialog(value: boolean) {
        this.pieceJointePrestationService.createPieceJointePrestationDialog= value;
       }

       get selectedPrestation(): PrestationVo {
           return this.prestationService.selectedPrestation;
       }
      set selectedPrestation(value: PrestationVo) {
        this.prestationService.selectedPrestation = value;
       }
       get prestations(): Array<PrestationVo> {
           return this.prestationService.prestations;
       }
       set prestations(value: Array<PrestationVo>) {
        this.prestationService.prestations = value;
       }
       get createPrestationDialog(): boolean {
           return this.prestationService.createPrestationDialog;
       }
      set createPrestationDialog(value: boolean) {
        this.prestationService.createPrestationDialog= value;
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


    get validPrestationNumArrivee(): boolean {
    return this._validPrestationNumArrivee;
    }

    set validPrestationNumArrivee(value: boolean) {
    this._validPrestationNumArrivee = value;
    }
    get validPrestationEtatPrestation(): boolean {
    return this._validPrestationEtatPrestation;
    }

    set validPrestationEtatPrestation(value: boolean) {
    this._validPrestationEtatPrestation = value;
    }
    get validPrestationChargeCas(): boolean {
    return this._validPrestationChargeCas;
    }

    set validPrestationChargeCas(value: boolean) {
    this._validPrestationChargeCas = value;
    }
    get validPrestationNiveauImportance(): boolean {
    return this._validPrestationNiveauImportance;
    }

    set validPrestationNiveauImportance(value: boolean) {
    this._validPrestationNiveauImportance = value;
    }
    get validPrestationTypePrestation(): boolean {
    return this._validPrestationTypePrestation;
    }

    set validPrestationTypePrestation(value: boolean) {
    this._validPrestationTypePrestation = value;
    }
    get validPrestationAdherent(): boolean {
    return this._validPrestationAdherent;
    }

    set validPrestationAdherent(value: boolean) {
    this._validPrestationAdherent = value;
    }

}
