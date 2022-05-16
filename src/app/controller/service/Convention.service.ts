import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ConventionVo} from '../model/Convention.model';
import {OrganismeVo} from '../model/Organisme.model';
import {PieceJointeConventionVo} from '../model/PieceJointeConvention.model';


@Injectable({
  providedIn: 'root'
})
export class ConventionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/convention/';
        })
    }
     private _conventions: Array<ConventionVo> ;
     private _selectedConvention: ConventionVo;
     private _conventionSelections: Array<ConventionVo>;
     private _createConventionDialog: boolean;
     private _editConventionDialog: boolean;
     private _viewConventionDialog: boolean;
     public editConvention$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchConvention:ConventionVo ;

    // methods
    public archiver(convention: ConventionVo): Observable<ConventionVo> {
        return this.http.put<ConventionVo>(this.API + 'archiver/' ,convention);
    }
    public desarchiver(convention: ConventionVo): Observable<ConventionVo> {
    return this.http.put<ConventionVo>(this.API + 'desarchiver/' ,convention);
    }

    public findAll(){
     return this.http.get<Array<ConventionVo>>(this.API);
    }

    public save(): Observable<ConventionVo> {
           return this.http.post<ConventionVo>(this.API, {...this.selectedConvention,dateCreation: moment(this.selectedConvention.dateCreation).format("YYYY-MM-DD")});
    }

    delete(convention: ConventionVo) {
         return this.http.delete<number>(this.API + 'id/' + convention.id);
    }


    public edit(): Observable<ConventionVo> {
        return this.http.put<ConventionVo>(this.API, this.selectedConvention);
    }


     public findByCriteria(convention:ConventionVo):Observable<Array<ConventionVo>>{
           return this.http.post<Array<ConventionVo>>(this.API +'search', convention);
    }

   public findByIdWithAssociatedList(convention:ConventionVo):Observable<ConventionVo>{
         return this.http.get<ConventionVo>(this.API + 'detail/id/' +convention.id);
    }

    // getters and setters


    get conventions(): Array<ConventionVo> {
    if(this._conventions==null){
    this._conventions=new Array<ConventionVo>();
    }
return this._conventions;
       }

    set conventions(value: Array<ConventionVo>) {
        this._conventions = value;
       }

    get selectedConvention(): ConventionVo {
    if(this._selectedConvention==null){
    this._selectedConvention=new ConventionVo();
    }
           return this._selectedConvention;
       }

    set selectedConvention(value: ConventionVo) {
        this._selectedConvention = value;
       }

    get conventionSelections(): Array<ConventionVo> {
    if(this._conventionSelections==null){
    this._conventionSelections=new Array<ConventionVo>();
    }
        return this._conventionSelections;
       }


    set conventionSelections(value: Array<ConventionVo>) {
        this._conventionSelections = value;
       }

    get createConventionDialog(): boolean {
        return this._createConventionDialog;
       }

    set createConventionDialog(value: boolean) {
        this._createConventionDialog = value;
       }

    get editConventionDialog(): boolean {
        return this._editConventionDialog;
       }

    set editConventionDialog(value: boolean) {
        this._editConventionDialog = value;
       }

    get viewConventionDialog(): boolean {
        return this._viewConventionDialog;
       }

    set viewConventionDialog(value: boolean) {
        this._viewConventionDialog = value;
       }

     get searchConvention(): ConventionVo {
     if(this._searchConvention==null){
    this._searchConvention=new ConventionVo();
    }
        return this._searchConvention;
    }

    set searchConvention(value: ConventionVo) {
        this._searchConvention = value;
       }

}
