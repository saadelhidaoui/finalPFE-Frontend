import {Component, OnInit} from '@angular/core';
import {EtatCarteService} from '../../../../../../controller/service/EtatCarte.service';
import {EtatCarteVo} from '../../../../../../controller/model/EtatCarte.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-carte-edit-chercheur',
  templateUrl: './etat-carte-edit-chercheur.component.html',
  styleUrls: ['./etat-carte-edit-chercheur.component.css']
})
export class EtatCarteEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatCarteService: EtatCarteService
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
    this.etatCarteService.edit().subscribe(etatCarte=>{
    const myIndex = this.etatCartes.findIndex(e => e.id === this.selectedEtatCarte.id);
    this.etatCartes[myIndex] = this.selectedEtatCarte;
    this.editEtatCarteDialog = false;
    this.selectedEtatCarte = new EtatCarteVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editEtatCarteDialog  = false;
}

// getters and setters

get etatCartes(): Array<EtatCarteVo> {
    return this.etatCarteService.etatCartes;
       }
set etatCartes(value: Array<EtatCarteVo>) {
        this.etatCarteService.etatCartes = value;
       }

 get selectedEtatCarte(): EtatCarteVo {
           return this.etatCarteService.selectedEtatCarte;
       }
    set selectedEtatCarte(value: EtatCarteVo) {
        this.etatCarteService.selectedEtatCarte = value;
       }

   get editEtatCarteDialog(): boolean {
           return this.etatCarteService.editEtatCarteDialog;

       }
    set editEtatCarteDialog(value: boolean) {
        this.etatCarteService.editEtatCarteDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
