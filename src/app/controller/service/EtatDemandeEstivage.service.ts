import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatDemandeEstivageVo} from '../model/EtatDemandeEstivage.model';


@Injectable({
  providedIn: 'root'
})
export class EtatDemandeEstivageService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatDemandeEstivage/';
        })
    }
     private _etatDemandeEstivages: Array<EtatDemandeEstivageVo> ;
     private _selectedEtatDemandeEstivage: EtatDemandeEstivageVo;
     private _etatDemandeEstivageSelections: Array<EtatDemandeEstivageVo>;
     private _createEtatDemandeEstivageDialog: boolean;
     private _editEtatDemandeEstivageDialog: boolean;
     private _viewEtatDemandeEstivageDialog: boolean;
     public editEtatDemandeEstivage$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatDemandeEstivage:EtatDemandeEstivageVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatDemandeEstivageVo>>(this.API);
    }

    public save(): Observable<EtatDemandeEstivageVo> {
         return this.http.post<EtatDemandeEstivageVo>(this.API, this.selectedEtatDemandeEstivage);
    }

    delete(etatDemandeEstivage: EtatDemandeEstivageVo) {
         return this.http.delete<number>(this.API + 'id/' + etatDemandeEstivage.id);
    }


    public edit(): Observable<EtatDemandeEstivageVo> {
        return this.http.put<EtatDemandeEstivageVo>(this.API, this.selectedEtatDemandeEstivage);
    }


     public findByCriteria(etatDemandeEstivage:EtatDemandeEstivageVo):Observable<Array<EtatDemandeEstivageVo>>{
           return this.http.post<Array<EtatDemandeEstivageVo>>(this.API +'search', etatDemandeEstivage);
    }

   public findByIdWithAssociatedList(etatDemandeEstivage:EtatDemandeEstivageVo):Observable<EtatDemandeEstivageVo>{
         return this.http.get<EtatDemandeEstivageVo>(this.API + 'detail/id/' +etatDemandeEstivage.id);
    }

    // getters and setters


    get etatDemandeEstivages(): Array<EtatDemandeEstivageVo> {
    if(this._etatDemandeEstivages==null){
    this._etatDemandeEstivages=new Array<EtatDemandeEstivageVo>();
    }
return this._etatDemandeEstivages;
       }

    set etatDemandeEstivages(value: Array<EtatDemandeEstivageVo>) {
        this._etatDemandeEstivages = value;
       }

    get selectedEtatDemandeEstivage(): EtatDemandeEstivageVo {
    if(this._selectedEtatDemandeEstivage==null){
    this._selectedEtatDemandeEstivage=new EtatDemandeEstivageVo();
    }
           return this._selectedEtatDemandeEstivage;
       }

    set selectedEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this._selectedEtatDemandeEstivage = value;
       }

    get etatDemandeEstivageSelections(): Array<EtatDemandeEstivageVo> {
    if(this._etatDemandeEstivageSelections==null){
    this._etatDemandeEstivageSelections=new Array<EtatDemandeEstivageVo>();
    }
        return this._etatDemandeEstivageSelections;
       }


    set etatDemandeEstivageSelections(value: Array<EtatDemandeEstivageVo>) {
        this._etatDemandeEstivageSelections = value;
       }

    get createEtatDemandeEstivageDialog(): boolean {
        return this._createEtatDemandeEstivageDialog;
       }

    set createEtatDemandeEstivageDialog(value: boolean) {
        this._createEtatDemandeEstivageDialog = value;
       }

    get editEtatDemandeEstivageDialog(): boolean {
        return this._editEtatDemandeEstivageDialog;
       }

    set editEtatDemandeEstivageDialog(value: boolean) {
        this._editEtatDemandeEstivageDialog = value;
       }

    get viewEtatDemandeEstivageDialog(): boolean {
        return this._viewEtatDemandeEstivageDialog;
       }

    set viewEtatDemandeEstivageDialog(value: boolean) {
        this._viewEtatDemandeEstivageDialog = value;
       }

     get searchEtatDemandeEstivage(): EtatDemandeEstivageVo {
     if(this._searchEtatDemandeEstivage==null){
    this._searchEtatDemandeEstivage=new EtatDemandeEstivageVo();
    }
        return this._searchEtatDemandeEstivage;
    }

    set searchEtatDemandeEstivage(value: EtatDemandeEstivageVo) {
        this._searchEtatDemandeEstivage = value;
       }

}
