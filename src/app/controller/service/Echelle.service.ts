import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EchelleVo} from '../model/Echelle.model';
import {EchelonVo} from '../model/Echelon.model';


@Injectable({
  providedIn: 'root'
})
export class EchelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/echelle/';
        })
    }
     private _echelles: Array<EchelleVo> ;
     private _selectedEchelle: EchelleVo;
     private _echelleSelections: Array<EchelleVo>;
     private _createEchelleDialog: boolean;
     private _editEchelleDialog: boolean;
     private _viewEchelleDialog: boolean;
     public editEchelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEchelle:EchelleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EchelleVo>>(this.API);
    }

    public save(): Observable<EchelleVo> {
         return this.http.post<EchelleVo>(this.API, this.selectedEchelle);
    }

    delete(echelle: EchelleVo) {
         return this.http.delete<number>(this.API + 'id/' + echelle.id);
    }


    public edit(): Observable<EchelleVo> {
        return this.http.put<EchelleVo>(this.API, this.selectedEchelle);
    }


     public findByCriteria(echelle:EchelleVo):Observable<Array<EchelleVo>>{
           return this.http.post<Array<EchelleVo>>(this.API +'search', echelle);
    }

   public findByIdWithAssociatedList(echelle:EchelleVo):Observable<EchelleVo>{
         return this.http.get<EchelleVo>(this.API + 'detail/id/' +echelle.id);
    }

    // getters and setters


    get echelles(): Array<EchelleVo> {
    if(this._echelles==null){
    this._echelles=new Array<EchelleVo>();
    }
return this._echelles;
       }

    set echelles(value: Array<EchelleVo>) {
        this._echelles = value;
       }

    get selectedEchelle(): EchelleVo {
    if(this._selectedEchelle==null){
    this._selectedEchelle=new EchelleVo();
    }
           return this._selectedEchelle;
       }

    set selectedEchelle(value: EchelleVo) {
        this._selectedEchelle = value;
       }

    get echelleSelections(): Array<EchelleVo> {
    if(this._echelleSelections==null){
    this._echelleSelections=new Array<EchelleVo>();
    }
        return this._echelleSelections;
       }


    set echelleSelections(value: Array<EchelleVo>) {
        this._echelleSelections = value;
       }

    get createEchelleDialog(): boolean {
        return this._createEchelleDialog;
       }

    set createEchelleDialog(value: boolean) {
        this._createEchelleDialog = value;
       }

    get editEchelleDialog(): boolean {
        return this._editEchelleDialog;
       }

    set editEchelleDialog(value: boolean) {
        this._editEchelleDialog = value;
       }

    get viewEchelleDialog(): boolean {
        return this._viewEchelleDialog;
       }

    set viewEchelleDialog(value: boolean) {
        this._viewEchelleDialog = value;
       }

     get searchEchelle(): EchelleVo {
     if(this._searchEchelle==null){
    this._searchEchelle=new EchelleVo();
    }
        return this._searchEchelle;
    }

    set searchEchelle(value: EchelleVo) {
        this._searchEchelle = value;
       }

}
