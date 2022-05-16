import {Component, OnInit} from '@angular/core';
import {QualiteService} from '../../../../../../controller/service/Qualite.service';
import {QualiteVo} from '../../../../../../controller/model/Qualite.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-qualite-edit-chercheur',
  templateUrl: './qualite-edit-chercheur.component.html',
  styleUrls: ['./qualite-edit-chercheur.component.css']
})
export class QualiteEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private qualiteService: QualiteService
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
    this.qualiteService.edit().subscribe(qualite=>{
    const myIndex = this.qualites.findIndex(e => e.id === this.selectedQualite.id);
    this.qualites[myIndex] = this.selectedQualite;
    this.editQualiteDialog = false;
    this.selectedQualite = new QualiteVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editQualiteDialog  = false;
}

// getters and setters

get qualites(): Array<QualiteVo> {
    return this.qualiteService.qualites;
       }
set qualites(value: Array<QualiteVo>) {
        this.qualiteService.qualites = value;
       }

 get selectedQualite(): QualiteVo {
           return this.qualiteService.selectedQualite;
       }
    set selectedQualite(value: QualiteVo) {
        this.qualiteService.selectedQualite = value;
       }

   get editQualiteDialog(): boolean {
           return this.qualiteService.editQualiteDialog;

       }
    set editQualiteDialog(value: boolean) {
        this.qualiteService.editQualiteDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
