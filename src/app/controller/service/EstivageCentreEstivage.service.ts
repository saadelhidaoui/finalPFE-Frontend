import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EstivageCentreEstivageVo} from '../model/EstivageCentreEstivage.model';
import {CentreEstivageVo} from '../model/CentreEstivage.model';
import {EstivageVo} from '../model/Estivage.model';


@Injectable({
  providedIn: 'root'
})
export class EstivageCentreEstivageService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/estivageCentreEstivage/';
        })
    }
     private _estivageCentreEstivages: Array<EstivageCentreEstivageVo> ;
     private _selectedEstivageCentreEstivage: EstivageCentreEstivageVo;
     private _estivageCentreEstivageSelections: Array<EstivageCentreEstivageVo>;
     private _createEstivageCentreEstivageDialog: boolean;
     private _editEstivageCentreEstivageDialog: boolean;
     private _viewEstivageCentreEstivageDialog: boolean;
     public editEstivageCentreEstivage$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEstivageCentreEstivage:EstivageCentreEstivageVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EstivageCentreEstivageVo>>(this.API);
    }

    public save(): Observable<EstivageCentreEstivageVo> {
         return this.http.post<EstivageCentreEstivageVo>(this.API, this.selectedEstivageCentreEstivage);
    }

    delete(estivageCentreEstivage: EstivageCentreEstivageVo) {
         return this.http.delete<number>(this.API + 'id/' + estivageCentreEstivage.id);
    }


    public edit(): Observable<EstivageCentreEstivageVo> {
        return this.http.put<EstivageCentreEstivageVo>(this.API, this.selectedEstivageCentreEstivage);
    }


     public findByCriteria(estivageCentreEstivage:EstivageCentreEstivageVo):Observable<Array<EstivageCentreEstivageVo>>{
           return this.http.post<Array<EstivageCentreEstivageVo>>(this.API +'search', estivageCentreEstivage);
    }

   public findByIdWithAssociatedList(estivageCentreEstivage:EstivageCentreEstivageVo):Observable<EstivageCentreEstivageVo>{
         return this.http.get<EstivageCentreEstivageVo>(this.API + 'detail/id/' +estivageCentreEstivage.id);
    }

    // getters and setters


    get estivageCentreEstivages(): Array<EstivageCentreEstivageVo> {
    if(this._estivageCentreEstivages==null){
    this._estivageCentreEstivages=new Array<EstivageCentreEstivageVo>();
    }
return this._estivageCentreEstivages;
       }

    set estivageCentreEstivages(value: Array<EstivageCentreEstivageVo>) {
        this._estivageCentreEstivages = value;
       }

    get selectedEstivageCentreEstivage(): EstivageCentreEstivageVo {
    if(this._selectedEstivageCentreEstivage==null){
    this._selectedEstivageCentreEstivage=new EstivageCentreEstivageVo();
    }
           return this._selectedEstivageCentreEstivage;
       }

    set selectedEstivageCentreEstivage(value: EstivageCentreEstivageVo) {
        this._selectedEstivageCentreEstivage = value;
       }

    get estivageCentreEstivageSelections(): Array<EstivageCentreEstivageVo> {
    if(this._estivageCentreEstivageSelections==null){
    this._estivageCentreEstivageSelections=new Array<EstivageCentreEstivageVo>();
    }
        return this._estivageCentreEstivageSelections;
       }


    set estivageCentreEstivageSelections(value: Array<EstivageCentreEstivageVo>) {
        this._estivageCentreEstivageSelections = value;
       }

    get createEstivageCentreEstivageDialog(): boolean {
        return this._createEstivageCentreEstivageDialog;
       }

    set createEstivageCentreEstivageDialog(value: boolean) {
        this._createEstivageCentreEstivageDialog = value;
       }

    get editEstivageCentreEstivageDialog(): boolean {
        return this._editEstivageCentreEstivageDialog;
       }

    set editEstivageCentreEstivageDialog(value: boolean) {
        this._editEstivageCentreEstivageDialog = value;
       }

    get viewEstivageCentreEstivageDialog(): boolean {
        return this._viewEstivageCentreEstivageDialog;
       }

    set viewEstivageCentreEstivageDialog(value: boolean) {
        this._viewEstivageCentreEstivageDialog = value;
       }

     get searchEstivageCentreEstivage(): EstivageCentreEstivageVo {
     if(this._searchEstivageCentreEstivage==null){
    this._searchEstivageCentreEstivage=new EstivageCentreEstivageVo();
    }
        return this._searchEstivageCentreEstivage;
    }

    set searchEstivageCentreEstivage(value: EstivageCentreEstivageVo) {
        this._searchEstivageCentreEstivage = value;
       }

}
