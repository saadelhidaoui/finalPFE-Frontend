import {Component, OnInit} from '@angular/core';
import {PieceJointeReclamationService} from '../../../../../../controller/service/PieceJointeReclamation.service';
import {PieceJointeReclamationVo} from '../../../../../../controller/model/PieceJointeReclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ReclamationVo} from '../../../../../../controller/model/Reclamation.model';
import {ReclamationService} from '../../../../../../controller/service/Reclamation.service';

@Component({
  selector: 'app-piece-jointe-reclamation-edit-admin',
  templateUrl: './piece-jointe-reclamation-edit-admin.component.html',
  styleUrls: ['./piece-jointe-reclamation-edit-admin.component.css']
})
export class PieceJointeReclamationEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeReclamationService: PieceJointeReclamationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private reclamationService: ReclamationService
) {
}

// methods
ngOnInit(): void {
    this.selectedReclamation = new ReclamationVo();
    this.reclamationService.findAll().subscribe((data) => this.reclamations = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPieceJointeReclamation.dateAjout = DateUtils.toDate(this.selectedPieceJointeReclamation.dateAjout);
            this.selectedPieceJointeReclamation.dateArchivage = DateUtils.toDate(this.selectedPieceJointeReclamation.dateArchivage);
            this.selectedPieceJointeReclamation.dateCreation = DateUtils.toDate(this.selectedPieceJointeReclamation.dateCreation);
    this.pieceJointeReclamationService.edit().subscribe(pieceJointeReclamation=>{
    const myIndex = this.pieceJointeReclamations.findIndex(e => e.id === this.selectedPieceJointeReclamation.id);
    this.pieceJointeReclamations[myIndex] = this.selectedPieceJointeReclamation;
    this.editPieceJointeReclamationDialog = false;
    this.selectedPieceJointeReclamation = new PieceJointeReclamationVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editPieceJointeReclamationDialog  = false;
}

// getters and setters

get pieceJointeReclamations(): Array<PieceJointeReclamationVo> {
    return this.pieceJointeReclamationService.pieceJointeReclamations;
       }
set pieceJointeReclamations(value: Array<PieceJointeReclamationVo>) {
        this.pieceJointeReclamationService.pieceJointeReclamations = value;
       }

 get selectedPieceJointeReclamation(): PieceJointeReclamationVo {
           return this.pieceJointeReclamationService.selectedPieceJointeReclamation;
       }
    set selectedPieceJointeReclamation(value: PieceJointeReclamationVo) {
        this.pieceJointeReclamationService.selectedPieceJointeReclamation = value;
       }

   get editPieceJointeReclamationDialog(): boolean {
           return this.pieceJointeReclamationService.editPieceJointeReclamationDialog;

       }
    set editPieceJointeReclamationDialog(value: boolean) {
        this.pieceJointeReclamationService.editPieceJointeReclamationDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
