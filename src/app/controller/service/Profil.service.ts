import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProfilVo} from '../model/Profil.model';
import {GradeVo} from '../model/Grade.model';
import {EchelleVo} from '../model/Echelle.model';


@Injectable({
  providedIn: 'root'
})
export class ProfilService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/profil/';
        })
    }
     private _profils: Array<ProfilVo> ;
     private _selectedProfil: ProfilVo;
     private _profilSelections: Array<ProfilVo>;
     private _createProfilDialog: boolean;
     private _editProfilDialog: boolean;
     private _viewProfilDialog: boolean;
     public editProfil$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProfil:ProfilVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ProfilVo>>(this.API);
    }

    public save(): Observable<ProfilVo> {
         return this.http.post<ProfilVo>(this.API, this.selectedProfil);
    }

    delete(profil: ProfilVo) {
         return this.http.delete<number>(this.API + 'id/' + profil.id);
    }


    public edit(): Observable<ProfilVo> {
        return this.http.put<ProfilVo>(this.API, this.selectedProfil);
    }


     public findByCriteria(profil:ProfilVo):Observable<Array<ProfilVo>>{
           return this.http.post<Array<ProfilVo>>(this.API +'search', profil);
    }

   public findByIdWithAssociatedList(profil:ProfilVo):Observable<ProfilVo>{
         return this.http.get<ProfilVo>(this.API + 'detail/id/' +profil.id);
    }

    // getters and setters


    get profils(): Array<ProfilVo> {
    if(this._profils==null){
    this._profils=new Array<ProfilVo>();
    }
return this._profils;
       }

    set profils(value: Array<ProfilVo>) {
        this._profils = value;
       }

    get selectedProfil(): ProfilVo {
    if(this._selectedProfil==null){
    this._selectedProfil=new ProfilVo();
    }
           return this._selectedProfil;
       }

    set selectedProfil(value: ProfilVo) {
        this._selectedProfil = value;
       }

    get profilSelections(): Array<ProfilVo> {
    if(this._profilSelections==null){
    this._profilSelections=new Array<ProfilVo>();
    }
        return this._profilSelections;
       }


    set profilSelections(value: Array<ProfilVo>) {
        this._profilSelections = value;
       }

    get createProfilDialog(): boolean {
        return this._createProfilDialog;
       }

    set createProfilDialog(value: boolean) {
        this._createProfilDialog = value;
       }

    get editProfilDialog(): boolean {
        return this._editProfilDialog;
       }

    set editProfilDialog(value: boolean) {
        this._editProfilDialog = value;
       }

    get viewProfilDialog(): boolean {
        return this._viewProfilDialog;
       }

    set viewProfilDialog(value: boolean) {
        this._viewProfilDialog = value;
       }

     get searchProfil(): ProfilVo {
     if(this._searchProfil==null){
    this._searchProfil=new ProfilVo();
    }
        return this._searchProfil;
    }

    set searchProfil(value: ProfilVo) {
        this._searchProfil = value;
       }

}
