import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OrganismeVo} from '../model/Organisme.model';
import {VilleVo} from '../model/Ville.model';


@Injectable({
  providedIn: 'root'
})
export class OrganismeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/organisme/';
        })
    }
     private _organismes: Array<OrganismeVo> ;
     private _selectedOrganisme: OrganismeVo;
     private _organismeSelections: Array<OrganismeVo>;
     private _createOrganismeDialog: boolean;
     private _editOrganismeDialog: boolean;
     private _viewOrganismeDialog: boolean;
     public editOrganisme$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOrganisme:OrganismeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OrganismeVo>>(this.API);
    }

    public save(): Observable<OrganismeVo> {
         return this.http.post<OrganismeVo>(this.API, this.selectedOrganisme);
    }

    delete(organisme: OrganismeVo) {
         return this.http.delete<number>(this.API + 'id/' + organisme.id);
    }


    public edit(): Observable<OrganismeVo> {
        return this.http.put<OrganismeVo>(this.API, this.selectedOrganisme);
    }


     public findByCriteria(organisme:OrganismeVo):Observable<Array<OrganismeVo>>{
           return this.http.post<Array<OrganismeVo>>(this.API +'search', organisme);
    }

   public findByIdWithAssociatedList(organisme:OrganismeVo):Observable<OrganismeVo>{
         return this.http.get<OrganismeVo>(this.API + 'detail/id/' +organisme.id);
    }

    // getters and setters


    get organismes(): Array<OrganismeVo> {
    if(this._organismes==null){
    this._organismes=new Array<OrganismeVo>();
    }
return this._organismes;
       }

    set organismes(value: Array<OrganismeVo>) {
        this._organismes = value;
       }

    get selectedOrganisme(): OrganismeVo {
    if(this._selectedOrganisme==null){
    this._selectedOrganisme=new OrganismeVo();
    }
           return this._selectedOrganisme;
       }

    set selectedOrganisme(value: OrganismeVo) {
        this._selectedOrganisme = value;
       }

    get organismeSelections(): Array<OrganismeVo> {
    if(this._organismeSelections==null){
    this._organismeSelections=new Array<OrganismeVo>();
    }
        return this._organismeSelections;
       }


    set organismeSelections(value: Array<OrganismeVo>) {
        this._organismeSelections = value;
       }

    get createOrganismeDialog(): boolean {
        return this._createOrganismeDialog;
       }

    set createOrganismeDialog(value: boolean) {
        this._createOrganismeDialog = value;
       }

    get editOrganismeDialog(): boolean {
        return this._editOrganismeDialog;
       }

    set editOrganismeDialog(value: boolean) {
        this._editOrganismeDialog = value;
       }

    get viewOrganismeDialog(): boolean {
        return this._viewOrganismeDialog;
       }

    set viewOrganismeDialog(value: boolean) {
        this._viewOrganismeDialog = value;
       }

     get searchOrganisme(): OrganismeVo {
     if(this._searchOrganisme==null){
    this._searchOrganisme=new OrganismeVo();
    }
        return this._searchOrganisme;
    }

    set searchOrganisme(value: OrganismeVo) {
        this._searchOrganisme = value;
       }

}
