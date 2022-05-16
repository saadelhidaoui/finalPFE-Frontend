import {Component, OnInit} from '@angular/core';
import {FonctionService} from '../../../../../../controller/service/Fonction.service';
import {FonctionVo} from '../../../../../../controller/model/Fonction.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-fonction-view-moderateur',
  templateUrl: './fonction-view-moderateur.component.html',
  styleUrls: ['./fonction-view-moderateur.component.css']
})
export class FonctionViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private fonctionService: FonctionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewFonctionDialog  = false;
}

// getters and setters

get fonctions(): Array<FonctionVo> {
    return this.fonctionService.fonctions;
       }
set fonctions(value: Array<FonctionVo>) {
        this.fonctionService.fonctions = value;
       }

 get selectedFonction():FonctionVo {
           return this.fonctionService.selectedFonction;
       }
    set selectedFonction(value: FonctionVo) {
        this.fonctionService.selectedFonction = value;
       }

   get viewFonctionDialog():boolean {
           return this.fonctionService.viewFonctionDialog;

       }
    set viewFonctionDialog(value: boolean) {
        this.fonctionService.viewFonctionDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
