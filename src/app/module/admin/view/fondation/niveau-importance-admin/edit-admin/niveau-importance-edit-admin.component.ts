import {Component, OnInit} from '@angular/core';
import {NiveauImportanceService} from '../../../../../../controller/service/NiveauImportance.service';
import {NiveauImportanceVo} from '../../../../../../controller/model/NiveauImportance.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-niveau-importance-edit-admin',
  templateUrl: './niveau-importance-edit-admin.component.html',
  styleUrls: ['./niveau-importance-edit-admin.component.css']
})
export class NiveauImportanceEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauImportanceService: NiveauImportanceService
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
    this.niveauImportanceService.edit().subscribe(niveauImportance=>{
    const myIndex = this.niveauImportances.findIndex(e => e.id === this.selectedNiveauImportance.id);
    this.niveauImportances[myIndex] = this.selectedNiveauImportance;
    this.editNiveauImportanceDialog = false;
    this.selectedNiveauImportance = new NiveauImportanceVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNiveauImportanceDialog  = false;
}

// getters and setters

get niveauImportances(): Array<NiveauImportanceVo> {
    return this.niveauImportanceService.niveauImportances;
       }
set niveauImportances(value: Array<NiveauImportanceVo>) {
        this.niveauImportanceService.niveauImportances = value;
       }

 get selectedNiveauImportance(): NiveauImportanceVo {
           return this.niveauImportanceService.selectedNiveauImportance;
       }
    set selectedNiveauImportance(value: NiveauImportanceVo) {
        this.niveauImportanceService.selectedNiveauImportance = value;
       }

   get editNiveauImportanceDialog(): boolean {
           return this.niveauImportanceService.editNiveauImportanceDialog;

       }
    set editNiveauImportanceDialog(value: boolean) {
        this.niveauImportanceService.editNiveauImportanceDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
