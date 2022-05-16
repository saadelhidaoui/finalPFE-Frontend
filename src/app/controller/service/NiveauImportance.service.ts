import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {NiveauImportanceVo} from '../model/NiveauImportance.model';


@Injectable({
  providedIn: 'root'
})
export class NiveauImportanceService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/niveauImportance/';
        })
    }
     private _niveauImportances: Array<NiveauImportanceVo> ;
     private _selectedNiveauImportance: NiveauImportanceVo;
     private _niveauImportanceSelections: Array<NiveauImportanceVo>;
     private _createNiveauImportanceDialog: boolean;
     private _editNiveauImportanceDialog: boolean;
     private _viewNiveauImportanceDialog: boolean;
     public editNiveauImportance$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchNiveauImportance:NiveauImportanceVo ;

    // methods

    public findAll(){
     return this.http.get<Array<NiveauImportanceVo>>(this.API);
    }

    public save(): Observable<NiveauImportanceVo> {
         return this.http.post<NiveauImportanceVo>(this.API, this.selectedNiveauImportance);
    }

    delete(niveauImportance: NiveauImportanceVo) {
         return this.http.delete<number>(this.API + 'id/' + niveauImportance.id);
    }


    public edit(): Observable<NiveauImportanceVo> {
        return this.http.put<NiveauImportanceVo>(this.API, this.selectedNiveauImportance);
    }


     public findByCriteria(niveauImportance:NiveauImportanceVo):Observable<Array<NiveauImportanceVo>>{
           return this.http.post<Array<NiveauImportanceVo>>(this.API +'search', niveauImportance);
    }

   public findByIdWithAssociatedList(niveauImportance:NiveauImportanceVo):Observable<NiveauImportanceVo>{
         return this.http.get<NiveauImportanceVo>(this.API + 'detail/id/' +niveauImportance.id);
    }

    // getters and setters


    get niveauImportances(): Array<NiveauImportanceVo> {
    if(this._niveauImportances==null){
    this._niveauImportances=new Array<NiveauImportanceVo>();
    }
return this._niveauImportances;
       }

    set niveauImportances(value: Array<NiveauImportanceVo>) {
        this._niveauImportances = value;
       }

    get selectedNiveauImportance(): NiveauImportanceVo {
    if(this._selectedNiveauImportance==null){
    this._selectedNiveauImportance=new NiveauImportanceVo();
    }
           return this._selectedNiveauImportance;
       }

    set selectedNiveauImportance(value: NiveauImportanceVo) {
        this._selectedNiveauImportance = value;
       }

    get niveauImportanceSelections(): Array<NiveauImportanceVo> {
    if(this._niveauImportanceSelections==null){
    this._niveauImportanceSelections=new Array<NiveauImportanceVo>();
    }
        return this._niveauImportanceSelections;
       }


    set niveauImportanceSelections(value: Array<NiveauImportanceVo>) {
        this._niveauImportanceSelections = value;
       }

    get createNiveauImportanceDialog(): boolean {
        return this._createNiveauImportanceDialog;
       }

    set createNiveauImportanceDialog(value: boolean) {
        this._createNiveauImportanceDialog = value;
       }

    get editNiveauImportanceDialog(): boolean {
        return this._editNiveauImportanceDialog;
       }

    set editNiveauImportanceDialog(value: boolean) {
        this._editNiveauImportanceDialog = value;
       }

    get viewNiveauImportanceDialog(): boolean {
        return this._viewNiveauImportanceDialog;
       }

    set viewNiveauImportanceDialog(value: boolean) {
        this._viewNiveauImportanceDialog = value;
       }

     get searchNiveauImportance(): NiveauImportanceVo {
     if(this._searchNiveauImportance==null){
    this._searchNiveauImportance=new NiveauImportanceVo();
    }
        return this._searchNiveauImportance;
    }

    set searchNiveauImportance(value: NiveauImportanceVo) {
        this._searchNiveauImportance = value;
       }

}
