import {Component, OnInit} from '@angular/core';
import {EchelonService} from '../../../../../../controller/service/Echelon.service';
import {EchelonVo} from '../../../../../../controller/model/Echelon.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-echelon-view-chercheur',
  templateUrl: './echelon-view-chercheur.component.html',
  styleUrls: ['./echelon-view-chercheur.component.css']
})
export class EchelonViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private echelonService: EchelonService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEchelonDialog  = false;
}

// getters and setters

get echelons(): Array<EchelonVo> {
    return this.echelonService.echelons;
       }
set echelons(value: Array<EchelonVo>) {
        this.echelonService.echelons = value;
       }

 get selectedEchelon():EchelonVo {
           return this.echelonService.selectedEchelon;
       }
    set selectedEchelon(value: EchelonVo) {
        this.echelonService.selectedEchelon = value;
       }

   get viewEchelonDialog():boolean {
           return this.echelonService.viewEchelonDialog;

       }
    set viewEchelonDialog(value: boolean) {
        this.echelonService.viewEchelonDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
