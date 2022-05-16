import {Component, OnInit} from '@angular/core';
import {PieceJointeAdherentService} from '../../../../../../controller/service/PieceJointeAdherent.service';
import {PieceJointeAdherentVo} from '../../../../../../controller/model/PieceJointeAdherent.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {AdherentVo} from '../../../../../../controller/model/Adherent.model';
import {AdherentService} from '../../../../../../controller/service/Adherent.service';

@Component({
  selector: 'app-piece-jointe-adherent-edit-chercheur',
  templateUrl: './piece-jointe-adherent-edit-chercheur.component.html',
  styleUrls: ['./piece-jointe-adherent-edit-chercheur.component.css']
})
export class PieceJointeAdherentEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private pieceJointeAdherentService: PieceJointeAdherentService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private adherentService: AdherentService
) {
}

// methods
ngOnInit(): void {
    this.selectedAdherent = new AdherentVo();
    this.adherentService.findAll().subscribe((data) => this.adherents = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedPieceJointeAdherent.dateAjout = DateUtils.toDate(this.selectedPieceJointeAdherent.dateAjout);
            this.selectedPieceJointeAdherent.dateArchivage = DateUtils.toDate(this.selectedPieceJointeAdherent.dateArchivage);
            this.selectedPieceJointeAdherent.dateCreation = DateUtils.toDate(this.selectedPieceJointeAdherent.dateCreation);
    this.pieceJointeAdherentService.edit().subscribe(pieceJointeAdherent=>{
    const myIndex = this.pieceJointeAdherents.findIndex(e => e.id === this.selectedPieceJointeAdherent.id);
    this.pieceJointeAdherents[myIndex] = this.selectedPieceJointeAdherent;
    this.editPieceJointeAdherentDialog = false;
    this.selectedPieceJointeAdherent = new PieceJointeAdherentVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateadherent(adherent: string) {
                      const isPermistted = await this.roleService.isPermitted('Adherent', 'add');
                       if(isPermistted){
         this.selectedAdherent = new AdherentVo();
        this.createAdherentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPieceJointeAdherentDialog  = false;
}

// getters and setters

get pieceJointeAdherents(): Array<PieceJointeAdherentVo> {
    return this.pieceJointeAdherentService.pieceJointeAdherents;
       }
set pieceJointeAdherents(value: Array<PieceJointeAdherentVo>) {
        this.pieceJointeAdherentService.pieceJointeAdherents = value;
       }

 get selectedPieceJointeAdherent(): PieceJointeAdherentVo {
           return this.pieceJointeAdherentService.selectedPieceJointeAdherent;
       }
    set selectedPieceJointeAdherent(value: PieceJointeAdherentVo) {
        this.pieceJointeAdherentService.selectedPieceJointeAdherent = value;
       }

   get editPieceJointeAdherentDialog(): boolean {
           return this.pieceJointeAdherentService.editPieceJointeAdherentDialog;

       }
    set editPieceJointeAdherentDialog(value: boolean) {
        this.pieceJointeAdherentService.editPieceJointeAdherentDialog = value;
       }

       get selectedAdherent(): AdherentVo {
           return this.adherentService.selectedAdherent;
       }
      set selectedAdherent(value: AdherentVo) {
        this.adherentService.selectedAdherent = value;
       }
       get adherents(): Array<AdherentVo> {
           return this.adherentService.adherents;
       }
       set adherents(value: Array<AdherentVo>) {
        this.adherentService.adherents = value;
       }
       get createAdherentDialog(): boolean {
           return this.adherentService.createAdherentDialog;
       }
      set createAdherentDialog(value: boolean) {
        this.adherentService.createAdherentDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
