import {Component, OnInit} from '@angular/core';
import {PieceJointeProduitService} from '../../../../../../controller/service/PieceJointeProduit.service';
import {PieceJointeProduitVo} from '../../../../../../controller/model/PieceJointeProduit.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ProduitVo} from '../../../../../../controller/model/Produit.model';
import {ProduitService} from '../../../../../../controller/service/Produit.service';

@Component({
  selector: 'app-piece-jointe-produit-edit-chercheur',
  templateUrl: './piece-jointe-produit-edit-chercheur.component.html',
  styleUrls: ['./piece-jointe-produit-edit-chercheur.component.css']
})
export class PieceJointeProduitEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeProduitService: PieceJointeProduitService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private produitService: ProduitService
) {
}

// methods
ngOnInit(): void {
    this.selectedProduit = new ProduitVo();
    this.produitService.findAll().subscribe((data) => this.produits = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPieceJointeProduit.dateAjout = DateUtils.toDate(this.selectedPieceJointeProduit.dateAjout);
            this.selectedPieceJointeProduit.dateArchivage = DateUtils.toDate(this.selectedPieceJointeProduit.dateArchivage);
            this.selectedPieceJointeProduit.dateCreation = DateUtils.toDate(this.selectedPieceJointeProduit.dateCreation);
    this.pieceJointeProduitService.edit().subscribe(pieceJointeProduit=>{
    const myIndex = this.pieceJointeProduits.findIndex(e => e.id === this.selectedPieceJointeProduit.id);
    this.pieceJointeProduits[myIndex] = this.selectedPieceJointeProduit;
    this.editPieceJointeProduitDialog = false;
    this.selectedPieceJointeProduit = new PieceJointeProduitVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editPieceJointeProduitDialog  = false;
}

// getters and setters

get pieceJointeProduits(): Array<PieceJointeProduitVo> {
    return this.pieceJointeProduitService.pieceJointeProduits;
       }
set pieceJointeProduits(value: Array<PieceJointeProduitVo>) {
        this.pieceJointeProduitService.pieceJointeProduits = value;
       }

 get selectedPieceJointeProduit(): PieceJointeProduitVo {
           return this.pieceJointeProduitService.selectedPieceJointeProduit;
       }
    set selectedPieceJointeProduit(value: PieceJointeProduitVo) {
        this.pieceJointeProduitService.selectedPieceJointeProduit = value;
       }

   get editPieceJointeProduitDialog(): boolean {
           return this.pieceJointeProduitService.editPieceJointeProduitDialog;

       }
    set editPieceJointeProduitDialog(value: boolean) {
        this.pieceJointeProduitService.editPieceJointeProduitDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
