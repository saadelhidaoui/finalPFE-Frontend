import {Component, OnInit, Input} from '@angular/core';
import {TacheService} from '../../../../../../controller/service/Tache.service';
import {TacheVo} from '../../../../../../controller/model/Tache.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../../controller/service/StringUtil.service';


import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
import {EtatTacheService} from '../../../../../../controller/service/EtatTache.service';
@Component({
  selector: 'app-tache-create-chercheur',
  templateUrl: './tache-create-chercheur.component.html',
  styleUrls: ['./tache-create-chercheur.component.css']
})
export class TacheCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTacheDateTache = true;
   _validTacheDescription = true;
   _validTacheEtatTache = true;
   _validTacheModerateur = true;

    _validModerateurSituationModerateur = true;
    _validModerateurProfil = true;



constructor(private datePipe: DatePipe, private tacheService: TacheService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private moderateurService :ModerateurService
,       private etatTacheService :EtatTacheService
) {

}


// methods
ngOnInit(): void {

    this.selectedEtatTache = new EtatTacheVo();
    this.etatTacheService.findAll().subscribe((data) => this.etatTaches = data);
    this.selectedModerateur = new ModerateurVo();
    this.moderateurService.findAll().subscribe((data) => this.moderateurs = data);
}




private setValidation(value : boolean){
    this.validTacheDateTache = value;
    this.validTacheDescription = value;
    this.validTacheEtatTache = value;
    this.validTacheModerateur = value;
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
     this.tacheService.save().subscribe(tache=>{
       this.taches.push({...tache});
       this.createTacheDialog = false;
       this.submitted = false;
       this.selectedTache = new TacheVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTacheDateTache();
this.validateTacheDescription();
this.validateTacheEtatTache();
this.validateTacheModerateur();

    }

private validateTacheDateTache(){
        if (this.stringUtilService.isEmpty(this.selectedTache.dateTache)) {
            this.errorMessages.push('Date tache non valide');
            this.validTacheDateTache = false;
        } else {
            this.validTacheDateTache = true;
        }
    }
private validateTacheDescription(){
        if (this.stringUtilService.isEmpty(this.selectedTache.description)) {
            this.errorMessages.push('Description non valide');
            this.validTacheDescription = false;
        } else {
            this.validTacheDescription = true;
        }
    }
private validateTacheEtatTache(){
        if (this.stringUtilService.isEmpty(this.selectedTache.etatTacheVo)) {
            this.errorMessages.push('Etat tache non valide');
            this.validTacheEtatTache = false;
        } else {
            this.validTacheEtatTache = true;
        }
    }
private validateTacheModerateur(){
        if (this.stringUtilService.isEmpty(this.selectedTache.moderateurVo)) {
            this.errorMessages.push('Moderateur non valide');
            this.validTacheModerateur = false;
        } else {
            this.validTacheModerateur = true;
        }
    }









//openPopup
              public async openCreateetatTache(etatTache: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatTache', 'add');
                       if(isPermistted){
         this.selectedEtatTache = new EtatTacheVo();
        this.createEtatTacheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatemoderateur(moderateur: string) {
                      const isPermistted = await this.roleService.isPermitted('Moderateur', 'add');
                       if(isPermistted){
         this.selectedModerateur = new ModerateurVo();
        this.createModerateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createTacheDialog  = false;
    this.setValidation(true);
}

// getters and setters

get taches(): Array<TacheVo> {
    return this.tacheService.taches;
       }
set taches(value: Array<TacheVo>) {
        this.tacheService.taches = value;
       }

 get selectedTache():TacheVo {
           return this.tacheService.selectedTache;
       }
    set selectedTache(value: TacheVo) {
        this.tacheService.selectedTache = value;
       }

   get createTacheDialog(): boolean {
           return this.tacheService.createTacheDialog;

       }
    set createTacheDialog(value: boolean) {
        this.tacheService.createTacheDialog= value;
       }

       get selectedEtatTache(): EtatTacheVo {
           return this.etatTacheService.selectedEtatTache;
       }
      set selectedEtatTache(value: EtatTacheVo) {
        this.etatTacheService.selectedEtatTache = value;
       }
       get etatTaches(): Array<EtatTacheVo> {
           return this.etatTacheService.etatTaches;
       }
       set etatTaches(value: Array<EtatTacheVo>) {
        this.etatTacheService.etatTaches = value;
       }
       get createEtatTacheDialog(): boolean {
           return this.etatTacheService.createEtatTacheDialog;
       }
      set createEtatTacheDialog(value: boolean) {
        this.etatTacheService.createEtatTacheDialog= value;
       }
       get selectedModerateur(): ModerateurVo {
           return this.moderateurService.selectedModerateur;
       }
      set selectedModerateur(value: ModerateurVo) {
        this.moderateurService.selectedModerateur = value;
       }
       get moderateurs(): Array<ModerateurVo> {
           return this.moderateurService.moderateurs;
       }
       set moderateurs(value: Array<ModerateurVo>) {
        this.moderateurService.moderateurs = value;
       }
       get createModerateurDialog(): boolean {
           return this.moderateurService.createModerateurDialog;
       }
      set createModerateurDialog(value: boolean) {
        this.moderateurService.createModerateurDialog= value;
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

    get validTacheDateTache(): boolean {
    return this._validTacheDateTache;
    }

    set validTacheDateTache(value: boolean) {
    this._validTacheDateTache = value;
    }
    get validTacheDescription(): boolean {
    return this._validTacheDescription;
    }

    set validTacheDescription(value: boolean) {
    this._validTacheDescription = value;
    }
    get validTacheEtatTache(): boolean {
    return this._validTacheEtatTache;
    }

    set validTacheEtatTache(value: boolean) {
    this._validTacheEtatTache = value;
    }
    get validTacheModerateur(): boolean {
    return this._validTacheModerateur;
    }

    set validTacheModerateur(value: boolean) {
    this._validTacheModerateur = value;
    }

    get validModerateurSituationModerateur(): boolean {
    return this._validModerateurSituationModerateur;
    }

    set validModerateurSituationModerateur(value: boolean) {
    this._validModerateurSituationModerateur = value;
    }
    get validModerateurProfil(): boolean {
    return this._validModerateurProfil;
    }

    set validModerateurProfil(value: boolean) {
    this._validModerateurProfil = value;
    }

}
