import {Component, OnInit} from '@angular/core';
import {ImpressionCarteService} from '../../../../../../controller/service/ImpressionCarte.service';
import {ImpressionCarteVo} from '../../../../../../controller/model/ImpressionCarte.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-impression-carte-edit-admin',
  templateUrl: './impression-carte-edit-admin.component.html',
  styleUrls: ['./impression-carte-edit-admin.component.css']
})
export class ImpressionCarteEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private impressionCarteService: ImpressionCarteService
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
            this.selectedImpressionCarte.dateNaissance = DateUtils.toDate(this.selectedImpressionCarte.dateNaissance);
    this.impressionCarteService.edit().subscribe(impressionCarte=>{
    const myIndex = this.impressionCartes.findIndex(e => e.id === this.selectedImpressionCarte.id);
    this.impressionCartes[myIndex] = this.selectedImpressionCarte;
    this.editImpressionCarteDialog = false;
    this.selectedImpressionCarte = new ImpressionCarteVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editImpressionCarteDialog  = false;
}

// getters and setters

get impressionCartes(): Array<ImpressionCarteVo> {
    return this.impressionCarteService.impressionCartes;
       }
set impressionCartes(value: Array<ImpressionCarteVo>) {
        this.impressionCarteService.impressionCartes = value;
       }

 get selectedImpressionCarte(): ImpressionCarteVo {
           return this.impressionCarteService.selectedImpressionCarte;
       }
    set selectedImpressionCarte(value: ImpressionCarteVo) {
        this.impressionCarteService.selectedImpressionCarte = value;
       }

   get editImpressionCarteDialog(): boolean {
           return this.impressionCarteService.editImpressionCarteDialog;

       }
    set editImpressionCarteDialog(value: boolean) {
        this.impressionCarteService.editImpressionCarteDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
