import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypePrestationVo} from '../model/TypePrestation.model';


@Injectable({
  providedIn: 'root'
})
export class TypePrestationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typePrestation/';
        })
    }
     private _typePrestations: Array<TypePrestationVo> ;
     private _selectedTypePrestation: TypePrestationVo;
     private _typePrestationSelections: Array<TypePrestationVo>;
     private _createTypePrestationDialog: boolean;
     private _editTypePrestationDialog: boolean;
     private _viewTypePrestationDialog: boolean;
     public editTypePrestation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypePrestation:TypePrestationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypePrestationVo>>(this.API);
    }

    public save(): Observable<TypePrestationVo> {
         return this.http.post<TypePrestationVo>(this.API, this.selectedTypePrestation);
    }

    delete(typePrestation: TypePrestationVo) {
         return this.http.delete<number>(this.API + 'id/' + typePrestation.id);
    }


    public edit(): Observable<TypePrestationVo> {
        return this.http.put<TypePrestationVo>(this.API, this.selectedTypePrestation);
    }


     public findByCriteria(typePrestation:TypePrestationVo):Observable<Array<TypePrestationVo>>{
           return this.http.post<Array<TypePrestationVo>>(this.API +'search', typePrestation);
    }

   public findByIdWithAssociatedList(typePrestation:TypePrestationVo):Observable<TypePrestationVo>{
         return this.http.get<TypePrestationVo>(this.API + 'detail/id/' +typePrestation.id);
    }

    // getters and setters


    get typePrestations(): Array<TypePrestationVo> {
    if(this._typePrestations==null){
    this._typePrestations=new Array<TypePrestationVo>();
    }
return this._typePrestations;
       }

    set typePrestations(value: Array<TypePrestationVo>) {
        this._typePrestations = value;
       }

    get selectedTypePrestation(): TypePrestationVo {
    if(this._selectedTypePrestation==null){
    this._selectedTypePrestation=new TypePrestationVo();
    }
           return this._selectedTypePrestation;
       }

    set selectedTypePrestation(value: TypePrestationVo) {
        this._selectedTypePrestation = value;
       }

    get typePrestationSelections(): Array<TypePrestationVo> {
    if(this._typePrestationSelections==null){
    this._typePrestationSelections=new Array<TypePrestationVo>();
    }
        return this._typePrestationSelections;
       }


    set typePrestationSelections(value: Array<TypePrestationVo>) {
        this._typePrestationSelections = value;
       }

    get createTypePrestationDialog(): boolean {
        return this._createTypePrestationDialog;
       }

    set createTypePrestationDialog(value: boolean) {
        this._createTypePrestationDialog = value;
       }

    get editTypePrestationDialog(): boolean {
        return this._editTypePrestationDialog;
       }

    set editTypePrestationDialog(value: boolean) {
        this._editTypePrestationDialog = value;
       }

    get viewTypePrestationDialog(): boolean {
        return this._viewTypePrestationDialog;
       }

    set viewTypePrestationDialog(value: boolean) {
        this._viewTypePrestationDialog = value;
       }

     get searchTypePrestation(): TypePrestationVo {
     if(this._searchTypePrestation==null){
    this._searchTypePrestation=new TypePrestationVo();
    }
        return this._searchTypePrestation;
    }

    set searchTypePrestation(value: TypePrestationVo) {
        this._searchTypePrestation = value;
       }

}
