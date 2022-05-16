import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatPrestationVo} from '../model/EtatPrestation.model';


@Injectable({
  providedIn: 'root'
})
export class EtatPrestationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatPrestation/';
        })
    }
     private _etatPrestations: Array<EtatPrestationVo> ;
     private _selectedEtatPrestation: EtatPrestationVo;
     private _etatPrestationSelections: Array<EtatPrestationVo>;
     private _createEtatPrestationDialog: boolean;
     private _editEtatPrestationDialog: boolean;
     private _viewEtatPrestationDialog: boolean;
     public editEtatPrestation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatPrestation:EtatPrestationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatPrestationVo>>(this.API);
    }

    public save(): Observable<EtatPrestationVo> {
         return this.http.post<EtatPrestationVo>(this.API, this.selectedEtatPrestation);
    }

    delete(etatPrestation: EtatPrestationVo) {
         return this.http.delete<number>(this.API + 'id/' + etatPrestation.id);
    }


    public edit(): Observable<EtatPrestationVo> {
        return this.http.put<EtatPrestationVo>(this.API, this.selectedEtatPrestation);
    }


     public findByCriteria(etatPrestation:EtatPrestationVo):Observable<Array<EtatPrestationVo>>{
           return this.http.post<Array<EtatPrestationVo>>(this.API +'search', etatPrestation);
    }

   public findByIdWithAssociatedList(etatPrestation:EtatPrestationVo):Observable<EtatPrestationVo>{
         return this.http.get<EtatPrestationVo>(this.API + 'detail/id/' +etatPrestation.id);
    }

    // getters and setters


    get etatPrestations(): Array<EtatPrestationVo> {
    if(this._etatPrestations==null){
    this._etatPrestations=new Array<EtatPrestationVo>();
    }
return this._etatPrestations;
       }

    set etatPrestations(value: Array<EtatPrestationVo>) {
        this._etatPrestations = value;
       }

    get selectedEtatPrestation(): EtatPrestationVo {
    if(this._selectedEtatPrestation==null){
    this._selectedEtatPrestation=new EtatPrestationVo();
    }
           return this._selectedEtatPrestation;
       }

    set selectedEtatPrestation(value: EtatPrestationVo) {
        this._selectedEtatPrestation = value;
       }

    get etatPrestationSelections(): Array<EtatPrestationVo> {
    if(this._etatPrestationSelections==null){
    this._etatPrestationSelections=new Array<EtatPrestationVo>();
    }
        return this._etatPrestationSelections;
       }


    set etatPrestationSelections(value: Array<EtatPrestationVo>) {
        this._etatPrestationSelections = value;
       }

    get createEtatPrestationDialog(): boolean {
        return this._createEtatPrestationDialog;
       }

    set createEtatPrestationDialog(value: boolean) {
        this._createEtatPrestationDialog = value;
       }

    get editEtatPrestationDialog(): boolean {
        return this._editEtatPrestationDialog;
       }

    set editEtatPrestationDialog(value: boolean) {
        this._editEtatPrestationDialog = value;
       }

    get viewEtatPrestationDialog(): boolean {
        return this._viewEtatPrestationDialog;
       }

    set viewEtatPrestationDialog(value: boolean) {
        this._viewEtatPrestationDialog = value;
       }

     get searchEtatPrestation(): EtatPrestationVo {
     if(this._searchEtatPrestation==null){
    this._searchEtatPrestation=new EtatPrestationVo();
    }
        return this._searchEtatPrestation;
    }

    set searchEtatPrestation(value: EtatPrestationVo) {
        this._searchEtatPrestation = value;
       }

}
