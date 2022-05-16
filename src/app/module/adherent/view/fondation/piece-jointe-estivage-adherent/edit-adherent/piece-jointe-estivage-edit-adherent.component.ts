import {Component, OnInit} from '@angular/core';
import {PieceJointeEstivageService} from '../../../../../../controller/service/PieceJointeEstivage.service';
import {PieceJointeEstivageVo} from '../../../../../../controller/model/PieceJointeEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EstivageVo} from '../../../../../../controller/model/Estivage.model';
import {EstivageService} from '../../../../../../controller/service/Estivage.service';

@Component({
  selector: 'app-piece-jointe-estivage-edit-adherent',
  templateUrl: './piece-jointe-estivage-edit-adherent.component.html',
  styleUrls: ['./piece-jointe-estivage-edit-adherent.component.css']
})
export class PieceJointeEstivageEditAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeEstivageService: PieceJointeEstivageService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private estivageService: EstivageService
) {
}

// methods
ngOnInit(): void {
    this.selectedEstivage = new EstivageVo();
    this.estivageService.findAll().subscribe((data) => this.estivages = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPieceJointeEstivage.dateAjout = DateUtils.toDate(this.selectedPieceJointeEstivage.dateAjout);
            this.selectedPieceJointeEstivage.dateArchivage = DateUtils.toDate(this.selectedPieceJointeEstivage.dateArchivage);
            this.selectedPieceJointeEstivage.dateCreation = DateUtils.toDate(this.selectedPieceJointeEstivage.dateCreation);
    this.pieceJointeEstivageService.edit().subscribe(pieceJointeEstivage=>{
    const myIndex = this.pieceJointeEstivages.findIndex(e => e.id === this.selectedPieceJointeEstivage.id);
    this.pieceJointeEstivages[myIndex] = this.selectedPieceJointeEstivage;
    this.editPieceJointeEstivageDialog = false;
    this.selectedPieceJointeEstivage = new PieceJointeEstivageVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateestivage(estivage: string) {
                      const isPermistted = await this.roleService.isPermitted('Estivage', 'add');
                       if(isPermistted){
         this.selectedEstivage = new EstivageVo();
        this.createEstivageDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPieceJointeEstivageDialog  = false;
}

// getters and setters

get pieceJointeEstivages(): Array<PieceJointeEstivageVo> {
    return this.pieceJointeEstivageService.pieceJointeEstivages;
       }
set pieceJointeEstivages(value: Array<PieceJointeEstivageVo>) {
        this.pieceJointeEstivageService.pieceJointeEstivages = value;
       }

 get selectedPieceJointeEstivage(): PieceJointeEstivageVo {
           return this.pieceJointeEstivageService.selectedPieceJointeEstivage;
       }
    set selectedPieceJointeEstivage(value: PieceJointeEstivageVo) {
        this.pieceJointeEstivageService.selectedPieceJointeEstivage = value;
       }

   get editPieceJointeEstivageDialog(): boolean {
           return this.pieceJointeEstivageService.editPieceJointeEstivageDialog;

       }
    set editPieceJointeEstivageDialog(value: boolean) {
        this.pieceJointeEstivageService.editPieceJointeEstivageDialog = value;
       }

       get selectedEstivage(): EstivageVo {
           return this.estivageService.selectedEstivage;
       }
      set selectedEstivage(value: EstivageVo) {
        this.estivageService.selectedEstivage = value;
       }
       get estivages(): Array<EstivageVo> {
           return this.estivageService.estivages;
       }
       set estivages(value: Array<EstivageVo>) {
        this.estivageService.estivages = value;
       }
       get createEstivageDialog(): boolean {
           return this.estivageService.createEstivageDialog;
       }
      set createEstivageDialog(value: boolean) {
        this.estivageService.createEstivageDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
