import {Component, OnInit} from '@angular/core';
import {EtatPrestationService} from '../../../../../../controller/service/EtatPrestation.service';
import {EtatPrestationVo} from '../../../../../../controller/model/EtatPrestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-prestation-view-chercheur',
  templateUrl: './etat-prestation-view-chercheur.component.html',
  styleUrls: ['./etat-prestation-view-chercheur.component.css']
})
export class EtatPrestationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatPrestationService: EtatPrestationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatPrestationDialog  = false;
}

// getters and setters

get etatPrestations(): Array<EtatPrestationVo> {
    return this.etatPrestationService.etatPrestations;
       }
set etatPrestations(value: Array<EtatPrestationVo>) {
        this.etatPrestationService.etatPrestations = value;
       }

 get selectedEtatPrestation():EtatPrestationVo {
           return this.etatPrestationService.selectedEtatPrestation;
       }
    set selectedEtatPrestation(value: EtatPrestationVo) {
        this.etatPrestationService.selectedEtatPrestation = value;
       }

   get viewEtatPrestationDialog():boolean {
           return this.etatPrestationService.viewEtatPrestationDialog;

       }
    set viewEtatPrestationDialog(value: boolean) {
        this.etatPrestationService.viewEtatPrestationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
