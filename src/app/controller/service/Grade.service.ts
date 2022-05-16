import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {GradeVo} from '../model/Grade.model';


@Injectable({
  providedIn: 'root'
})
export class GradeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/grade/';
        })
    }
     private _grades: Array<GradeVo> ;
     private _selectedGrade: GradeVo;
     private _gradeSelections: Array<GradeVo>;
     private _createGradeDialog: boolean;
     private _editGradeDialog: boolean;
     private _viewGradeDialog: boolean;
     public editGrade$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchGrade:GradeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<GradeVo>>(this.API);
    }

    public save(): Observable<GradeVo> {
         return this.http.post<GradeVo>(this.API, this.selectedGrade);
    }

    delete(grade: GradeVo) {
         return this.http.delete<number>(this.API + 'id/' + grade.id);
    }


    public edit(): Observable<GradeVo> {
        return this.http.put<GradeVo>(this.API, this.selectedGrade);
    }


     public findByCriteria(grade:GradeVo):Observable<Array<GradeVo>>{
           return this.http.post<Array<GradeVo>>(this.API +'search', grade);
    }

   public findByIdWithAssociatedList(grade:GradeVo):Observable<GradeVo>{
         return this.http.get<GradeVo>(this.API + 'detail/id/' +grade.id);
    }

    // getters and setters


    get grades(): Array<GradeVo> {
    if(this._grades==null){
    this._grades=new Array<GradeVo>();
    }
return this._grades;
       }

    set grades(value: Array<GradeVo>) {
        this._grades = value;
       }

    get selectedGrade(): GradeVo {
    if(this._selectedGrade==null){
    this._selectedGrade=new GradeVo();
    }
           return this._selectedGrade;
       }

    set selectedGrade(value: GradeVo) {
        this._selectedGrade = value;
       }

    get gradeSelections(): Array<GradeVo> {
    if(this._gradeSelections==null){
    this._gradeSelections=new Array<GradeVo>();
    }
        return this._gradeSelections;
       }


    set gradeSelections(value: Array<GradeVo>) {
        this._gradeSelections = value;
       }

    get createGradeDialog(): boolean {
        return this._createGradeDialog;
       }

    set createGradeDialog(value: boolean) {
        this._createGradeDialog = value;
       }

    get editGradeDialog(): boolean {
        return this._editGradeDialog;
       }

    set editGradeDialog(value: boolean) {
        this._editGradeDialog = value;
       }

    get viewGradeDialog(): boolean {
        return this._viewGradeDialog;
       }

    set viewGradeDialog(value: boolean) {
        this._viewGradeDialog = value;
       }

     get searchGrade(): GradeVo {
     if(this._searchGrade==null){
    this._searchGrade=new GradeVo();
    }
        return this._searchGrade;
    }

    set searchGrade(value: GradeVo) {
        this._searchGrade = value;
       }

}
