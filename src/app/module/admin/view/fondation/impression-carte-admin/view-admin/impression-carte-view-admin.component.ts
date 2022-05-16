import {Component, OnInit} from '@angular/core';
import {ImpressionCarteService} from '../../../../../../controller/service/ImpressionCarte.service';
import {ImpressionCarteVo} from '../../../../../../controller/model/ImpressionCarte.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-impression-carte-view-admin',
  templateUrl: './impression-carte-view-admin.component.html',
  styleUrls: ['./impression-carte-view-admin.component.css']
})
export class ImpressionCarteViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private impressionCarteService: ImpressionCarteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewImpressionCarteDialog  = false;
}

// getters and setters

get impressionCartes(): Array<ImpressionCarteVo> {
    return this.impressionCarteService.impressionCartes;
       }
set impressionCartes(value: Array<ImpressionCarteVo>) {
        this.impressionCarteService.impressionCartes = value;
       }

 get selectedImpressionCarte():ImpressionCarteVo {
           return this.impressionCarteService.selectedImpressionCarte;
       }
    set selectedImpressionCarte(value: ImpressionCarteVo) {
        this.impressionCarteService.selectedImpressionCarte = value;
       }

   get viewImpressionCarteDialog():boolean {
           return this.impressionCarteService.viewImpressionCarteDialog;

       }
    set viewImpressionCarteDialog(value: boolean) {
        this.impressionCarteService.viewImpressionCarteDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
