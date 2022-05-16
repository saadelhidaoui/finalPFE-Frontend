import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ModerateurVo} from '../model/Moderateur.model';
import {ProfilVo} from '../model/Profil.model';
import {SituationModerateurVo} from '../model/SituationModerateur.model';
import {MissionVo} from '../model/Mission.model';
import {TacheVo} from '../model/Tache.model';


@Injectable({
  providedIn: 'root'
})
export class ModerateurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/moderateur/';
        })
    }
     private _moderateurs: Array<ModerateurVo> ;
     private _selectedModerateur: ModerateurVo;
     private _moderateurSelections: Array<ModerateurVo>;
     private _createModerateurDialog: boolean;
     private _editModerateurDialog: boolean;
     private _viewModerateurDialog: boolean;
     public editModerateur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchModerateur:ModerateurVo ;
     private _switchChercheurDialog: boolean;

    // methods

    public findAll(){
     return this.http.get<Array<ModerateurVo>>(this.API);
    }

    public save(): Observable<ModerateurVo> {
           return this.http.post<ModerateurVo>(this.API, {...this.selectedModerateur,updatedAt: moment(this.selectedModerateur.updatedAt).format("YYYY-MM-DD")});
    }

    delete(moderateur: ModerateurVo) {
         return this.http.delete<number>(this.API + 'id/' + moderateur.id);
    }


    public edit(): Observable<ModerateurVo> {
        return this.http.put<ModerateurVo>(this.API, this.selectedModerateur);
    }


     public findByCriteria(moderateur:ModerateurVo):Observable<Array<ModerateurVo>>{
           return this.http.post<Array<ModerateurVo>>(this.API +'search', moderateur);
    }

   public findByIdWithAssociatedList(moderateur:ModerateurVo):Observable<ModerateurVo>{
         return this.http.get<ModerateurVo>(this.API + 'detail/id/' +moderateur.id);
    }

    // getters and setters


    get moderateurs(): Array<ModerateurVo> {
    if(this._moderateurs==null){
    this._moderateurs=new Array<ModerateurVo>();
    }
return this._moderateurs;
       }

    set moderateurs(value: Array<ModerateurVo>) {
        this._moderateurs = value;
       }

    get selectedModerateur(): ModerateurVo {
    if(this._selectedModerateur==null){
    this._selectedModerateur=new ModerateurVo();
    }
           return this._selectedModerateur;
       }

    set selectedModerateur(value: ModerateurVo) {
        this._selectedModerateur = value;
       }

    get moderateurSelections(): Array<ModerateurVo> {
    if(this._moderateurSelections==null){
    this._moderateurSelections=new Array<ModerateurVo>();
    }
        return this._moderateurSelections;
       }


    set moderateurSelections(value: Array<ModerateurVo>) {
        this._moderateurSelections = value;
       }

    get createModerateurDialog(): boolean {
        return this._createModerateurDialog;
       }

    set createModerateurDialog(value: boolean) {
        this._createModerateurDialog = value;
       }

    get editModerateurDialog(): boolean {
        return this._editModerateurDialog;
       }

    set editModerateurDialog(value: boolean) {
        this._editModerateurDialog = value;
       }

    get viewModerateurDialog(): boolean {
        return this._viewModerateurDialog;
       }

    set viewModerateurDialog(value: boolean) {
        this._viewModerateurDialog = value;
       }

     get searchModerateur(): ModerateurVo {
     if(this._searchModerateur==null){
    this._searchModerateur=new ModerateurVo();
    }
        return this._searchModerateur;
    }

    set searchModerateur(value: ModerateurVo) {
        this._searchModerateur = value;
       }

   get switchChercheurDialog(): boolean {
    return this._switchChercheurDialog;
    }

    set switchChercheurDialog(value: boolean) {
    this._switchChercheurDialog = value;
    }
}
