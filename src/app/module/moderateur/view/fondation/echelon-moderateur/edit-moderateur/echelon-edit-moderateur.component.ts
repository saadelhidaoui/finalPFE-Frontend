import {Component, OnInit} from '@angular/core';
import {EchelonService} from '../../../../../../controller/service/Echelon.service';
import {EchelonVo} from '../../../../../../controller/model/Echelon.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-echelon-edit-moderateur',
  templateUrl: './echelon-edit-moderateur.component.html',
  styleUrls: ['./echelon-edit-moderateur.component.css']
})
export class EchelonEditModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private echelonService: EchelonService
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
    this.echelonService.edit().subscribe(echelon=>{
    const myIndex = this.echelons.findIndex(e => e.id === this.selectedEchelon.id);
    this.echelons[myIndex] = this.selectedEchelon;
    this.editEchelonDialog = false;
    this.selectedEchelon = new EchelonVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEchelonDialog  = false;
}

// getters and setters

get echelons(): Array<EchelonVo> {
    return this.echelonService.echelons;
       }
set echelons(value: Array<EchelonVo>) {
        this.echelonService.echelons = value;
       }

 get selectedEchelon(): EchelonVo {
           return this.echelonService.selectedEchelon;
       }
    set selectedEchelon(value: EchelonVo) {
        this.echelonService.selectedEchelon = value;
       }

   get editEchelonDialog(): boolean {
           return this.echelonService.editEchelonDialog;

       }
    set editEchelonDialog(value: boolean) {
        this.echelonService.editEchelonDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
