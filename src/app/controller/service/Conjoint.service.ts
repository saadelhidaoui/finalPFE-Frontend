import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ConjointVo} from '../model/Conjoint.model';
import {AdherentVo} from '../model/Adherent.model';
import {QualiteVo} from '../model/Qualite.model';


@Injectable({
  providedIn: 'root'
})
export class ConjointService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/conjoint/';
        })
    }
     private _conjoints: Array<ConjointVo> ;
     private _selectedConjoint: ConjointVo;
     private _conjointSelections: Array<ConjointVo>;
     private _createConjointDialog: boolean;
     private _editConjointDialog: boolean;
     private _viewConjointDialog: boolean;
     public editConjoint$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchConjoint:ConjointVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ConjointVo>>(this.API);
    }

    public save(): Observable<ConjointVo> {
         return this.http.post<ConjointVo>(this.API, this.selectedConjoint);
    }

    delete(conjoint: ConjointVo) {
         return this.http.delete<number>(this.API + 'id/' + conjoint.id);
    }


    public edit(): Observable<ConjointVo> {
        return this.http.put<ConjointVo>(this.API, this.selectedConjoint);
    }


     public findByCriteria(conjoint:ConjointVo):Observable<Array<ConjointVo>>{
           return this.http.post<Array<ConjointVo>>(this.API +'search', conjoint);
    }

   public findByIdWithAssociatedList(conjoint:ConjointVo):Observable<ConjointVo>{
         return this.http.get<ConjointVo>(this.API + 'detail/id/' +conjoint.id);
    }

    // getters and setters


    get conjoints(): Array<ConjointVo> {
    if(this._conjoints==null){
    this._conjoints=new Array<ConjointVo>();
    }
return this._conjoints;
       }

    set conjoints(value: Array<ConjointVo>) {
        this._conjoints = value;
       }

    get selectedConjoint(): ConjointVo {
    if(this._selectedConjoint==null){
    this._selectedConjoint=new ConjointVo();
    }
           return this._selectedConjoint;
       }

    set selectedConjoint(value: ConjointVo) {
        this._selectedConjoint = value;
       }

    get conjointSelections(): Array<ConjointVo> {
    if(this._conjointSelections==null){
    this._conjointSelections=new Array<ConjointVo>();
    }
        return this._conjointSelections;
       }


    set conjointSelections(value: Array<ConjointVo>) {
        this._conjointSelections = value;
       }

    get createConjointDialog(): boolean {
        return this._createConjointDialog;
       }

    set createConjointDialog(value: boolean) {
        this._createConjointDialog = value;
       }

    get editConjointDialog(): boolean {
        return this._editConjointDialog;
       }

    set editConjointDialog(value: boolean) {
        this._editConjointDialog = value;
       }

    get viewConjointDialog(): boolean {
        return this._viewConjointDialog;
       }

    set viewConjointDialog(value: boolean) {
        this._viewConjointDialog = value;
       }

     get searchConjoint(): ConjointVo {
     if(this._searchConjoint==null){
    this._searchConjoint=new ConjointVo();
    }
        return this._searchConjoint;
    }

    set searchConjoint(value: ConjointVo) {
        this._searchConjoint = value;
       }

}
