import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../../../../controller/service/Produit.service';
import {ProduitVo} from '../../../../../../controller/model/Produit.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PieceJointeProduitVo} from '../../../../../../controller/model/PieceJointeProduit.model';
import {PieceJointeProduitService} from '../../../../../../controller/service/PieceJointeProduit.service';

@Component({
  selector: 'app-produit-edit-adherent',
  templateUrl: './produit-edit-adherent.component.html',
  styleUrls: ['./produit-edit-adherent.component.css']
})
export class ProduitEditAdherentComponent implements OnInit {

        selectedPieceJointeProduits: PieceJointeProduitVo = new PieceJointeProduitVo();
        pieceJointeProduitsListe: Array<PieceJointeProduitVo> = [];



constructor(private datePipe: DatePipe, private produitService: ProduitService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private pieceJointeProduitService: PieceJointeProduitService
) {
}

// methods
ngOnInit(): void {
}
        addPieceJointeProduits() {
        if( this.selectedProduit.pieceJointeProduitsVo == null ){
            this.selectedProduit.pieceJointeProduitsVo = new Array<PieceJointeProduitVo>();
        }
        this.selectedProduit.pieceJointeProduitsVo.push(this.selectedPieceJointeProduits);
        this.selectedPieceJointeProduits = new PieceJointeProduitVo();
        }

       deletePieceJointeProduits(p: PieceJointeProduitVo) {
        this.selectedProduit.pieceJointeProduitsVo.forEach((element, index) => {
            if (element === p) { this.selectedProduit.pieceJointeProduitsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedProduit.dateArrivee = DateUtils.toDate(this.selectedProduit.dateArrivee);
            this.selectedProduit.dateArchivage = DateUtils.toDate(this.selectedProduit.dateArchivage);
            this.selectedProduit.dateCreation = DateUtils.toDate(this.selectedProduit.dateCreation);
    this.produitService.edit().subscribe(produit=>{
    const myIndex = this.produits.findIndex(e => e.id === this.selectedProduit.id);
    this.produits[myIndex] = this.selectedProduit;
    this.editProduitDialog = false;
    this.selectedProduit = new ProduitVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editProduitDialog  = false;
}

// getters and setters

get produits(): Array<ProduitVo> {
    return this.produitService.produits;
       }
set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }

 get selectedProduit(): ProduitVo {
           return this.produitService.selectedProduit;
       }
    set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }

   get editProduitDialog(): boolean {
           return this.produitService.editProduitDialog;

       }
    set editProduitDialog(value: boolean) {
        this.produitService.editProduitDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
