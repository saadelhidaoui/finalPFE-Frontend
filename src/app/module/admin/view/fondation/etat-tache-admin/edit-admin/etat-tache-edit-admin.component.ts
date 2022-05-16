import {Component, OnInit} from '@angular/core';
import {EtatTacheService} from '../../../../../../controller/service/EtatTache.service';
import {EtatTacheVo} from '../../../../../../controller/model/EtatTache.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-tache-edit-admin',
  templateUrl: './etat-tache-edit-admin.component.html',
  styleUrls: ['./etat-tache-edit-admin.component.css']
})
export class EtatTacheEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatTacheService: EtatTacheService
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
    this.etatTacheService.edit().subscribe(etatTache=>{
    const myIndex = this.etatTaches.findIndex(e => e.id === this.selectedEtatTache.id);
    this.etatTaches[myIndex] = this.selectedEtatTache;
    this.editEtatTacheDialog = false;
    this.selectedEtatTache = new EtatTacheVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatTacheDialog  = false;
}

// getters and setters

get etatTaches(): Array<EtatTacheVo> {
    return this.etatTacheService.etatTaches;
       }
set etatTaches(value: Array<EtatTacheVo>) {
        this.etatTacheService.etatTaches = value;
       }

 get selectedEtatTache(): EtatTacheVo {
           return this.etatTacheService.selectedEtatTache;
       }
    set selectedEtatTache(value: EtatTacheVo) {
        this.etatTacheService.selectedEtatTache = value;
       }

   get editEtatTacheDialog(): boolean {
           return this.etatTacheService.editEtatTacheDialog;

       }
    set editEtatTacheDialog(value: boolean) {
        this.etatTacheService.editEtatTacheDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
