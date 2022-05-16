import {Component, OnInit} from '@angular/core';
import {ConventionService} from '../../../../../../controller/service/Convention.service';
import {ConventionVo} from '../../../../../../controller/model/Convention.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {OrganismeVo} from '../../../../../../controller/model/Organisme.model';
import {OrganismeService} from '../../../../../../controller/service/Organisme.service';
import {PieceJointeConventionVo} from '../../../../../../controller/model/PieceJointeConvention.model';
import {PieceJointeConventionService} from '../../../../../../controller/service/PieceJointeConvention.service';

@Component({
  selector: 'app-convention-edit-moderateur',
  templateUrl: './convention-edit-moderateur.component.html',
  styleUrls: ['./convention-edit-moderateur.component.css']
})
export class ConventionEditModerateurComponent implements OnInit {

        selectedPieceJointeConventions: PieceJointeConventionVo = new PieceJointeConventionVo();
        pieceJointeConventionsListe: Array<PieceJointeConventionVo> = [];



constructor(private datePipe: DatePipe, private conventionService: ConventionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private organismeService: OrganismeService
 ,       private pieceJointeConventionService: PieceJointeConventionService
) {
}

// methods
ngOnInit(): void {
    this.selectedOrganisme = new OrganismeVo();
    this.organismeService.findAll().subscribe((data) => this.organismes = data);
}
        addPieceJointeConventions() {
        if( this.selectedConvention.pieceJointeConventionsVo == null ){
            this.selectedConvention.pieceJointeConventionsVo = new Array<PieceJointeConventionVo>();
        }
        this.selectedConvention.pieceJointeConventionsVo.push(this.selectedPieceJointeConventions);
        this.selectedPieceJointeConventions = new PieceJointeConventionVo();
        }

       deletePieceJointeConventions(p: PieceJointeConventionVo) {
        this.selectedConvention.pieceJointeConventionsVo.forEach((element, index) => {
            if (element === p) { this.selectedConvention.pieceJointeConventionsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedConvention.dateDebut = DateUtils.toDate(this.selectedConvention.dateDebut);
            this.selectedConvention.dateArchivage = DateUtils.toDate(this.selectedConvention.dateArchivage);
            this.selectedConvention.dateCreation = DateUtils.toDate(this.selectedConvention.dateCreation);
    this.conventionService.edit().subscribe(convention=>{
    const myIndex = this.conventions.findIndex(e => e.id === this.selectedConvention.id);
    this.conventions[myIndex] = this.selectedConvention;
    this.editConventionDialog = false;
    this.selectedConvention = new ConventionVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateorganisme(organisme: string) {
                      const isPermistted = await this.roleService.isPermitted('Organisme', 'add');
                       if(isPermistted){
         this.selectedOrganisme = new OrganismeVo();
        this.createOrganismeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editConventionDialog  = false;
}

// getters and setters

get conventions(): Array<ConventionVo> {
    return this.conventionService.conventions;
       }
set conventions(value: Array<ConventionVo>) {
        this.conventionService.conventions = value;
       }

 get selectedConvention(): ConventionVo {
           return this.conventionService.selectedConvention;
       }
    set selectedConvention(value: ConventionVo) {
        this.conventionService.selectedConvention = value;
       }

   get editConventionDialog(): boolean {
           return this.conventionService.editConventionDialog;

       }
    set editConventionDialog(value: boolean) {
        this.conventionService.editConventionDialog = value;
       }

       get selectedOrganisme(): OrganismeVo {
           return this.organismeService.selectedOrganisme;
       }
      set selectedOrganisme(value: OrganismeVo) {
        this.organismeService.selectedOrganisme = value;
       }
       get organismes(): Array<OrganismeVo> {
           return this.organismeService.organismes;
       }
       set organismes(value: Array<OrganismeVo>) {
        this.organismeService.organismes = value;
       }
       get createOrganismeDialog(): boolean {
           return this.organismeService.createOrganismeDialog;
       }
      set createOrganismeDialog(value: boolean) {
        this.organismeService.createOrganismeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
