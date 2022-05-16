import {Component, OnInit} from '@angular/core';
import {ProfilService} from '../../../../../../controller/service/Profil.service';
import {ProfilVo} from '../../../../../../controller/model/Profil.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { GradeService } from '../../../../../../controller/service/Grade.service';
import { EchelleService } from '../../../../../../controller/service/Echelle.service';

import {GradeVo} from '../../../../../../controller/model/Grade.model';
import {EchelleVo} from '../../../../../../controller/model/Echelle.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-profil-list-adherent',
  templateUrl: './profil-list-adherent.component.html',
  styleUrls: ['./profil-list-adherent.component.css']
})
export class ProfilListAdherentComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Profil';
    grades :Array<GradeVo>;
    echelles :Array<EchelleVo>;


    constructor(private datePipe: DatePipe, private profilService: ProfilService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private gradeService: GradeService
        , private echelleService: EchelleService
) { }

    ngOnInit(): void {
      this.loadProfils();
      this.initExport();
      this.initCol();
      this.loadGrade();
      this.loadEchelle();
    }
    
    // methods
      public async loadProfils(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Profil', 'list');
        isPermistted ? this.profilService.findAll().subscribe(profils => this.profils = profils,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.profilService.findByCriteria(this.searchProfil).subscribe(profils=>{
            
            this.profils = profils;
           // this.searchProfil = new ProfilVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'grade?.libelle', header: 'Grade'},
                        {field: 'echelle?.libelle', header: 'Echelle'},
        ];
    }
    
    public async editProfil(profil:ProfilVo){
        const isPermistted = await this.roleService.isPermitted('Profil', 'edit');
         if(isPermistted){
          this.profilService.findByIdWithAssociatedList(profil).subscribe(res => {
           this.selectedProfil = res;
            this.editProfilDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProfil(profil:ProfilVo){
        const isPermistted = await this.roleService.isPermitted('Profil', 'view');
        if(isPermistted){
           this.profilService.findByIdWithAssociatedList(profil).subscribe(res => {
           this.selectedProfil = res;
            this.viewProfilDialog = true;
          });

        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProfil(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProfil = new ProfilVo();
            this.createProfilDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteProfil(profil:ProfilVo){
       const isPermistted = await this.roleService.isPermitted('Profil', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Profil) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.profilService.delete(profil).subscribe(status=>{
                          if(status > 0){
                          const position = this.profils.indexOf(profil);
                          position > -1 ? this.profils.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Profil Supprimé',
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

public async loadGrade(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Profil', 'list');
    isPermistted ? this.gradeService.findAll().subscribe(grades => this.grades = grades,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEchelle(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Profil', 'list');
    isPermistted ? this.echelleService.findAll().subscribe(echelles => this.echelles = echelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProfil(profil: ProfilVo) {

     this.profilService.findByIdWithAssociatedList(profil).subscribe(
	 res => {
	       this.initDuplicateProfil(res);
	       this.selectedProfil = res;
	       this.selectedProfil.id = null;
            this.createProfilDialog = true;

});

	}

	initDuplicateProfil(res: ProfilVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.profils.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
            'Grade': e.gradeVo?.libelle ,
            'Echelle': e.echelleVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchProfil.reference ? this.searchProfil.reference : environment.emptyForExport ,
            'Libelle': this.searchProfil.libelle ? this.searchProfil.libelle : environment.emptyForExport ,
        'Grade': this.searchProfil.gradeVo?.libelle ? this.searchProfil.gradeVo?.libelle : environment.emptyForExport ,
        'Echelle': this.searchProfil.echelleVo?.libelle ? this.searchProfil.echelleVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get profils(): Array<ProfilVo> {
           return this.profilService.profils;
       }
    set profils(value: Array<ProfilVo>) {
        this.profilService.profils = value;
       }

    get profilSelections(): Array<ProfilVo> {
           return this.profilService.profilSelections;
       }
    set profilSelections(value: Array<ProfilVo>) {
        this.profilService.profilSelections = value;
       }
   
     


    get selectedProfil():ProfilVo {
           return this.profilService.selectedProfil;
       }
    set selectedProfil(value: ProfilVo) {
        this.profilService.selectedProfil = value;
       }
    
    get createProfilDialog():boolean {
           return this.profilService.createProfilDialog;
       }
    set createProfilDialog(value: boolean) {
        this.profilService.createProfilDialog= value;
       }
    
    get editProfilDialog():boolean {
           return this.profilService.editProfilDialog;
       }
    set editProfilDialog(value: boolean) {
        this.profilService.editProfilDialog= value;
       }
    get viewProfilDialog():boolean {
           return this.profilService.viewProfilDialog;
       }
    set viewProfilDialog(value: boolean) {
        this.profilService.viewProfilDialog = value;
       }
       
     get searchProfil(): ProfilVo {
        return this.profilService.searchProfil;
       }
    set searchProfil(value: ProfilVo) {
        this.profilService.searchProfil = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
