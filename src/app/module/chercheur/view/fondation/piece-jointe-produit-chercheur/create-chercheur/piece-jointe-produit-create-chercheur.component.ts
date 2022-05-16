import {Component, OnInit, Input} from '@angular/core';
import {PieceJointeProduitService} from '../../../../../../controller/service/PieceJointeProduit.service';
import {PieceJointeProduitVo} from '../../../../../../controller/model/PieceJointeProduit.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {ProduitVo} from '../../../../../../controller/model/Produit.model';
import {ProduitService} from '../../../../../../controller/service/Produit.service';
@Component({
  selector: 'app-piece-jointe-produit-create-chercheur',
  templateUrl: './piece-jointe-produit-create-chercheur.component.html',
  styleUrls: ['./piece-jointe-produit-create-chercheur.component.css']
})
export class PieceJointeProduitCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validProduitLibelle = true;
    _validProduitDateArrivee = true;
    _validProduitQuantite = true;



constructor(private datePipe: DatePipe, private pieceJointeProduitService: PieceJointeProduitService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private produitService :ProduitService
) {

}


// methods
ngOnInit(): void {

    this.selectedProduit = new ProduitVo();
    this.produitService.findAll().subscribe((data) => this.produits = data);
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
     this.pieceJointeProduitService.save().subscribe(pieceJointeProduit=>{
       this.pieceJointeProduits.push({...pieceJointeProduit});
       this.createPieceJointeProduitDialog = false;
       this.submitted = false;
       this.selectedPieceJointeProduit = new PieceJointeProduitVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }















//openPopup
              public async openCreateproduit(produit: string) {
                      const isPermistted = await this.roleService.isPermitted('Produit', 'add');
                       if(isPermistted){
         this.selectedProduit = new ProduitVo();
        this.createProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPieceJointeProduitDialog  = false;
    this.setValidation(true);
}

// getters and setters

get pieceJointeProduits(): Array<PieceJointeProduitVo> {
    return this.pieceJointeProduitService.pieceJointeProduits;
       }
set pieceJointeProduits(value: Array<PieceJointeProduitVo>) {
        this.pieceJointeProduitService.pieceJointeProduits = value;
       }

 get selectedPieceJointeProduit():PieceJointeProduitVo {
           return this.pieceJointeProduitService.selectedPieceJointeProduit;
       }
    set selectedPieceJointeProduit(value: PieceJointeProduitVo) {
        this.pieceJointeProduitService.selectedPieceJointeProduit = value;
       }

   get createPieceJointeProduitDialog(): boolean {
           return this.pieceJointeProduitService.createPieceJointeProduitDialog;

       }
    set createPieceJointeProduitDialog(value: boolean) {
        this.pieceJointeProduitService.createPieceJointeProduitDialog= value;
       }

       get selectedProduit(): ProduitVo {
           return this.produitService.selectedProduit;
       }
      set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }
       get produits(): Array<ProduitVo> {
           return this.produitService.produits;
       }
       set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
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
