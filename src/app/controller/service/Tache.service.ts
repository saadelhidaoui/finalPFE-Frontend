import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TacheVo} from '../model/Tache.model';
import {EtatTacheVo} from '../model/EtatTache.model';
import {ModerateurVo} from '../model/Moderateur.model';


@Injectable({
  providedIn: 'root'
})
export class TacheService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/tache/';
        })
    }
     private _taches: Array<TacheVo> ;
     private _selectedTache: TacheVo;
     private _tacheSelections: Array<TacheVo>;
     private _createTacheDialog: boolean;
     private _editTacheDialog: boolean;
     private _viewTacheDialog: boolean;
     public editTache$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTache:TacheVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TacheVo>>(this.API);
    }

    public save(): Observable<TacheVo> {
           return this.http.post<TacheVo>(this.API, {...this.selectedTache,dateTache: moment(this.selectedTache.dateTache).format("YYYY-MM-DD")});
    }

    delete(tache: TacheVo) {
         return this.http.delete<number>(this.API + 'id/' + tache.id);
    }


    public edit(): Observable<TacheVo> {
        return this.http.put<TacheVo>(this.API, this.selectedTache);
    }


     public findByCriteria(tache:TacheVo):Observable<Array<TacheVo>>{
           return this.http.post<Array<TacheVo>>(this.API +'search', tache);
    }

   public findByIdWithAssociatedList(tache:TacheVo):Observable<TacheVo>{
         return this.http.get<TacheVo>(this.API + 'detail/id/' +tache.id);
    }

    // getters and setters


    get taches(): Array<TacheVo> {
    if(this._taches==null){
    this._taches=new Array<TacheVo>();
    }
return this._taches;
       }

    set taches(value: Array<TacheVo>) {
        this._taches = value;
       }

    get selectedTache(): TacheVo {
    if(this._selectedTache==null){
    this._selectedTache=new TacheVo();
    }
           return this._selectedTache;
       }

    set selectedTache(value: TacheVo) {
        this._selectedTache = value;
       }

    get tacheSelections(): Array<TacheVo> {
    if(this._tacheSelections==null){
    this._tacheSelections=new Array<TacheVo>();
    }
        return this._tacheSelections;
       }


    set tacheSelections(value: Array<TacheVo>) {
        this._tacheSelections = value;
       }

    get createTacheDialog(): boolean {
        return this._createTacheDialog;
       }

    set createTacheDialog(value: boolean) {
        this._createTacheDialog = value;
       }

    get editTacheDialog(): boolean {
        return this._editTacheDialog;
       }

    set editTacheDialog(value: boolean) {
        this._editTacheDialog = value;
       }

    get viewTacheDialog(): boolean {
        return this._viewTacheDialog;
       }

    set viewTacheDialog(value: boolean) {
        this._viewTacheDialog = value;
       }

     get searchTache(): TacheVo {
     if(this._searchTache==null){
    this._searchTache=new TacheVo();
    }
        return this._searchTache;
    }

    set searchTache(value: TacheVo) {
        this._searchTache = value;
       }

}
