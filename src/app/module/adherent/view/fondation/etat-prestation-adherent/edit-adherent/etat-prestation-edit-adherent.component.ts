import {Component, OnInit} from '@angular/core';
import {EtatPrestationService} from '../../../../../../controller/service/EtatPrestation.service';
import {EtatPrestationVo} from '../../../../../../controller/model/EtatPrestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-prestation-edit-adherent',
  templateUrl: './etat-prestation-edit-adherent.component.html',
  styleUrls: ['./etat-prestation-edit-adherent.component.css']
})
export class EtatPrestationEditAdherentComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatPrestationService: EtatPrestationService
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
    this.etatPrestationService.edit().subscribe(etatPrestation=>{
    const myIndex = this.etatPrestations.findIndex(e => e.id === this.selectedEtatPrestation.id);
    this.etatPrestations[myIndex] = this.selectedEtatPrestation;
    this.editEtatPrestationDialog = false;
    this.selectedEtatPrestation = new EtatPrestationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatPrestationDialog  = false;
}

// getters and setters

get etatPrestations(): Array<EtatPrestationVo> {
    return this.etatPrestationService.etatPrestations;
       }
set etatPrestations(value: Array<EtatPrestationVo>) {
        this.etatPrestationService.etatPrestations = value;
       }

 get selectedEtatPrestation(): EtatPrestationVo {
           return this.etatPrestationService.selectedEtatPrestation;
       }
    set selectedEtatPrestation(value: EtatPrestationVo) {
        this.etatPrestationService.selectedEtatPrestation = value;
       }

   get editEtatPrestationDialog(): boolean {
           return this.etatPrestationService.editEtatPrestationDialog;

       }
    set editEtatPrestationDialog(value: boolean) {
        this.etatPrestationService.editEtatPrestationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
