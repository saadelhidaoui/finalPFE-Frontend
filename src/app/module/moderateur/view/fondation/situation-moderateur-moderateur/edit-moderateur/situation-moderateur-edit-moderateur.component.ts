import {Component, OnInit} from '@angular/core';
import {SituationModerateurService} from '../../../../../../controller/service/SituationModerateur.service';
import {SituationModerateurVo} from '../../../../../../controller/model/SituationModerateur.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-situation-moderateur-edit-moderateur',
  templateUrl: './situation-moderateur-edit-moderateur.component.html',
  styleUrls: ['./situation-moderateur-edit-moderateur.component.css']
})
export class SituationModerateurEditModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private situationModerateurService: SituationModerateurService
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
    this.situationModerateurService.edit().subscribe(situationModerateur=>{
    const myIndex = this.situationModerateurs.findIndex(e => e.id === this.selectedSituationModerateur.id);
    this.situationModerateurs[myIndex] = this.selectedSituationModerateur;
    this.editSituationModerateurDialog = false;
    this.selectedSituationModerateur = new SituationModerateurVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editSituationModerateurDialog  = false;
}

// getters and setters

get situationModerateurs(): Array<SituationModerateurVo> {
    return this.situationModerateurService.situationModerateurs;
       }
set situationModerateurs(value: Array<SituationModerateurVo>) {
        this.situationModerateurService.situationModerateurs = value;
       }

 get selectedSituationModerateur(): SituationModerateurVo {
           return this.situationModerateurService.selectedSituationModerateur;
       }
    set selectedSituationModerateur(value: SituationModerateurVo) {
        this.situationModerateurService.selectedSituationModerateur = value;
       }

   get editSituationModerateurDialog(): boolean {
           return this.situationModerateurService.editSituationModerateurDialog;

       }
    set editSituationModerateurDialog(value: boolean) {
        this.situationModerateurService.editSituationModerateurDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
