import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EchelonVo} from '../model/Echelon.model';


@Injectable({
  providedIn: 'root'
})
export class EchelonService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/echelon/';
        })
    }
     private _echelons: Array<EchelonVo> ;
     private _selectedEchelon: EchelonVo;
     private _echelonSelections: Array<EchelonVo>;
     private _createEchelonDialog: boolean;
     private _editEchelonDialog: boolean;
     private _viewEchelonDialog: boolean;
     public editEchelon$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEchelon:EchelonVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EchelonVo>>(this.API);
    }

    public save(): Observable<EchelonVo> {
         return this.http.post<EchelonVo>(this.API, this.selectedEchelon);
    }

    delete(echelon: EchelonVo) {
         return this.http.delete<number>(this.API + 'id/' + echelon.id);
    }


    public edit(): Observable<EchelonVo> {
        return this.http.put<EchelonVo>(this.API, this.selectedEchelon);
    }


     public findByCriteria(echelon:EchelonVo):Observable<Array<EchelonVo>>{
           return this.http.post<Array<EchelonVo>>(this.API +'search', echelon);
    }

   public findByIdWithAssociatedList(echelon:EchelonVo):Observable<EchelonVo>{
         return this.http.get<EchelonVo>(this.API + 'detail/id/' +echelon.id);
    }

    // getters and setters


    get echelons(): Array<EchelonVo> {
    if(this._echelons==null){
    this._echelons=new Array<EchelonVo>();
    }
return this._echelons;
       }

    set echelons(value: Array<EchelonVo>) {
        this._echelons = value;
       }

    get selectedEchelon(): EchelonVo {
    if(this._selectedEchelon==null){
    this._selectedEchelon=new EchelonVo();
    }
           return this._selectedEchelon;
       }

    set selectedEchelon(value: EchelonVo) {
        this._selectedEchelon = value;
       }

    get echelonSelections(): Array<EchelonVo> {
    if(this._echelonSelections==null){
    this._echelonSelections=new Array<EchelonVo>();
    }
        return this._echelonSelections;
       }


    set echelonSelections(value: Array<EchelonVo>) {
        this._echelonSelections = value;
       }

    get createEchelonDialog(): boolean {
        return this._createEchelonDialog;
       }

    set createEchelonDialog(value: boolean) {
        this._createEchelonDialog = value;
       }

    get editEchelonDialog(): boolean {
        return this._editEchelonDialog;
       }

    set editEchelonDialog(value: boolean) {
        this._editEchelonDialog = value;
       }

    get viewEchelonDialog(): boolean {
        return this._viewEchelonDialog;
       }

    set viewEchelonDialog(value: boolean) {
        this._viewEchelonDialog = value;
       }

     get searchEchelon(): EchelonVo {
     if(this._searchEchelon==null){
    this._searchEchelon=new EchelonVo();
    }
        return this._searchEchelon;
    }

    set searchEchelon(value: EchelonVo) {
        this._searchEchelon = value;
       }

}
