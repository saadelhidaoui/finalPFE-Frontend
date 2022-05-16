import {Component, OnInit} from '@angular/core';
import {EtatTacheService} from '../../../../../../controller/service/EtatTache.service';
import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-tache-view-moderateur',
  templateUrl: './etat-tache-view-moderateur.component.html',
  styleUrls: ['./etat-tache-view-moderateur.component.css']
})
export class EtatTacheViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatTacheService: EtatTacheService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatTacheDialog  = false;
}

// getters and setters

get etatTaches(): Array<EtatTacheVo> {
    return this.etatTacheService.etatTaches;
       }
set etatTaches(value: Array<EtatTacheVo>) {
        this.etatTacheService.etatTaches = value;
       }

 get selectedEtatTache():EtatTacheVo {
           return this.etatTacheService.selectedEtatTache;
       }
    set selectedEtatTache(value: EtatTacheVo) {
        this.etatTacheService.selectedEtatTache = value;
       }

   get viewEtatTacheDialog():boolean {
           return this.etatTacheService.viewEtatTacheDialog;

       }
    set viewEtatTacheDialog(value: boolean) {
        this.etatTacheService.viewEtatTacheDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
