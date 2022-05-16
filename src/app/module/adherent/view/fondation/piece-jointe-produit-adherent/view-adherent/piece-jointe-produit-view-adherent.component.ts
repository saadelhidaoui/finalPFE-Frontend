import {Component, OnInit} from '@angular/core';
import {PieceJointeProduitService} from '../../../../../../controller/service/PieceJointeProduit.service';
import {PieceJointeProduitVo} from '../../../../../../controller/model/PieceJointeProduit.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ProduitVo} from '../../../../../../controller/model/Produit.model';
import {ProduitService} from '../../../../../../controller/service/Produit.service';

@Component({
  selector: 'app-piece-jointe-produit-view-adherent',
  templateUrl: './piece-jointe-produit-view-adherent.component.html',
  styleUrls: ['./piece-jointe-produit-view-adherent.component.css']
})
export class PieceJointeProduitViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeProduitService: PieceJointeProduitService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private produitService :ProduitService
) {
}

// methods
ngOnInit(): void {
    this.selectedProduit = new ProduitVo();
    this.produitService.findAll().subscribe((data) => this.produits = data);
}

hideViewDialog(){
    this.viewPieceJointeProduitDialog  = false;
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

   get viewPieceJointeProduitDialog():boolean {
           return this.pieceJointeProduitService.viewPieceJointeProduitDialog;

       }
    set viewPieceJointeProduitDialog(value: boolean) {
        this.pieceJointeProduitService.viewPieceJointeProduitDialog= value;
       }

       get selectedProduit():ProduitVo {
           return this.produitService.selectedProduit;
       }
      set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }
       get produits():Array<ProduitVo> {
           return this.produitService.produits;
       }
       set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }
       get editProduitDialog():boolean {
           return this.produitService.editProduitDialog;
       }
      set editProduitDialog(value: boolean) {
        this.produitService.editProduitDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
