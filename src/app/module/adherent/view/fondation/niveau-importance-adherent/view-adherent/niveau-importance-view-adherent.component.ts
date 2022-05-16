import {Component, OnInit} from '@angular/core';
import {NiveauImportanceService} from '../../../../../../controller/service/NiveauImportance.service';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-niveau-importance-view-adherent',
  templateUrl: './niveau-importance-view-adherent.component.html',
  styleUrls: ['./niveau-importance-view-adherent.component.css']
})
export class NiveauImportanceViewAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauImportanceService: NiveauImportanceService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewNiveauImportanceDialog  = false;
}

// getters and setters

get niveauImportances(): Array<NiveauImportanceVo> {
    return this.niveauImportanceService.niveauImportances;
       }
set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
       }

 get selectedNiveauImportance():NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
    set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }

   get viewNiveauImportanceDialog():boolean {
           return this.niveauImportanceService.viewNiveauImportanceDialog;

       }
    set viewNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.viewNiveauImportanceDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
