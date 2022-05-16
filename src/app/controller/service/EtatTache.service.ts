import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatTacheVo} from '../model/EtatTache.model';


@Injectable({
  providedIn: 'root'
})
export class EtatTacheService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatTache/';
        })
    }
     private _etatTaches: Array<EtatTacheVo> ;
     private _selectedEtatTache: EtatTacheVo;
     private _etatTacheSelections: Array<EtatTacheVo>;
     private _createEtatTacheDialog: boolean;
     private _editEtatTacheDialog: boolean;
     private _viewEtatTacheDialog: boolean;
     public editEtatTache$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatTache:EtatTacheVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatTacheVo>>(this.API);
    }

    public save(): Observable<EtatTacheVo> {
         return this.http.post<EtatTacheVo>(this.API, this.selectedEtatTache);
    }

    delete(etatTache: EtatTacheVo) {
         return this.http.delete<number>(this.API + 'id/' + etatTache.id);
    }


    public edit(): Observable<EtatTacheVo> {
        return this.http.put<EtatTacheVo>(this.API, this.selectedEtatTache);
    }


     public findByCriteria(etatTache:EtatTacheVo):Observable<Array<EtatTacheVo>>{
           return this.http.post<Array<EtatTacheVo>>(this.API +'search', etatTache);
    }

   public findByIdWithAssociatedList(etatTache:EtatTacheVo):Observable<EtatTacheVo>{
         return this.http.get<EtatTacheVo>(this.API + 'detail/id/' +etatTache.id);
    }

    // getters and setters


    get etatTaches(): Array<EtatTacheVo> {
    if(this._etatTaches==null){
    this._etatTaches=new Array<EtatTacheVo>();
    }
return this._etatTaches;
       }

    set etatTaches(value: Array<EtatTacheVo>) {
        this._etatTaches = value;
       }

    get selectedEtatTache(): EtatTacheVo {
    if(this._selectedEtatTache==null){
    this._selectedEtatTache=new EtatTacheVo();
    }
           return this._selectedEtatTache;
       }

    set selectedEtatTache(value: EtatTacheVo) {
        this._selectedEtatTache = value;
       }

    get etatTacheSelections(): Array<EtatTacheVo> {
    if(this._etatTacheSelections==null){
    this._etatTacheSelections=new Array<EtatTacheVo>();
    }
        return this._etatTacheSelections;
       }


    set etatTacheSelections(value: Array<EtatTacheVo>) {
        this._etatTacheSelections = value;
       }

    get createEtatTacheDialog(): boolean {
        return this._createEtatTacheDialog;
       }

    set createEtatTacheDialog(value: boolean) {
        this._createEtatTacheDialog = value;
       }

    get editEtatTacheDialog(): boolean {
        return this._editEtatTacheDialog;
       }

    set editEtatTacheDialog(value: boolean) {
        this._editEtatTacheDialog = value;
       }

    get viewEtatTacheDialog(): boolean {
        return this._viewEtatTacheDialog;
       }

    set viewEtatTacheDialog(value: boolean) {
        this._viewEtatTacheDialog = value;
       }

     get searchEtatTache(): EtatTacheVo {
     if(this._searchEtatTache==null){
    this._searchEtatTache=new EtatTacheVo();
    }
        return this._searchEtatTache;
    }

    set searchEtatTache(value: EtatTacheVo) {
        this._searchEtatTache = value;
       }

}
