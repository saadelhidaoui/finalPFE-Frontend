import {Component, OnInit, Input} from '@angular/core';
import {ProduitService} from '../../../../../../controller/service/Produit.service';
import {ProduitVo} from '../../../../../../controller/model/Produit.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {PieceJointeProduitVo} from '../../../../../../controller/model/PieceJointeProduit.model';
import {PieceJointeProduitService} from '../../../../../../controller/service/PieceJointeProduit.service';
@Component({
  selector: 'app-produit-create-adherent',
  templateUrl: './produit-create-adherent.component.html',
  styleUrls: ['./produit-create-adherent.component.css']
})
export class ProduitCreateAdherentComponent implements OnInit {

        selectedPieceJointeProduits: PieceJointeProduitVo = new PieceJointeProduitVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validProduitLibelle = true;
   _validProduitDateArrivee = true;
   _validProduitQuantite = true;




constructor(private datePipe: DatePipe, private produitService: ProduitService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private pieceJointeProduitService :PieceJointeProduitService
) {

}


// methods
ngOnInit(): void {




}


    validatePieceJointeProduits(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validProduitLibelle = value;
    this.validProduitDateArrivee = value;
    this.validProduitQuantite = value;
    }

        addPieceJointeProduits() {
        if( this.selectedProduit.pieceJointeProduitsVo == null ){
            this.selectedProduit.pieceJointeProduitsVo = new Array<PieceJointeProduitVo>();
        }
       this.validatePieceJointeProduits();
       if (this.errorMessages.length === 0) {
              this.selectedProduit.pieceJointeProduitsVo.push(this.selectedPieceJointeProduits);
              this.selectedPieceJointeProduits = new PieceJointeProduitVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePieceJointeProduits(p: PieceJointeProduitVo) {
        this.selectedProduit.pieceJointeProduitsVo.forEach((element, index) => {
            if (element === p) { this.selectedProduit.pieceJointeProduitsVo.splice(index, 1); }
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
     this.produitService.save().subscribe(produit=>{
       this.produits.push({...produit});
       this.createProduitDialog = false;
       this.submitted = false;
       this.selectedProduit = new ProduitVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateProduitLibelle();
this.validateProduitDateArrivee();
this.validateProduitQuantite();

    }

private validateProduitLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedProduit.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validProduitLibelle = false;
        } else {
            this.validProduitLibelle = true;
        }
    }
private validateProduitDateArrivee(){
        if (this.stringUtilService.isEmpty(this.selectedProduit.dateArrivee)) {
            this.errorMessages.push('Date arrivee non valide');
            this.validProduitDateArrivee = false;
        } else {
            this.validProduitDateArrivee = true;
        }
    }
private validateProduitQuantite(){
        if (this.stringUtilService.isEmpty(this.selectedProduit.quantite)) {
            this.errorMessages.push('Quantite non valide');
            this.validProduitQuantite = false;
        } else {
            this.validProduitQuantite = true;
        }
    }



























//openPopup
// methods

hideCreateDialog(){
    this.createProduitDialog  = false;
    this.setValidation(true);
}

// getters and setters

get produits(): Array<ProduitVo> {
    return this.produitService.produits;
       }
set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }

 get selectedProduit():ProduitVo {
           return this.produitService.selectedProduit;
       }
    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }

   get createProduitDialog(): boolean {
           return this.produitService.createProduitDialog;

       }
    set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog= value;
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

    get validProduitLibelle(): boolean {
    return this._validProduitLibelle;
    }

    set validProduitLibelle(value: boolean) {
    this._validProduitLibelle = value;
    }
    get validProduitDateArrivee(): boolean {
    return this._validProduitDateArrivee;
    }

    set validProduitDateArrivee(value: boolean) {
    this._validProduitDateArrivee = value;
    }
    get validProduitQuantite(): boolean {
    return this._validProduitQuantite;
    }

    set validProduitQuantite(value: boolean) {
    this._validProduitQuantite = value;
    }


}
