import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {QualiteVo} from '../model/Qualite.model';


@Injectable({
  providedIn: 'root'
})
export class QualiteService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/qualite/';
        })
    }
     private _qualites: Array<QualiteVo> ;
     private _selectedQualite: QualiteVo;
     private _qualiteSelections: Array<QualiteVo>;
     private _createQualiteDialog: boolean;
     private _editQualiteDialog: boolean;
     private _viewQualiteDialog: boolean;
     public editQualite$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchQualite:QualiteVo ;

    // methods

    public findAll(){
     return this.http.get<Array<QualiteVo>>(this.API);
    }

    public save(): Observable<QualiteVo> {
         return this.http.post<QualiteVo>(this.API, this.selectedQualite);
    }

    delete(qualite: QualiteVo) {
         return this.http.delete<number>(this.API + 'id/' + qualite.id);
    }


    public edit(): Observable<QualiteVo> {
        return this.http.put<QualiteVo>(this.API, this.selectedQualite);
    }


     public findByCriteria(qualite:QualiteVo):Observable<Array<QualiteVo>>{
           return this.http.post<Array<QualiteVo>>(this.API +'search', qualite);
    }

   public findByIdWithAssociatedList(qualite:QualiteVo):Observable<QualiteVo>{
         return this.http.get<QualiteVo>(this.API + 'detail/id/' +qualite.id);
    }

    // getters and setters


    get qualites(): Array<QualiteVo> {
    if(this._qualites==null){
    this._qualites=new Array<QualiteVo>();
    }
return this._qualites;
       }

    set qualites(value: Array<QualiteVo>) {
        this._qualites = value;
       }

    get selectedQualite(): QualiteVo {
    if(this._selectedQualite==null){
    this._selectedQualite=new QualiteVo();
    }
           return this._selectedQualite;
       }

    set selectedQualite(value: QualiteVo) {
        this._selectedQualite = value;
       }

    get qualiteSelections(): Array<QualiteVo> {
    if(this._qualiteSelections==null){
    this._qualiteSelections=new Array<QualiteVo>();
    }
        return this._qualiteSelections;
       }


    set qualiteSelections(value: Array<QualiteVo>) {
        this._qualiteSelections = value;
       }

    get createQualiteDialog(): boolean {
        return this._createQualiteDialog;
       }

    set createQualiteDialog(value: boolean) {
        this._createQualiteDialog = value;
       }

    get editQualiteDialog(): boolean {
        return this._editQualiteDialog;
       }

    set editQualiteDialog(value: boolean) {
        this._editQualiteDialog = value;
       }

    get viewQualiteDialog(): boolean {
        return this._viewQualiteDialog;
       }

    set viewQualiteDialog(value: boolean) {
        this._viewQualiteDialog = value;
       }

     get searchQualite(): QualiteVo {
     if(this._searchQualite==null){
    this._searchQualite=new QualiteVo();
    }
        return this._searchQualite;
    }

    set searchQualite(value: QualiteVo) {
        this._searchQualite = value;
       }

}
