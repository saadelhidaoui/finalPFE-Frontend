import {Component, OnInit} from '@angular/core';
import {StatutService} from '../../../../../../controller/service/Statut.service';
import {StatutVo} from '../../../../../../controller/model/Statut.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-statut-edit-adherent',
  templateUrl: './statut-edit-adherent.component.html',
  styleUrls: ['./statut-edit-adherent.component.css']
})
export class StatutEditAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private statutService: StatutService
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
    this.statutService.edit().subscribe(statut=>{
    const myIndex = this.statuts.findIndex(e => e.id === this.selectedStatut.id);
    this.statuts[myIndex] = this.selectedStatut;
    this.editStatutDialog = false;
    this.selectedStatut = new StatutVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editStatutDialog  = false;
}

// getters and setters

get statuts(): Array<StatutVo> {
    return this.statutService.statuts;
       }
set statuts(value: Array<StatutVo>) {
        this.statutService.statuts = value;
       }

 get selectedStatut(): StatutVo {
           return this.statutService.selectedStatut;
       }
    set selectedStatut(value: StatutVo) {
        this.statutService.selectedStatut = value;
       }

   get editStatutDialog(): boolean {
           return this.statutService.editStatutDialog;

       }
    set editStatutDialog(value: boolean) {
        this.statutService.editStatutDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
