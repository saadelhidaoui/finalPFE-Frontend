import {Component, OnInit} from '@angular/core';
import {SituationModerateurService} from '../../../../../../controller/service/SituationModerateur.service';
import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-situation-moderateur-view-chercheur',
  templateUrl: './situation-moderateur-view-chercheur.component.html',
  styleUrls: ['./situation-moderateur-view-chercheur.component.css']
})
export class SituationModerateurViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private situationModerateurService: SituationModerateurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewSituationModerateurDialog  = false;
}

// getters and setters

get situationModerateurs(): Array<SituationModerateurVo> {
    return this.situationModerateurService.situationModerateurs;
       }
set situationModerateurs(value: Array<SituationModerateurVo>) {
        this.situationModerateurService.situationModerateurs = value;
       }

 get selectedSituationModerateur():SituationModerateurVo {
           return this.situationModerateurService.selectedSituationModerateur;
       }
    set selectedSituationModerateur(value: SituationModerateurVo) {
        this.situationModerateurService.selectedSituationModerateur = value;
       }

   get viewSituationModerateurDialog():boolean {
           return this.situationModerateurService.viewSituationModerateurDialog;

       }
    set viewSituationModerateurDialog(value: boolean) {
        this.situationModerateurService.viewSituationModerateurDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
