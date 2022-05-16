import {Component, OnInit} from '@angular/core';
import {EtatCarteService} from '../../../../../../controller/service/EtatCarte.service';
import {EtatCarteVo} from '../../../../../../controller/model/EtatCarte.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-carte-view-moderateur',
  templateUrl: './etat-carte-view-moderateur.component.html',
  styleUrls: ['./etat-carte-view-moderateur.component.css']
})
export class EtatCarteViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatCarteService: EtatCarteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatCarteDialog  = false;
}

// getters and setters

get etatCartes(): Array<EtatCarteVo> {
    return this.etatCarteService.etatCartes;
       }
set etatCartes(value: Array<EtatCarteVo>) {
        this.etatCarteService.etatCartes = value;
       }

 get selectedEtatCarte():EtatCarteVo {
           return this.etatCarteService.selectedEtatCarte;
       }
    set selectedEtatCarte(value: EtatCarteVo) {
        this.etatCarteService.selectedEtatCarte = value;
       }

   get viewEtatCarteDialog():boolean {
           return this.etatCarteService.viewEtatCarteDialog;

       }
    set viewEtatCarteDialog(value: boolean) {
        this.etatCarteService.viewEtatCarteDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
