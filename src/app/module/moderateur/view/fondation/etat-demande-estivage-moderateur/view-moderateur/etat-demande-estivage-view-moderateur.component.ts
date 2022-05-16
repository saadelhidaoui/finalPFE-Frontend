import {Component, OnInit} from '@angular/core';
import {EtatDemandeEstivageService} from '../../../../../../controller/service/EtatDemandeEstivage.service';
import {EtatDemandeEstivageVo} from '../../../../../../controller/model/EtatDemandeEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-demande-estivage-view-moderateur',
  templateUrl: './etat-demande-estivage-view-moderateur.component.html',
  styleUrls: ['./etat-demande-estivage-view-moderateur.component.css']
})
export class EtatDemandeEstivageViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDemandeEstivageService: EtatDemandeEstivageService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatDemandeEstivageDialog  = false;
}

// getters and setters

get etatDemandeEstivages(): Array<EtatDemandeEstivageVo> {
    return this.etatDemandeEstivageService.etatDemandeEstivages;
       }
set etatDemandeEstivages(value: Array<EtatDemandeEstivageVo>) {
        this.etatDemandeEstivageService.etatDemandeEstivages = value;
       }

 get selectedEtatDemandeEstivage():EtatDemandeEstivageVo {
           return this.etatDemandeEstivageService.selectedEtatDemandeEstivage;
       }
    set selectedEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this.etatDemandeEstivageService.selectedEtatDemandeEstivage = value;
       }

   get viewEtatDemandeEstivageDialog():boolean {
           return this.etatDemandeEstivageService.viewEtatDemandeEstivageDialog;

       }
    set viewEtatDemandeEstivageDialog(value: boolean) {
        this.etatDemandeEstivageService.viewEtatDemandeEstivageDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
