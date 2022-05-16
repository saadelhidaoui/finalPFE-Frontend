import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatCarteVo} from '../model/EtatCarte.model';


@Injectable({
  providedIn: 'root'
})
export class EtatCarteService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatCarte/';
        })
    }
     private _etatCartes: Array<EtatCarteVo> ;
     private _selectedEtatCarte: EtatCarteVo;
     private _etatCarteSelections: Array<EtatCarteVo>;
     private _createEtatCarteDialog: boolean;
     private _editEtatCarteDialog: boolean;
     private _viewEtatCarteDialog: boolean;
     public editEtatCarte$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatCarte:EtatCarteVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatCarteVo>>(this.API);
    }

    public save(): Observable<EtatCarteVo> {
         return this.http.post<EtatCarteVo>(this.API, this.selectedEtatCarte);
    }

    delete(etatCarte: EtatCarteVo) {
         return this.http.delete<number>(this.API + 'id/' + etatCarte.id);
    }


    public edit(): Observable<EtatCarteVo> {
        return this.http.put<EtatCarteVo>(this.API, this.selectedEtatCarte);
    }


     public findByCriteria(etatCarte:EtatCarteVo):Observable<Array<EtatCarteVo>>{
           return this.http.post<Array<EtatCarteVo>>(this.API +'search', etatCarte);
    }

   public findByIdWithAssociatedList(etatCarte:EtatCarteVo):Observable<EtatCarteVo>{
         return this.http.get<EtatCarteVo>(this.API + 'detail/id/' +etatCarte.id);
    }

    // getters and setters


    get etatCartes(): Array<EtatCarteVo> {
    if(this._etatCartes==null){
    this._etatCartes=new Array<EtatCarteVo>();
    }
return this._etatCartes;
       }

    set etatCartes(value: Array<EtatCarteVo>) {
        this._etatCartes = value;
       }

    get selectedEtatCarte(): EtatCarteVo {
    if(this._selectedEtatCarte==null){
    this._selectedEtatCarte=new EtatCarteVo();
    }
           return this._selectedEtatCarte;
       }

    set selectedEtatCarte(value: EtatCarteVo) {
        this._selectedEtatCarte = value;
       }

    get etatCarteSelections(): Array<EtatCarteVo> {
    if(this._etatCarteSelections==null){
    this._etatCarteSelections=new Array<EtatCarteVo>();
    }
        return this._etatCarteSelections;
       }


    set etatCarteSelections(value: Array<EtatCarteVo>) {
        this._etatCarteSelections = value;
       }

    get createEtatCarteDialog(): boolean {
        return this._createEtatCarteDialog;
       }

    set createEtatCarteDialog(value: boolean) {
        this._createEtatCarteDialog = value;
       }

    get editEtatCarteDialog(): boolean {
        return this._editEtatCarteDialog;
       }

    set editEtatCarteDialog(value: boolean) {
        this._editEtatCarteDialog = value;
       }

    get viewEtatCarteDialog(): boolean {
        return this._viewEtatCarteDialog;
       }

    set viewEtatCarteDialog(value: boolean) {
        this._viewEtatCarteDialog = value;
       }

     get searchEtatCarte(): EtatCarteVo {
     if(this._searchEtatCarte==null){
    this._searchEtatCarte=new EtatCarteVo();
    }
        return this._searchEtatCarte;
    }

    set searchEtatCarte(value: EtatCarteVo) {
        this._searchEtatCarte = value;
       }

}
