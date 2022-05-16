import {Component, OnInit} from '@angular/core';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-qualite-view-moderateur',
  templateUrl: './qualite-view-moderateur.component.html',
  styleUrls: ['./qualite-view-moderateur.component.css']
})
export class QualiteViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private qualiteService: QualiteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewQualiteDialog  = false;
}

// getters and setters

get qualites(): Array<QualiteVo> {
    return this.qualiteService.qualites;
       }
set qualites(value: Array<QualiteVo>) {
        this.qualiteService.qualites = value;
       }

 get selectedQualite():QualiteVo {
           return this.qualiteService.selectedQualite;
       }
    set selectedQualite(value: QualiteVo) {
        this.qualiteService.selectedQualite = value;
       }

   get viewQualiteDialog():boolean {
           return this.qualiteService.viewQualiteDialog;

       }
    set viewQualiteDialog(value: boolean) {
        this.qualiteService.viewQualiteDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
