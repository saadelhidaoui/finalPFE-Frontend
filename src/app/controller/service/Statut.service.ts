import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {StatutVo} from '../model/Statut.model';


@Injectable({
  providedIn: 'root'
})
export class StatutService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/statut/';
        })
    }
     private _statuts: Array<StatutVo> ;
     private _selectedStatut: StatutVo;
     private _statutSelections: Array<StatutVo>;
     private _createStatutDialog: boolean;
     private _editStatutDialog: boolean;
     private _viewStatutDialog: boolean;
     public editStatut$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchStatut:StatutVo ;

    // methods

    public findAll(){
     return this.http.get<Array<StatutVo>>(this.API);
    }

    public save(): Observable<StatutVo> {
         return this.http.post<StatutVo>(this.API, this.selectedStatut);
    }

    delete(statut: StatutVo) {
         return this.http.delete<number>(this.API + 'id/' + statut.id);
    }


    public edit(): Observable<StatutVo> {
        return this.http.put<StatutVo>(this.API, this.selectedStatut);
    }


     public findByCriteria(statut:StatutVo):Observable<Array<StatutVo>>{
           return this.http.post<Array<StatutVo>>(this.API +'search', statut);
    }

   public findByIdWithAssociatedList(statut:StatutVo):Observable<StatutVo>{
         return this.http.get<StatutVo>(this.API + 'detail/id/' +statut.id);
    }

    // getters and setters


    get statuts(): Array<StatutVo> {
    if(this._statuts==null){
    this._statuts=new Array<StatutVo>();
    }
return this._statuts;
       }

    set statuts(value: Array<StatutVo>) {
        this._statuts = value;
       }

    get selectedStatut(): StatutVo {
    if(this._selectedStatut==null){
    this._selectedStatut=new StatutVo();
    }
           return this._selectedStatut;
       }

    set selectedStatut(value: StatutVo) {
        this._selectedStatut = value;
       }

    get statutSelections(): Array<StatutVo> {
    if(this._statutSelections==null){
    this._statutSelections=new Array<StatutVo>();
    }
        return this._statutSelections;
       }


    set statutSelections(value: Array<StatutVo>) {
        this._statutSelections = value;
       }

    get createStatutDialog(): boolean {
        return this._createStatutDialog;
       }

    set createStatutDialog(value: boolean) {
        this._createStatutDialog = value;
       }

    get editStatutDialog(): boolean {
        return this._editStatutDialog;
       }

    set editStatutDialog(value: boolean) {
        this._editStatutDialog = value;
       }

    get viewStatutDialog(): boolean {
        return this._viewStatutDialog;
       }

    set viewStatutDialog(value: boolean) {
        this._viewStatutDialog = value;
       }

     get searchStatut(): StatutVo {
     if(this._searchStatut==null){
    this._searchStatut=new StatutVo();
    }
        return this._searchStatut;
    }

    set searchStatut(value: StatutVo) {
        this._searchStatut = value;
       }

}
