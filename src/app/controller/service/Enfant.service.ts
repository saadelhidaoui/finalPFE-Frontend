import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnfantVo} from '../model/Enfant.model';
import {AdherentVo} from '../model/Adherent.model';
import {QualiteVo} from '../model/Qualite.model';


@Injectable({
  providedIn: 'root'
})
export class EnfantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enfant/';
        })
    }
     private _enfants: Array<EnfantVo> ;
     private _selectedEnfant: EnfantVo;
     private _enfantSelections: Array<EnfantVo>;
     private _createEnfantDialog: boolean;
     private _editEnfantDialog: boolean;
     private _viewEnfantDialog: boolean;
     public editEnfant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnfant:EnfantVo ;

    // methods
    public archiver(enfant: EnfantVo): Observable<EnfantVo> {
        return this.http.put<EnfantVo>(this.API + 'archiver/' ,enfant);
    }
    public desarchiver(enfant: EnfantVo): Observable<EnfantVo> {
    return this.http.put<EnfantVo>(this.API + 'desarchiver/' ,enfant);
    }

    public findAll(){
     return this.http.get<Array<EnfantVo>>(this.API);
    }

    public save(): Observable<EnfantVo> {
           return this.http.post<EnfantVo>(this.API, {...this.selectedEnfant,dateCreation: moment(this.selectedEnfant.dateCreation).format("YYYY-MM-DD")});
    }

    delete(enfant: EnfantVo) {
         return this.http.delete<number>(this.API + 'id/' + enfant.id);
    }


    public edit(): Observable<EnfantVo> {
        return this.http.put<EnfantVo>(this.API, this.selectedEnfant);
    }


     public findByCriteria(enfant:EnfantVo):Observable<Array<EnfantVo>>{
           return this.http.post<Array<EnfantVo>>(this.API +'search', enfant);
    }

   public findByIdWithAssociatedList(enfant:EnfantVo):Observable<EnfantVo>{
         return this.http.get<EnfantVo>(this.API + 'detail/id/' +enfant.id);
    }

    // getters and setters


    get enfants(): Array<EnfantVo> {
    if(this._enfants==null){
    this._enfants=new Array<EnfantVo>();
    }
return this._enfants;
       }

    set enfants(value: Array<EnfantVo>) {
        this._enfants = value;
       }

    get selectedEnfant(): EnfantVo {
    if(this._selectedEnfant==null){
    this._selectedEnfant=new EnfantVo();
    }
           return this._selectedEnfant;
       }

    set selectedEnfant(value: EnfantVo) {
        this._selectedEnfant = value;
       }

    get enfantSelections(): Array<EnfantVo> {
    if(this._enfantSelections==null){
    this._enfantSelections=new Array<EnfantVo>();
    }
        return this._enfantSelections;
       }


    set enfantSelections(value: Array<EnfantVo>) {
        this._enfantSelections = value;
       }

    get createEnfantDialog(): boolean {
        return this._createEnfantDialog;
       }

    set createEnfantDialog(value: boolean) {
        this._createEnfantDialog = value;
       }

    get editEnfantDialog(): boolean {
        return this._editEnfantDialog;
       }

    set editEnfantDialog(value: boolean) {
        this._editEnfantDialog = value;
       }

    get viewEnfantDialog(): boolean {
        return this._viewEnfantDialog;
       }

    set viewEnfantDialog(value: boolean) {
        this._viewEnfantDialog = value;
       }

     get searchEnfant(): EnfantVo {
     if(this._searchEnfant==null){
    this._searchEnfant=new EnfantVo();
    }
        return this._searchEnfant;
    }

    set searchEnfant(value: EnfantVo) {
        this._searchEnfant = value;
       }

}
