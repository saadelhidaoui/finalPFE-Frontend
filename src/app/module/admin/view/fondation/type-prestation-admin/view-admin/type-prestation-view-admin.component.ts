import {Component, OnInit} from '@angular/core';
import {TypePrestationService} from '../../../../../../controller/service/TypePrestation.service';
import {TypePrestationVo} from '../../../../../../controller/model/TypePrestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-prestation-view-admin',
  templateUrl: './type-prestation-view-admin.component.html',
  styleUrls: ['./type-prestation-view-admin.component.css']
})
export class TypePrestationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePrestationService: TypePrestationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypePrestationDialog  = false;
}

// getters and setters

get typePrestations(): Array<TypePrestationVo> {
    return this.typePrestationService.typePrestations;
       }
set typePrestations(value: Array<TypePrestationVo>) {
        this.typePrestationService.typePrestations = value;
       }

 get selectedTypePrestation():TypePrestationVo {
           return this.typePrestationService.selectedTypePrestation;
       }
    set selectedTypePrestation(value: TypePrestationVo) {
        this.typePrestationService.selectedTypePrestation = value;
       }

   get viewTypePrestationDialog():boolean {
           return this.typePrestationService.viewTypePrestationDialog;

       }
    set viewTypePrestationDialog(value: boolean) {
        this.typePrestationService.viewTypePrestationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
