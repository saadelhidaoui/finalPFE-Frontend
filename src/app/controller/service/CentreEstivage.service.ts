import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CentreEstivageVo} from '../model/CentreEstivage.model';
import {VilleVo} from '../model/Ville.model';


@Injectable({
  providedIn: 'root'
})
export class CentreEstivageService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/centreEstivage/';
        })
    }
     private _centreEstivages: Array<CentreEstivageVo> ;
     private _selectedCentreEstivage: CentreEstivageVo;
     private _centreEstivageSelections: Array<CentreEstivageVo>;
     private _createCentreEstivageDialog: boolean;
     private _editCentreEstivageDialog: boolean;
     private _viewCentreEstivageDialog: boolean;
     public editCentreEstivage$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCentreEstivage:CentreEstivageVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CentreEstivageVo>>(this.API);
    }

    public save(): Observable<CentreEstivageVo> {
         return this.http.post<CentreEstivageVo>(this.API, this.selectedCentreEstivage);
    }

    delete(centreEstivage: CentreEstivageVo) {
         return this.http.delete<number>(this.API + 'id/' + centreEstivage.id);
    }


    public edit(): Observable<CentreEstivageVo> {
        return this.http.put<CentreEstivageVo>(this.API, this.selectedCentreEstivage);
    }


     public findByCriteria(centreEstivage:CentreEstivageVo):Observable<Array<CentreEstivageVo>>{
           return this.http.post<Array<CentreEstivageVo>>(this.API +'search', centreEstivage);
    }

   public findByIdWithAssociatedList(centreEstivage:CentreEstivageVo):Observable<CentreEstivageVo>{
         return this.http.get<CentreEstivageVo>(this.API + 'detail/id/' +centreEstivage.id);
    }

    // getters and setters


    get centreEstivages(): Array<CentreEstivageVo> {
    if(this._centreEstivages==null){
    this._centreEstivages=new Array<CentreEstivageVo>();
    }
return this._centreEstivages;
       }

    set centreEstivages(value: Array<CentreEstivageVo>) {
        this._centreEstivages = value;
       }

    get selectedCentreEstivage(): CentreEstivageVo {
    if(this._selectedCentreEstivage==null){
    this._selectedCentreEstivage=new CentreEstivageVo();
    }
           return this._selectedCentreEstivage;
       }

    set selectedCentreEstivage(value: CentreEstivageVo) {
        this._selectedCentreEstivage = value;
       }

    get centreEstivageSelections(): Array<CentreEstivageVo> {
    if(this._centreEstivageSelections==null){
    this._centreEstivageSelections=new Array<CentreEstivageVo>();
    }
        return this._centreEstivageSelections;
       }


    set centreEstivageSelections(value: Array<CentreEstivageVo>) {
        this._centreEstivageSelections = value;
       }

    get createCentreEstivageDialog(): boolean {
        return this._createCentreEstivageDialog;
       }

    set createCentreEstivageDialog(value: boolean) {
        this._createCentreEstivageDialog = value;
       }

    get editCentreEstivageDialog(): boolean {
        return this._editCentreEstivageDialog;
       }

    set editCentreEstivageDialog(value: boolean) {
        this._editCentreEstivageDialog = value;
       }

    get viewCentreEstivageDialog(): boolean {
        return this._viewCentreEstivageDialog;
       }

    set viewCentreEstivageDialog(value: boolean) {
        this._viewCentreEstivageDialog = value;
       }

     get searchCentreEstivage(): CentreEstivageVo {
     if(this._searchCentreEstivage==null){
    this._searchCentreEstivage=new CentreEstivageVo();
    }
        return this._searchCentreEstivage;
    }

    set searchCentreEstivage(value: CentreEstivageVo) {
        this._searchCentreEstivage = value;
       }

}
