import {Component, OnInit} from '@angular/core';
import {TypePrestationService} from '../../../../../../controller/service/TypePrestation.service';
import {TypePrestationVo} from '../../../../../../controller/model/TypePrestation.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-prestation-edit-moderateur',
  templateUrl: './type-prestation-edit-moderateur.component.html',
  styleUrls: ['./type-prestation-edit-moderateur.component.css']
})
export class TypePrestationEditModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePrestationService: TypePrestationService
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
    this.typePrestationService.edit().subscribe(typePrestation=>{
    const myIndex = this.typePrestations.findIndex(e => e.id === this.selectedTypePrestation.id);
    this.typePrestations[myIndex] = this.selectedTypePrestation;
    this.editTypePrestationDialog = false;
    this.selectedTypePrestation = new TypePrestationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypePrestationDialog  = false;
}

// getters and setters

get typePrestations(): Array<TypePrestationVo> {
    return this.typePrestationService.typePrestations;
       }
set typePrestations(value: Array<TypePrestationVo>) {
        this.typePrestationService.typePrestations = value;
       }

 get selectedTypePrestation(): TypePrestationVo {
           return this.typePrestationService.selectedTypePrestation;
       }
    set selectedTypePrestation(value: TypePrestationVo) {
        this.typePrestationService.selectedTypePrestation = value;
       }

   get editTypePrestationDialog(): boolean {
           return this.typePrestationService.editTypePrestationDialog;

       }
    set editTypePrestationDialog(value: boolean) {
        this.typePrestationService.editTypePrestationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
