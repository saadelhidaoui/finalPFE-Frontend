import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FonctionVo} from '../model/Fonction.model';


@Injectable({
  providedIn: 'root'
})
export class FonctionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/fonction/';
        })
    }
     private _fonctions: Array<FonctionVo> ;
     private _selectedFonction: FonctionVo;
     private _fonctionSelections: Array<FonctionVo>;
     private _createFonctionDialog: boolean;
     private _editFonctionDialog: boolean;
     private _viewFonctionDialog: boolean;
     public editFonction$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFonction:FonctionVo ;

    // methods

    public findAll(){
     return this.http.get<Array<FonctionVo>>(this.API);
    }

    public save(): Observable<FonctionVo> {
         return this.http.post<FonctionVo>(this.API, this.selectedFonction);
    }

    delete(fonction: FonctionVo) {
         return this.http.delete<number>(this.API + 'id/' + fonction.id);
    }


    public edit(): Observable<FonctionVo> {
        return this.http.put<FonctionVo>(this.API, this.selectedFonction);
    }


     public findByCriteria(fonction:FonctionVo):Observable<Array<FonctionVo>>{
           return this.http.post<Array<FonctionVo>>(this.API +'search', fonction);
    }

   public findByIdWithAssociatedList(fonction:FonctionVo):Observable<FonctionVo>{
         return this.http.get<FonctionVo>(this.API + 'detail/id/' +fonction.id);
    }

    // getters and setters


    get fonctions(): Array<FonctionVo> {
    if(this._fonctions==null){
    this._fonctions=new Array<FonctionVo>();
    }
return this._fonctions;
       }

    set fonctions(value: Array<FonctionVo>) {
        this._fonctions = value;
       }

    get selectedFonction(): FonctionVo {
    if(this._selectedFonction==null){
    this._selectedFonction=new FonctionVo();
    }
           return this._selectedFonction;
       }

    set selectedFonction(value: FonctionVo) {
        this._selectedFonction = value;
       }

    get fonctionSelections(): Array<FonctionVo> {
    if(this._fonctionSelections==null){
    this._fonctionSelections=new Array<FonctionVo>();
    }
        return this._fonctionSelections;
       }


    set fonctionSelections(value: Array<FonctionVo>) {
        this._fonctionSelections = value;
       }

    get createFonctionDialog(): boolean {
        return this._createFonctionDialog;
       }

    set createFonctionDialog(value: boolean) {
        this._createFonctionDialog = value;
       }

    get editFonctionDialog(): boolean {
        return this._editFonctionDialog;
       }

    set editFonctionDialog(value: boolean) {
        this._editFonctionDialog = value;
       }

    get viewFonctionDialog(): boolean {
        return this._viewFonctionDialog;
       }

    set viewFonctionDialog(value: boolean) {
        this._viewFonctionDialog = value;
       }

     get searchFonction(): FonctionVo {
     if(this._searchFonction==null){
    this._searchFonction=new FonctionVo();
    }
        return this._searchFonction;
    }

    set searchFonction(value: FonctionVo) {
        this._searchFonction = value;
       }

}
