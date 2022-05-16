import {Component, OnInit} from '@angular/core';
import {ProduitService} from '../../../../../../controller/service/Produit.service';
import {ProduitVo} from '../../../../../../controller/model/Produit.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PieceJointeProduitVo} from '../../../../../../controller/model/PieceJointeProduit.model';
import {PieceJointeProduitService} from '../../../../../../controller/service/PieceJointeProduit.service';

@Component({
  selector: 'app-produit-view-moderateur',
  templateUrl: './produit-view-moderateur.component.html',
  styleUrls: ['./produit-view-moderateur.component.css']
})
export class ProduitViewModerateurComponent implements OnInit {

        selectedPieceJointeProduits: PieceJointeProduitVo = new PieceJointeProduitVo();
        pieceJointeProduitsListe: Array<PieceJointeProduitVo> = [];



constructor(private datePipe: DatePipe, private produitService: ProduitService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private pieceJointeProduitService :PieceJointeProduitService
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewProduitDialog  = false;
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

   get viewProduitDialog():boolean {
           return this.produitService.viewProduitDialog;

       }
    set viewProduitDialog(value: boolean) {
        this.produitService.viewProduitDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
