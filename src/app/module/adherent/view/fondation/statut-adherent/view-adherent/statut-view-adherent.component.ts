import {Component, OnInit} from '@angular/core';
import {StatutService} from '../../../../../../controller/service/Statut.service';
import {StatutVo} from '../../../../../../controller/model/Statut.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-statut-view-adherent',
  templateUrl: './statut-view-adherent.component.html',
  styleUrls: ['./statut-view-adherent.component.css']
})
export class StatutViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private statutService: StatutService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewStatutDialog  = false;
}

// getters and setters

get statuts(): Array<StatutVo> {
    return this.statutService.statuts;
       }
set statuts(value: Array<StatutVo>) {
        this.statutService.statuts = value;
       }

 get selectedStatut():StatutVo {
           return this.statutService.selectedStatut;
       }
    set selectedStatut(value: StatutVo) {
        this.statutService.selectedStatut = value;
       }

   get viewStatutDialog():boolean {
           return this.statutService.viewStatutDialog;

       }
    set viewStatutDialog(value: boolean) {
        this.statutService.viewStatutDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
