import {Component, OnInit} from '@angular/core';
import {EtatProjetService} from '../../../../../../controller/service/EtatProjet.service';
import {EtatProjetVo} from '../../../../../../controller/model/EtatProjet.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-projet-view-adherent',
  templateUrl: './etat-projet-view-adherent.component.html',
  styleUrls: ['./etat-projet-view-adherent.component.css']
})
export class EtatProjetViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatProjetService: EtatProjetService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatProjetDialog  = false;
}

// getters and setters

get etatProjets(): Array<EtatProjetVo> {
    return this.etatProjetService.etatProjets;
       }
set etatProjets(value: Array<EtatProjetVo>) {
        this.etatProjetService.etatProjets = value;
       }

 get selectedEtatProjet():EtatProjetVo {
           return this.etatProjetService.selectedEtatProjet;
       }
    set selectedEtatProjet(value: EtatProjetVo) {
        this.etatProjetService.selectedEtatProjet = value;
       }

   get viewEtatProjetDialog():boolean {
           return this.etatProjetService.viewEtatProjetDialog;

       }
    set viewEtatProjetDialog(value: boolean) {
        this.etatProjetService.viewEtatProjetDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
