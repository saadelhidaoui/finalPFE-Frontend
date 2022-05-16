import {Component, OnInit} from '@angular/core';
import {FonctionService} from '../../../../../../controller/service/Fonction.service';
import {FonctionVo} from '../../../../../../controller/model/Fonction.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-fonction-edit-chercheur',
  templateUrl: './fonction-edit-chercheur.component.html',
  styleUrls: ['./fonction-edit-chercheur.component.css']
})
export class FonctionEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private fonctionService: FonctionService
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
    this.fonctionService.edit().subscribe(fonction=>{
    const myIndex = this.fonctions.findIndex(e => e.id === this.selectedFonction.id);
    this.fonctions[myIndex] = this.selectedFonction;
    this.editFonctionDialog = false;
    this.selectedFonction = new FonctionVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editFonctionDialog  = false;
}

// getters and setters

get fonctions(): Array<FonctionVo> {
    return this.fonctionService.fonctions;
       }
set fonctions(value: Array<FonctionVo>) {
        this.fonctionService.fonctions = value;
       }

 get selectedFonction(): FonctionVo {
           return this.fonctionService.selectedFonction;
       }
    set selectedFonction(value: FonctionVo) {
        this.fonctionService.selectedFonction = value;
       }

   get editFonctionDialog(): boolean {
           return this.fonctionService.editFonctionDialog;

       }
    set editFonctionDialog(value: boolean) {
        this.fonctionService.editFonctionDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
