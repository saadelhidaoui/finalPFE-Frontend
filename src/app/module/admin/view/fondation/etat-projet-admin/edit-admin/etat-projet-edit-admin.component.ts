import {Component, OnInit} from '@angular/core';
import {EtatProjetService} from '../../../../../../controller/service/EtatProjet.service';
import {EtatProjetVo} from '../../../../../../controller/model/EtatProjet.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-projet-edit-admin',
  templateUrl: './etat-projet-edit-admin.component.html',
  styleUrls: ['./etat-projet-edit-admin.component.css']
})
export class EtatProjetEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatProjetService: EtatProjetService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedEtatProjet.dateArchivage = DateUtils.toDate(this.selectedEtatProjet.dateArchivage);
            this.selectedEtatProjet.dateCreation = DateUtils.toDate(this.selectedEtatProjet.dateCreation);
    this.etatProjetService.edit().subscribe(etatProjet=>{
    const myIndex = this.etatProjets.findIndex(e => e.id === this.selectedEtatProjet.id);
    this.etatProjets[myIndex] = this.selectedEtatProjet;
    this.editEtatProjetDialog = false;
    this.selectedEtatProjet = new EtatProjetVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatProjetDialog  = false;
}

// getters and setters

get etatProjets(): Array<EtatProjetVo> {
    return this.etatProjetService.etatProjets;
       }
set etatProjets(value: Array<EtatProjetVo>) {
        this.etatProjetService.etatProjets = value;
       }

 get selectedEtatProjet(): EtatProjetVo {
           return this.etatProjetService.selectedEtatProjet;
       }
    set selectedEtatProjet(value: EtatProjetVo) {
        this.etatProjetService.selectedEtatProjet = value;
       }

   get editEtatProjetDialog(): boolean {
           return this.etatProjetService.editEtatProjetDialog;

       }
    set editEtatProjetDialog(value: boolean) {
        this.etatProjetService.editEtatProjetDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
