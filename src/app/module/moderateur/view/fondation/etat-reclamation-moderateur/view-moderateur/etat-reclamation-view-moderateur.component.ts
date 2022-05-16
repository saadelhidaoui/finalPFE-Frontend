import {Component, OnInit} from '@angular/core';
import {EtatReclamationService} from '../../../../../../controller/service/EtatReclamation.service';
import {EtatReclamationVo} from '../../../../../../controller/model/EtatReclamation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-reclamation-view-moderateur',
  templateUrl: './etat-reclamation-view-moderateur.component.html',
  styleUrls: ['./etat-reclamation-view-moderateur.component.css']
})
export class EtatReclamationViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatReclamationService: EtatReclamationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatReclamationDialog  = false;
}

// getters and setters

get etatReclamations(): Array<EtatReclamationVo> {
    return this.etatReclamationService.etatReclamations;
       }
set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }

 get selectedEtatReclamation():EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
    set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }

   get viewEtatReclamationDialog():boolean {
           return this.etatReclamationService.viewEtatReclamationDialog;

       }
    set viewEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.viewEtatReclamationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
