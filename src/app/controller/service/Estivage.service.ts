import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EstivageVo} from '../model/Estivage.model';
import {CentreEstivageVo} from '../model/CentreEstivage.model';
import {NiveauImportanceVo} from '../model/NiveauImportance.model';


@Injectable({
  providedIn: 'root'
})
export class EstivageService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/estivage/';
        })
    }
     private _estivages: Array<EstivageVo> ;
     private _selectedEstivage: EstivageVo;
     private _estivageSelections: Array<EstivageVo>;
     private _createEstivageDialog: boolean;
     private _editEstivageDialog: boolean;
     private _viewEstivageDialog: boolean;
     public editEstivage$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEstivage:EstivageVo ;

    // methods
    public archiver(estivage: EstivageVo): Observable<EstivageVo> {
        return this.http.put<EstivageVo>(this.API + 'archiver/' ,estivage);
    }
    public desarchiver(estivage: EstivageVo): Observable<EstivageVo> {
    return this.http.put<EstivageVo>(this.API + 'desarchiver/' ,estivage);
    }

    public findAll(){
     return this.http.get<Array<EstivageVo>>(this.API);
    }

    public save(): Observable<EstivageVo> {
           return this.http.post<EstivageVo>(this.API, {...this.selectedEstivage,dateCreation: moment(this.selectedEstivage.dateCreation).format("YYYY-MM-DD")});
    }

    delete(estivage: EstivageVo) {
         return this.http.delete<number>(this.API + 'id/' + estivage.id);
    }


    public edit(): Observable<EstivageVo> {
        return this.http.put<EstivageVo>(this.API, this.selectedEstivage);
    }


     public findByCriteria(estivage:EstivageVo):Observable<Array<EstivageVo>>{
           return this.http.post<Array<EstivageVo>>(this.API +'search', estivage);
    }

   public findByIdWithAssociatedList(estivage:EstivageVo):Observable<EstivageVo>{
         return this.http.get<EstivageVo>(this.API + 'detail/id/' +estivage.id);
    }

    // getters and setters


    get estivages(): Array<EstivageVo> {
    if(this._estivages==null){
    this._estivages=new Array<EstivageVo>();
    }
return this._estivages;
       }

    set estivages(value: Array<EstivageVo>) {
        this._estivages = value;
       }

    get selectedEstivage(): EstivageVo {
    if(this._selectedEstivage==null){
    this._selectedEstivage=new EstivageVo();
    }
           return this._selectedEstivage;
       }

    set selectedEstivage(value: EstivageVo) {
        this._selectedEstivage = value;
       }

    get estivageSelections(): Array<EstivageVo> {
    if(this._estivageSelections==null){
    this._estivageSelections=new Array<EstivageVo>();
    }
        return this._estivageSelections;
       }


    set estivageSelections(value: Array<EstivageVo>) {
        this._estivageSelections = value;
       }

    get createEstivageDialog(): boolean {
        return this._createEstivageDialog;
       }

    set createEstivageDialog(value: boolean) {
        this._createEstivageDialog = value;
       }

    get editEstivageDialog(): boolean {
        return this._editEstivageDialog;
       }

    set editEstivageDialog(value: boolean) {
        this._editEstivageDialog = value;
       }

    get viewEstivageDialog(): boolean {
        return this._viewEstivageDialog;
       }

    set viewEstivageDialog(value: boolean) {
        this._viewEstivageDialog = value;
       }

     get searchEstivage(): EstivageVo {
     if(this._searchEstivage==null){
    this._searchEstivage=new EstivageVo();
    }
        return this._searchEstivage;
    }

    set searchEstivage(value: EstivageVo) {
        this._searchEstivage = value;
       }

}
