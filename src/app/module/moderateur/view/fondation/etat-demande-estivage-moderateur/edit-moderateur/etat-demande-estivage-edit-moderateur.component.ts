import {Component, OnInit} from '@angular/core';
import {EtatDemandeEstivageService} from '../../../../../../controller/service/EtatDemandeEstivage.service';
import {EtatDemandeEstivageVo} from '../../../../../../controller/model/EtatDemandeEstivage.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-demande-estivage-edit-moderateur',
  templateUrl: './etat-demande-estivage-edit-moderateur.component.html',
  styleUrls: ['./etat-demande-estivage-edit-moderateur.component.css']
})
export class EtatDemandeEstivageEditModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDemandeEstivageService: EtatDemandeEstivageService
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
    this.etatDemandeEstivageService.edit().subscribe(etatDemandeEstivage=>{
    const myIndex = this.etatDemandeEstivages.findIndex(e => e.id === this.selectedEtatDemandeEstivage.id);
    this.etatDemandeEstivages[myIndex] = this.selectedEtatDemandeEstivage;
    this.editEtatDemandeEstivageDialog = false;
    this.selectedEtatDemandeEstivage = new EtatDemandeEstivageVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatDemandeEstivageDialog  = false;
}

// getters and setters

get etatDemandeEstivages(): Array<EtatDemandeEstivageVo> {
    return this.etatDemandeEstivageService.etatDemandeEstivages;
       }
set etatDemandeEstivages(value: Array<EtatDemandeEstivageVo>) {
        this.etatDemandeEstivageService.etatDemandeEstivages = value;
       }

 get selectedEtatDemandeEstivage(): EtatDemandeEstivageVo {
           return this.etatDemandeEstivageService.selectedEtatDemandeEstivage;
       }
    set selectedEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this.etatDemandeEstivageService.selectedEtatDemandeEstivage = value;
       }

   get editEtatDemandeEstivageDialog(): boolean {
           return this.etatDemandeEstivageService.editEtatDemandeEstivageDialog;

       }
    set editEtatDemandeEstivageDialog(value: boolean) {
        this.etatDemandeEstivageService.editEtatDemandeEstivageDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
