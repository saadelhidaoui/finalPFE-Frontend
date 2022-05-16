import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ImpressionCarteVo} from '../model/ImpressionCarte.model';


@Injectable({
  providedIn: 'root'
})
export class ImpressionCarteService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/impressionCarte/';
        })
    }
     private _impressionCartes: Array<ImpressionCarteVo> ;
     private _selectedImpressionCarte: ImpressionCarteVo;
     private _impressionCarteSelections: Array<ImpressionCarteVo>;
     private _createImpressionCarteDialog: boolean;
     private _editImpressionCarteDialog: boolean;
     private _viewImpressionCarteDialog: boolean;
     public editImpressionCarte$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchImpressionCarte:ImpressionCarteVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ImpressionCarteVo>>(this.API);
    }

    public save(): Observable<ImpressionCarteVo> {
           return this.http.post<ImpressionCarteVo>(this.API, {...this.selectedImpressionCarte,dateNaissance: moment(this.selectedImpressionCarte.dateNaissance).format("YYYY-MM-DD")});
    }

    delete(impressionCarte: ImpressionCarteVo) {
         return this.http.delete<number>(this.API + 'id/' + impressionCarte.id);
    }


    public edit(): Observable<ImpressionCarteVo> {
        return this.http.put<ImpressionCarteVo>(this.API, this.selectedImpressionCarte);
    }


     public findByCriteria(impressionCarte:ImpressionCarteVo):Observable<Array<ImpressionCarteVo>>{
           return this.http.post<Array<ImpressionCarteVo>>(this.API +'search', impressionCarte);
    }

   public findByIdWithAssociatedList(impressionCarte:ImpressionCarteVo):Observable<ImpressionCarteVo>{
         return this.http.get<ImpressionCarteVo>(this.API + 'detail/id/' +impressionCarte.id);
    }

    // getters and setters


    get impressionCartes(): Array<ImpressionCarteVo> {
    if(this._impressionCartes==null){
    this._impressionCartes=new Array<ImpressionCarteVo>();
    }
return this._impressionCartes;
       }

    set impressionCartes(value: Array<ImpressionCarteVo>) {
        this._impressionCartes = value;
       }

    get selectedImpressionCarte(): ImpressionCarteVo {
    if(this._selectedImpressionCarte==null){
    this._selectedImpressionCarte=new ImpressionCarteVo();
    }
           return this._selectedImpressionCarte;
       }

    set selectedImpressionCarte(value: ImpressionCarteVo) {
        this._selectedImpressionCarte = value;
       }

    get impressionCarteSelections(): Array<ImpressionCarteVo> {
    if(this._impressionCarteSelections==null){
    this._impressionCarteSelections=new Array<ImpressionCarteVo>();
    }
        return this._impressionCarteSelections;
       }


    set impressionCarteSelections(value: Array<ImpressionCarteVo>) {
        this._impressionCarteSelections = value;
       }

    get createImpressionCarteDialog(): boolean {
        return this._createImpressionCarteDialog;
       }

    set createImpressionCarteDialog(value: boolean) {
        this._createImpressionCarteDialog = value;
       }

    get editImpressionCarteDialog(): boolean {
        return this._editImpressionCarteDialog;
       }

    set editImpressionCarteDialog(value: boolean) {
        this._editImpressionCarteDialog = value;
       }

    get viewImpressionCarteDialog(): boolean {
        return this._viewImpressionCarteDialog;
       }

    set viewImpressionCarteDialog(value: boolean) {
        this._viewImpressionCarteDialog = value;
       }

     get searchImpressionCarte(): ImpressionCarteVo {
     if(this._searchImpressionCarte==null){
    this._searchImpressionCarte=new ImpressionCarteVo();
    }
        return this._searchImpressionCarte;
    }

    set searchImpressionCarte(value: ImpressionCarteVo) {
        this._searchImpressionCarte = value;
       }

}
