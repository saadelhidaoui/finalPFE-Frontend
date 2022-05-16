import {Component, OnInit} from '@angular/core';
import {PieceJointeConventionService} from '../../../../../../controller/service/PieceJointeConvention.service';
import {PieceJointeConventionVo} from '../../../../../../controller/model/PieceJointeConvention.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConventionVo} from '../../../../../../controller/model/Convention.model';
import {ConventionService} from '../../../../../../controller/service/Convention.service';

@Component({
  selector: 'app-piece-jointe-convention-edit-chercheur',
  templateUrl: './piece-jointe-convention-edit-chercheur.component.html',
  styleUrls: ['./piece-jointe-convention-edit-chercheur.component.css']
})
export class PieceJointeConventionEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeConventionService: PieceJointeConventionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private conventionService: ConventionService
) {
}

// methods
ngOnInit(): void {
    this.selectedConvention = new ConventionVo();
    this.conventionService.findAll().subscribe((data) => this.conventions = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPieceJointeConvention.dateAjout = DateUtils.toDate(this.selectedPieceJointeConvention.dateAjout);
            this.selectedPieceJointeConvention.dateArchivage = DateUtils.toDate(this.selectedPieceJointeConvention.dateArchivage);
            this.selectedPieceJointeConvention.dateCreation = DateUtils.toDate(this.selectedPieceJointeConvention.dateCreation);
    this.pieceJointeConventionService.edit().subscribe(pieceJointeConvention=>{
    const myIndex = this.pieceJointeConventions.findIndex(e => e.id === this.selectedPieceJointeConvention.id);
    this.pieceJointeConventions[myIndex] = this.selectedPieceJointeConvention;
    this.editPieceJointeConventionDialog = false;
    this.selectedPieceJointeConvention = new PieceJointeConventionVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateconvention(convention: string) {
                      const isPermistted = await this.roleService.isPermitted('Convention', 'add');
                       if(isPermistted){
         this.selectedConvention = new ConventionVo();
        this.createConventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPieceJointeConventionDialog  = false;
}

// getters and setters

get pieceJointeConventions(): Array<PieceJointeConventionVo> {
    return this.pieceJointeConventionService.pieceJointeConventions;
       }
set pieceJointeConventions(value: Array<PieceJointeConventionVo>) {
        this.pieceJointeConventionService.pieceJointeConventions = value;
       }

 get selectedPieceJointeConvention(): PieceJointeConventionVo {
           return this.pieceJointeConventionService.selectedPieceJointeConvention;
       }
    set selectedPieceJointeConvention(value: PieceJointeConventionVo) {
        this.pieceJointeConventionService.selectedPieceJointeConvention = value;
       }

   get editPieceJointeConventionDialog(): boolean {
           return this.pieceJointeConventionService.editPieceJointeConventionDialog;

       }
    set editPieceJointeConventionDialog(value: boolean) {
        this.pieceJointeConventionService.editPieceJointeConventionDialog = value;
       }

       get selectedConvention(): ConventionVo {
           return this.conventionService.selectedConvention;
       }
      set selectedConvention(value: ConventionVo) {
        this.conventionService.selectedConvention = value;
       }
       get conventions(): Array<ConventionVo> {
           return this.conventionService.conventions;
       }
       set conventions(value: Array<ConventionVo>) {
        this.conventionService.conventions = value;
       }
       get createConventionDialog(): boolean {
           return this.conventionService.createConventionDialog;
       }
      set createConventionDialog(value: boolean) {
        this.conventionService.createConventionDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
