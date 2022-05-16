import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatReclamationVo} from '../model/EtatReclamation.model';


@Injectable({
  providedIn: 'root'
})
export class EtatReclamationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatReclamation/';
        })
    }
     private _etatReclamations: Array<EtatReclamationVo> ;
     private _selectedEtatReclamation: EtatReclamationVo;
     private _etatReclamationSelections: Array<EtatReclamationVo>;
     private _createEtatReclamationDialog: boolean;
     private _editEtatReclamationDialog: boolean;
     private _viewEtatReclamationDialog: boolean;
     public editEtatReclamation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatReclamation:EtatReclamationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatReclamationVo>>(this.API);
    }

    public save(): Observable<EtatReclamationVo> {
         return this.http.post<EtatReclamationVo>(this.API, this.selectedEtatReclamation);
    }

    delete(etatReclamation: EtatReclamationVo) {
         return this.http.delete<number>(this.API + 'id/' + etatReclamation.id);
    }


    public edit(): Observable<EtatReclamationVo> {
        return this.http.put<EtatReclamationVo>(this.API, this.selectedEtatReclamation);
    }


     public findByCriteria(etatReclamation:EtatReclamationVo):Observable<Array<EtatReclamationVo>>{
           return this.http.post<Array<EtatReclamationVo>>(this.API +'search', etatReclamation);
    }

   public findByIdWithAssociatedList(etatReclamation:EtatReclamationVo):Observable<EtatReclamationVo>{
         return this.http.get<EtatReclamationVo>(this.API + 'detail/id/' +etatReclamation.id);
    }

    // getters and setters


    get etatReclamations(): Array<EtatReclamationVo> {
    if(this._etatReclamations==null){
    this._etatReclamations=new Array<EtatReclamationVo>();
    }
return this._etatReclamations;
       }

    set etatReclamations(value: Array<EtatReclamationVo>) {
        this._etatReclamations = value;
       }

    get selectedEtatReclamation(): EtatReclamationVo {
    if(this._selectedEtatReclamation==null){
    this._selectedEtatReclamation=new EtatReclamationVo();
    }
           return this._selectedEtatReclamation;
       }

    set selectedEtatReclamation(value: EtatReclamationVo) {
        this._selectedEtatReclamation = value;
       }

    get etatReclamationSelections(): Array<EtatReclamationVo> {
    if(this._etatReclamationSelections==null){
    this._etatReclamationSelections=new Array<EtatReclamationVo>();
    }
        return this._etatReclamationSelections;
       }


    set etatReclamationSelections(value: Array<EtatReclamationVo>) {
        this._etatReclamationSelections = value;
       }

    get createEtatReclamationDialog(): boolean {
        return this._createEtatReclamationDialog;
       }

    set createEtatReclamationDialog(value: boolean) {
        this._createEtatReclamationDialog = value;
       }

    get editEtatReclamationDialog(): boolean {
        return this._editEtatReclamationDialog;
       }

    set editEtatReclamationDialog(value: boolean) {
        this._editEtatReclamationDialog = value;
       }

    get viewEtatReclamationDialog(): boolean {
        return this._viewEtatReclamationDialog;
       }

    set viewEtatReclamationDialog(value: boolean) {
        this._viewEtatReclamationDialog = value;
       }

     get searchEtatReclamation(): EtatReclamationVo {
     if(this._searchEtatReclamation==null){
    this._searchEtatReclamation=new EtatReclamationVo();
    }
        return this._searchEtatReclamation;
    }

    set searchEtatReclamation(value: EtatReclamationVo) {
        this._searchEtatReclamation = value;
       }

}
