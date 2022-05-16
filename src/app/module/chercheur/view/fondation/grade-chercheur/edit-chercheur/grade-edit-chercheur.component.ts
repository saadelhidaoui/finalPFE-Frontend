import {Component, OnInit} from '@angular/core';
import {GradeService} from '../../../../../../controller/service/Grade.service';
import {GradeVo} from '../../../../../../controller/model/Grade.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-grade-edit-chercheur',
  templateUrl: './grade-edit-chercheur.component.html',
  styleUrls: ['./grade-edit-chercheur.component.css']
})
export class GradeEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private gradeService: GradeService
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
    this.gradeService.edit().subscribe(grade=>{
    const myIndex = this.grades.findIndex(e => e.id === this.selectedGrade.id);
    this.grades[myIndex] = this.selectedGrade;
    this.editGradeDialog = false;
    this.selectedGrade = new GradeVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editGradeDialog  = false;
}

// getters and setters

get grades(): Array<GradeVo> {
    return this.gradeService.grades;
       }
set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
       }

 get selectedGrade(): GradeVo {
           return this.gradeService.selectedGrade;
       }
    set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
       }

   get editGradeDialog(): boolean {
           return this.gradeService.editGradeDialog;

       }
    set editGradeDialog(value: boolean) {
        this.gradeService.editGradeDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
