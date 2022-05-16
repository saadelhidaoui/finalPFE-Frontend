import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {SituationModerateurVo} from '../model/SituationModerateur.model';


@Injectable({
  providedIn: 'root'
})
export class SituationModerateurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/situationModerateur/';
        })
    }
     private _situationModerateurs: Array<SituationModerateurVo> ;
     private _selectedSituationModerateur: SituationModerateurVo;
     private _situationModerateurSelections: Array<SituationModerateurVo>;
     private _createSituationModerateurDialog: boolean;
     private _editSituationModerateurDialog: boolean;
     private _viewSituationModerateurDialog: boolean;
     public editSituationModerateur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchSituationModerateur:SituationModerateurVo ;

    // methods

    public findAll(){
     return this.http.get<Array<SituationModerateurVo>>(this.API);
    }

    public save(): Observable<SituationModerateurVo> {
         return this.http.post<SituationModerateurVo>(this.API, this.selectedSituationModerateur);
    }

    delete(situationModerateur: SituationModerateurVo) {
         return this.http.delete<number>(this.API + 'id/' + situationModerateur.id);
    }


    public edit(): Observable<SituationModerateurVo> {
        return this.http.put<SituationModerateurVo>(this.API, this.selectedSituationModerateur);
    }


     public findByCriteria(situationModerateur:SituationModerateurVo):Observable<Array<SituationModerateurVo>>{
           return this.http.post<Array<SituationModerateurVo>>(this.API +'search', situationModerateur);
    }

   public findByIdWithAssociatedList(situationModerateur:SituationModerateurVo):Observable<SituationModerateurVo>{
         return this.http.get<SituationModerateurVo>(this.API + 'detail/id/' +situationModerateur.id);
    }

    // getters and setters


    get situationModerateurs(): Array<SituationModerateurVo> {
    if(this._situationModerateurs==null){
    this._situationModerateurs=new Array<SituationModerateurVo>();
    }
return this._situationModerateurs;
       }

    set situationModerateurs(value: Array<SituationModerateurVo>) {
        this._situationModerateurs = value;
       }

    get selectedSituationModerateur(): SituationModerateurVo {
    if(this._selectedSituationModerateur==null){
    this._selectedSituationModerateur=new SituationModerateurVo();
    }
           return this._selectedSituationModerateur;
       }

    set selectedSituationModerateur(value: SituationModerateurVo) {
        this._selectedSituationModerateur = value;
       }

    get situationModerateurSelections(): Array<SituationModerateurVo> {
    if(this._situationModerateurSelections==null){
    this._situationModerateurSelections=new Array<SituationModerateurVo>();
    }
        return this._situationModerateurSelections;
       }


    set situationModerateurSelections(value: Array<SituationModerateurVo>) {
        this._situationModerateurSelections = value;
       }

    get createSituationModerateurDialog(): boolean {
        return this._createSituationModerateurDialog;
       }

    set createSituationModerateurDialog(value: boolean) {
        this._createSituationModerateurDialog = value;
       }

    get editSituationModerateurDialog(): boolean {
        return this._editSituationModerateurDialog;
       }

    set editSituationModerateurDialog(value: boolean) {
        this._editSituationModerateurDialog = value;
       }

    get viewSituationModerateurDialog(): boolean {
        return this._viewSituationModerateurDialog;
       }

    set viewSituationModerateurDialog(value: boolean) {
        this._viewSituationModerateurDialog = value;
       }

     get searchSituationModerateur(): SituationModerateurVo {
     if(this._searchSituationModerateur==null){
    this._searchSituationModerateur=new SituationModerateurVo();
    }
        return this._searchSituationModerateur;
    }

    set searchSituationModerateur(value: SituationModerateurVo) {
        this._searchSituationModerateur = value;
       }

}
