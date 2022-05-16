import {Component, OnInit} from '@angular/core';
import {ModerateurService} from '../../../../../../controller/service/Moderateur.service';
import {ModerateurVo} from '../../../../../../controller/model/Moderateur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { SituationModerateurService } from '../../../../../../controller/service/SituationModerateur.service';
import { ProfilService } from '../../../../../../controller/service/Profil.service';

import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
import {MissionVo} from '../../../../../../controller/model/Mission.model';
import {TacheVo} from '../../../../../../controller/model/Tache.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-moderateur-list-chercheur',
  templateUrl: './moderateur-list-chercheur.component.html',
  styleUrls: ['./moderateur-list-chercheur.component.css']
})
export class ModerateurListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Moderateur';
     yesOrNoCredentialsNonExpired :any[] =[];
     yesOrNoEnabled :any[] =[];
     yesOrNoAccountNonExpired :any[] =[];
     yesOrNoAccountNonLocked :any[] =[];
     yesOrNoPasswordChanged :any[] =[];
    situationModerateurs :Array<SituationModerateurVo>;
    profils :Array<ProfilVo>;


    constructor(private datePipe: DatePipe, private moderateurService: ModerateurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private situationModerateurService: SituationModerateurService
        , private profilService: ProfilService
) { }

    ngOnInit(): void {
      this.loadModerateurs();
      this.initExport();
      this.initCol();
      this.loadSituationModerateur();
      this.loadProfil();
    this.yesOrNoCredentialsNonExpired =  [{label: 'CredentialsNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoEnabled =  [{label: 'Enabled', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonExpired =  [{label: 'AccountNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonLocked =  [{label: 'AccountNonLocked', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoPasswordChanged =  [{label: 'PasswordChanged', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadModerateurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Moderateur', 'list');
        isPermistted ? this.moderateurService.findAll().subscribe(moderateurs => this.moderateurs = moderateurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.moderateurService.findByCriteria(this.searchModerateur).subscribe(moderateurs=>{
            
            this.moderateurs = moderateurs;
           // this.searchModerateur = new ModerateurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'numeroMatricule', header: 'Numero matricule'},
                            {field: 'emailPrincipale', header: 'Email principale'},
                            {field: 'credentialsNonExpired', header: 'Credentials non expired'},
                            {field: 'enabled', header: 'Enabled'},
                            {field: 'accountNonExpired', header: 'Account non expired'},
                            {field: 'accountNonLocked', header: 'Account non locked'},
                            {field: 'passwordChanged', header: 'Password changed'},
                            {field: 'createdAt', header: 'Created at'},
                            {field: 'updatedAt', header: 'Updated at'},
                            {field: 'username', header: 'Username'},
                            {field: 'password', header: 'Password'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'role', header: 'Role'},
                        {field: 'situationModerateur?.libelle', header: 'Situation moderateur'},
                        {field: 'profil?.libelle', header: 'Profil'},
        ];
    }
    
    public async editModerateur(moderateur:ModerateurVo){
        const isPermistted = await this.roleService.isPermitted('Moderateur', 'edit');
         if(isPermistted){
          this.moderateurService.findByIdWithAssociatedList(moderateur).subscribe(res => {
           this.selectedModerateur = res;
            this.selectedModerateur.createdAt = new Date(moderateur.createdAt);
            this.selectedModerateur.updatedAt = new Date(moderateur.updatedAt);
            this.editModerateurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewModerateur(moderateur:ModerateurVo){
        const isPermistted = await this.roleService.isPermitted('Moderateur', 'view');
        if(isPermistted){
           this.moderateurService.findByIdWithAssociatedList(moderateur).subscribe(res => {
           this.selectedModerateur = res;
            this.selectedModerateur.createdAt = new Date(moderateur.createdAt);
            this.selectedModerateur.updatedAt = new Date(moderateur.updatedAt);
            this.viewModerateurDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateModerateur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedModerateur = new ModerateurVo();
            this.createModerateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteModerateur(moderateur:ModerateurVo){
       const isPermistted = await this.roleService.isPermitted('Moderateur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Moderateur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.moderateurService.delete(moderateur).subscribe(status=>{
                          if(status > 0){
                          const position = this.moderateurs.indexOf(moderateur);
                          position > -1 ? this.moderateurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Moderateur Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadSituationModerateur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Moderateur', 'list');
    isPermistted ? this.situationModerateurService.findAll().subscribe(situationModerateurs => this.situationModerateurs = situationModerateurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadProfil(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Moderateur', 'list');
    isPermistted ? this.profilService.findAll().subscribe(profils => this.profils = profils,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateModerateur(moderateur: ModerateurVo) {

     this.moderateurService.findByIdWithAssociatedList(moderateur).subscribe(
	 res => {
	       this.initDuplicateModerateur(res);
	       this.selectedModerateur = res;
	       this.selectedModerateur.id = null;
            this.createModerateurDialog = true;

});

	}

	initDuplicateModerateur(res: ModerateurVo) {
        if (res.missionsVo != null) {
             res.missionsVo.forEach(d => { d.moderateurVo = null; d.id = null; });
                }
        if (res.tachesVo != null) {
             res.tachesVo.forEach(d => { d.moderateurVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.moderateurs.map(e => {
    return {
                    'Numero matricule': e.numeroMatricule ,
                    'Email principale': e.emailPrincipale ,
                    'Credentials non expired': e.credentialsNonExpired? 'Vrai' : 'Faux' ,
                    'Enabled': e.enabled? 'Vrai' : 'Faux' ,
                    'Account non expired': e.accountNonExpired? 'Vrai' : 'Faux' ,
                    'Account non locked': e.accountNonLocked? 'Vrai' : 'Faux' ,
                    'Password changed': e.passwordChanged? 'Vrai' : 'Faux' ,
                    'Created at': this.datePipe.transform(e.createdAt , 'dd-MM-yyyy'),
                    'Updated at': this.datePipe.transform(e.updatedAt , 'dd-MM-yyyy'),
                    'Username': e.username ,
                    'Password': e.password ,
                    'Prenom': e.prenom ,
                    'Nom': e.nom ,
                    'Role': e.role ,
            'Situation moderateur': e.situationModerateurVo?.libelle ,
            'Profil': e.profilVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Numero matricule': this.searchModerateur.numeroMatricule ? this.searchModerateur.numeroMatricule : environment.emptyForExport ,
            'Email principale': this.searchModerateur.emailPrincipale ? this.searchModerateur.emailPrincipale : environment.emptyForExport ,
            'Credentials non expired': this.searchModerateur.credentialsNonExpired ? (this.searchModerateur.credentialsNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Enabled': this.searchModerateur.enabled ? (this.searchModerateur.enabled ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non expired': this.searchModerateur.accountNonExpired ? (this.searchModerateur.accountNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non locked': this.searchModerateur.accountNonLocked ? (this.searchModerateur.accountNonLocked ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Password changed': this.searchModerateur.passwordChanged ? (this.searchModerateur.passwordChanged ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Created at Min': this.searchModerateur.createdAtMin ? this.datePipe.transform(this.searchModerateur.createdAtMin , this.dateFormat) : environment.emptyForExport ,
            'Created at Max': this.searchModerateur.createdAtMax ? this.datePipe.transform(this.searchModerateur.createdAtMax , this.dateFormat) : environment.emptyForExport ,
            'Updated at Min': this.searchModerateur.updatedAtMin ? this.datePipe.transform(this.searchModerateur.updatedAtMin , this.dateFormat) : environment.emptyForExport ,
            'Updated at Max': this.searchModerateur.updatedAtMax ? this.datePipe.transform(this.searchModerateur.updatedAtMax , this.dateFormat) : environment.emptyForExport ,
            'Username': this.searchModerateur.username ? this.searchModerateur.username : environment.emptyForExport ,
            'Password': this.searchModerateur.password ? this.searchModerateur.password : environment.emptyForExport ,
            'Prenom': this.searchModerateur.prenom ? this.searchModerateur.prenom : environment.emptyForExport ,
            'Nom': this.searchModerateur.nom ? this.searchModerateur.nom : environment.emptyForExport ,
            'Role': this.searchModerateur.role ? this.searchModerateur.role : environment.emptyForExport ,
        'Situation moderateur': this.searchModerateur.situationModerateurVo?.libelle ? this.searchModerateur.situationModerateurVo?.libelle : environment.emptyForExport ,
        'Profil': this.searchModerateur.profilVo?.libelle ? this.searchModerateur.profilVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get moderateurs(): Array<ModerateurVo> {
           return this.moderateurService.moderateurs;
       }
    set moderateurs(value: Array<ModerateurVo>) {
        this.moderateurService.moderateurs = value;
       }

    get moderateurSelections(): Array<ModerateurVo> {
           return this.moderateurService.moderateurSelections;
       }
    set moderateurSelections(value: Array<ModerateurVo>) {
        this.moderateurService.moderateurSelections = value;
       }
   
     


    get selectedModerateur():ModerateurVo {
           return this.moderateurService.selectedModerateur;
       }
    set selectedModerateur(value: ModerateurVo) {
        this.moderateurService.selectedModerateur = value;
       }
    
    get createModerateurDialog():boolean {
           return this.moderateurService.createModerateurDialog;
       }
    set createModerateurDialog(value: boolean) {
        this.moderateurService.createModerateurDialog= value;
       }
    
    get editModerateurDialog():boolean {
           return this.moderateurService.editModerateurDialog;
       }
    set editModerateurDialog(value: boolean) {
        this.moderateurService.editModerateurDialog= value;
       }
    get viewModerateurDialog():boolean {
           return this.moderateurService.viewModerateurDialog;
       }
    set viewModerateurDialog(value: boolean) {
        this.moderateurService.viewModerateurDialog = value;
       }
       
     get searchModerateur(): ModerateurVo {
        return this.moderateurService.searchModerateur;
       }
    set searchModerateur(value: ModerateurVo) {
        this.moderateurService.searchModerateur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
