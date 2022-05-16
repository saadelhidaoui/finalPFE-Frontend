import {Component, OnInit} from '@angular/core';
import {PieceJointePrestationService} from '../../../../../../controller/service/PieceJointePrestation.service';
import {PieceJointePrestationVo} from '../../../../../../controller/model/PieceJointePrestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PrestationVo} from '../../../../../../controller/model/Prestation.model';
import {PrestationService} from '../../../../../../controller/service/Prestation.service';

@Component({
  selector: 'app-piece-jointe-prestation-edit-chercheur',
  templateUrl: './piece-jointe-prestation-edit-chercheur.component.html',
  styleUrls: ['./piece-jointe-prestation-edit-chercheur.component.css']
})
export class PieceJointePrestationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointePrestationService: PieceJointePrestationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private prestationService: PrestationService
) {
}

// methods
ngOnInit(): void {
    this.selectedPrestation = new PrestationVo();
    this.prestationService.findAll().subscribe((data) => this.prestations = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPieceJointePrestation.dateAjout = DateUtils.toDate(this.selectedPieceJointePrestation.dateAjout);
            this.selectedPieceJointePrestation.dateArchivage = DateUtils.toDate(this.selectedPieceJointePrestation.dateArchivage);
            this.selectedPieceJointePrestation.dateCreation = DateUtils.toDate(this.selectedPieceJointePrestation.dateCreation);
    this.pieceJointePrestationService.edit().subscribe(pieceJointePrestation=>{
    const myIndex = this.pieceJointePrestations.findIndex(e => e.id === this.selectedPieceJointePrestation.id);
    this.pieceJointePrestations[myIndex] = this.selectedPieceJointePrestation;
    this.editPieceJointePrestationDialog = false;
    this.selectedPieceJointePrestation = new PieceJointePrestationVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editPieceJointePrestationDialog  = false;
}

// getters and setters

get pieceJointePrestations(): Array<PieceJointePrestationVo> {
    return this.pieceJointePrestationService.pieceJointePrestations;
       }
set pieceJointePrestations(value: Array<PieceJointePrestationVo>) {
        this.pieceJointePrestationService.pieceJointePrestations = value;
       }

 get selectedPieceJointePrestation(): PieceJointePrestationVo {
           return this.pieceJointePrestationService.selectedPieceJointePrestation;
       }
    set selectedPieceJointePrestation(value: PieceJointePrestationVo) {
        this.pieceJointePrestationService.selectedPieceJointePrestation = value;
       }

   get editPieceJointePrestationDialog(): boolean {
           return this.pieceJointePrestationService.editPieceJointePrestationDialog;

       }
    set editPieceJointePrestationDialog(value: boolean) {
        this.pieceJointePrestationService.editPieceJointePrestationDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
