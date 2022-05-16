import {Component, OnInit, Input} from '@angular/core';
import {ProjetService} from '../../../../../../controller/service/Projet.service';
import {ProjetVo} from '../../../../../../controller/model/Projet.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {PieceJointeProjetVo} from '../../../../../../controller/model/PieceJointeProjet.model';
import {PieceJointeProjetService} from '../../../../../../controller/service/PieceJointeProjet.service';
import {EtatProjetVo} from '../../../../../../controller/model/EtatProjet.model';
import {EtatProjetService} from '../../../../../../controller/service/EtatProjet.service';
@Component({
  selector: 'app-projet-create-chercheur',
  templateUrl: './projet-create-chercheur.component.html',
  styleUrls: ['./projet-create-chercheur.component.css']
})
export class ProjetCreateChercheurComponent implements OnInit {

        selectedPieceJointeProjets: PieceJointeProjetVo = new PieceJointeProjetVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validProjetDateDebut = true;
   _validProjetEtatProjet = true;

    _validEtatProjetLibelle = true;
    _validEtatProjetCode = true;



constructor(private datePipe: DatePipe, private projetService: ProjetService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private pieceJointeProjetService :PieceJointeProjetService
,       private etatProjetService :EtatProjetService
) {

}


// methods
ngOnInit(): void {




    this.selectedEtatProjet = new EtatProjetVo();
    this.etatProjetService.findAll().subscribe((data) => this.etatProjets = data);
}


    validatePieceJointeProjets(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validProjetDateDebut = value;
    this.validProjetEtatProjet = value;
    }

        addPieceJointeProjets() {
        if( this.selectedProjet.pieceJointeProjetsVo == null ){
            this.selectedProjet.pieceJointeProjetsVo = new Array<PieceJointeProjetVo>();
        }
       this.validatePieceJointeProjets();
       if (this.errorMessages.length === 0) {
              this.selectedProjet.pieceJointeProjetsVo.push(this.selectedPieceJointeProjets);
              this.selectedPieceJointeProjets = new PieceJointeProjetVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deletePieceJointeProjets(p: PieceJointeProjetVo) {
        this.selectedProjet.pieceJointeProjetsVo.forEach((element, index) => {
            if (element === p) { this.selectedProjet.pieceJointeProjetsVo.splice(index, 1); }
        });
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
     this.projetService.save().subscribe(projet=>{
       this.projets.push({...projet});
       this.createProjetDialog = false;
       this.submitted = false;
       this.selectedProjet = new ProjetVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateProjetDateDebut();
this.validateProjetEtatProjet();

    }

private validateProjetDateDebut(){
        if (this.stringUtilService.isEmpty(this.selectedProjet.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validProjetDateDebut = false;
        } else {
            this.validProjetDateDebut = true;
        }
    }
private validateProjetEtatProjet(){
        if (this.stringUtilService.isEmpty(this.selectedProjet.etatProjetVo)) {
            this.errorMessages.push('Etat projet non valide');
            this.validProjetEtatProjet = false;
        } else {
            this.validProjetEtatProjet = true;
        }
    }




























//openPopup
              public async openCreateetatProjet(etatProjet: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatProjet', 'add');
                       if(isPermistted){
         this.selectedEtatProjet = new EtatProjetVo();
        this.createEtatProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createProjetDialog  = false;
    this.setValidation(true);
}

// getters and setters

get projets(): Array<ProjetVo> {
    return this.projetService.projets;
       }
set projets(value: Array<ProjetVo>) {
        this.projetService.projets = value;
       }

 get selectedProjet():ProjetVo {
           return this.projetService.selectedProjet;
       }
    set selectedProjet(value: ProjetVo) {
        this.projetService.selectedProjet = value;
       }

   get createProjetDialog(): boolean {
           return this.projetService.createProjetDialog;

       }
    set createProjetDialog(value: boolean) {
        this.projetService.createProjetDialog= value;
       }

       get selectedEtatProjet(): EtatProjetVo {
           return this.etatProjetService.selectedEtatProjet;
       }
      set selectedEtatProjet(value: EtatProjetVo) {
        this.etatProjetService.selectedEtatProjet = value;
       }
       get etatProjets(): Array<EtatProjetVo> {
           return this.etatProjetService.etatProjets;
       }
       set etatProjets(value: Array<EtatProjetVo>) {
        this.etatProjetService.etatProjets = value;
       }
       get createEtatProjetDialog(): boolean {
           return this.etatProjetService.createEtatProjetDialog;
       }
      set createEtatProjetDialog(value: boolean) {
        this.etatProjetService.createEtatProjetDialog= value;
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

    get validEtatProjetLibelle(): boolean {
    return this._validEtatProjetLibelle;
    }

    set validEtatProjetLibelle(value: boolean) {
    this._validEtatProjetLibelle = value;
    }
    get validEtatProjetCode(): boolean {
    return this._validEtatProjetCode;
    }

    set validEtatProjetCode(value: boolean) {
    this._validEtatProjetCode = value;
    }

}
