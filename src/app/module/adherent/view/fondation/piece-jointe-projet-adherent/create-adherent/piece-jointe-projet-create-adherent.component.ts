import {Component, OnInit, Input} from '@angular/core';
import {PieceJointeProjetService} from '../../../../../../controller/service/PieceJointeProjet.service';
import {PieceJointeProjetVo} from '../../../../../../controller/model/PieceJointeProjet.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {ProjetVo} from '../../../../../../controller/model/Projet.model';
import {ProjetService} from '../../../../../../controller/service/Projet.service';
@Component({
  selector: 'app-piece-jointe-projet-create-adherent',
  templateUrl: './piece-jointe-projet-create-adherent.component.html',
  styleUrls: ['./piece-jointe-projet-create-adherent.component.css']
})
export class PieceJointeProjetCreateAdherentComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validProjetDateDebut = true;
    _validProjetEtatProjet = true;



constructor(private datePipe: DatePipe, private pieceJointeProjetService: PieceJointeProjetService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private projetService :ProjetService
) {

}


// methods
ngOnInit(): void {

    this.selectedProjet = new ProjetVo();
    this.projetService.findAll().subscribe((data) => this.projets = data);
}




private setValidation(value : boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.pieceJointeProjetService.save().subscribe(pieceJointeProjet=>{
       this.pieceJointeProjets.push({...pieceJointeProjet});
       this.createPieceJointeProjetDialog = false;
       this.submitted = false;
       this.selectedPieceJointeProjet = new PieceJointeProjetVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }















//openPopup
              public async openCreateprojet(projet: string) {
                      const isPermistted = await this.roleService.isPermitted('Projet', 'add');
                       if(isPermistted){
         this.selectedProjet = new ProjetVo();
        this.createProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPieceJointeProjetDialog  = false;
    this.setValidation(true);
}

// getters and setters

get pieceJointeProjets(): Array<PieceJointeProjetVo> {
    return this.pieceJointeProjetService.pieceJointeProjets;
       }
set pieceJointeProjets(value: Array<PieceJointeProjetVo>) {
        this.pieceJointeProjetService.pieceJointeProjets = value;
       }

 get selectedPieceJointeProjet():PieceJointeProjetVo {
           return this.pieceJointeProjetService.selectedPieceJointeProjet;
       }
    set selectedPieceJointeProjet(value: PieceJointeProjetVo) {
        this.pieceJointeProjetService.selectedPieceJointeProjet = value;
       }

   get createPieceJointeProjetDialog(): boolean {
           return this.pieceJointeProjetService.createPieceJointeProjetDialog;

       }
    set createPieceJointeProjetDialog(value: boolean) {
        this.pieceJointeProjetService.createPieceJointeProjetDialog= value;
       }

       get selectedProjet(): ProjetVo {
           return this.projetService.selectedProjet;
       }
      set selectedProjet(value: ProjetVo) {
        this.projetService.selectedProjet = value;
       }
       get projets(): Array<ProjetVo> {
           return this.projetService.projets;
       }
       set projets(value: Array<ProjetVo>) {
        this.projetService.projets = value;
       }
       get createProjetDialog(): boolean {
           return this.projetService.createProjetDialog;
       }
      set createProjetDialog(value: boolean) {
        this.projetService.createProjetDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validProjetDateDebut(): boolean {
    return this._validProjetDateDebut;
    }

    set validProjetDateDebut(value: boolean) {
    this._validProjetDateDebut = value;
    }
    get validProjetEtatProjet(): boolean {
    return this._validProjetEtatProjet;
    }

    set validProjetEtatProjet(value: boolean) {
    this._validProjetEtatProjet = value;
    }

}
