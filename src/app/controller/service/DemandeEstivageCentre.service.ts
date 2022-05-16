import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DemandeEstivageCentreVo} from '../model/DemandeEstivageCentre.model';
import {DemandeEstivageVo} from '../model/DemandeEstivage.model';
import {CentreEstivageVo} from '../model/CentreEstivage.model';


@Injectable({
  providedIn: 'root'
})
export class DemandeEstivageCentreService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/demandeEstivageCentre/';
        })
    }
     private _demandeEstivageCentres: Array<DemandeEstivageCentreVo> ;
     private _selectedDemandeEstivageCentre: DemandeEstivageCentreVo;
     private _demandeEstivageCentreSelections: Array<DemandeEstivageCentreVo>;
     private _createDemandeEstivageCentreDialog: boolean;
     private _editDemandeEstivageCentreDialog: boolean;
     private _viewDemandeEstivageCentreDialog: boolean;
     public editDemandeEstivageCentre$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDemandeEstivageCentre:DemandeEstivageCentreVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DemandeEstivageCentreVo>>(this.API);
    }

    public save(): Observable<DemandeEstivageCentreVo> {
         return this.http.post<DemandeEstivageCentreVo>(this.API, this.selectedDemandeEstivageCentre);
    }

    delete(demandeEstivageCentre: DemandeEstivageCentreVo) {
         return this.http.delete<number>(this.API + 'id/' + demandeEstivageCentre.id);
    }


    public edit(): Observable<DemandeEstivageCentreVo> {
        return this.http.put<DemandeEstivageCentreVo>(this.API, this.selectedDemandeEstivageCentre);
    }


     public findByCriteria(demandeEstivageCentre:DemandeEstivageCentreVo):Observable<Array<DemandeEstivageCentreVo>>{
           return this.http.post<Array<DemandeEstivageCentreVo>>(this.API +'search', demandeEstivageCentre);
    }

   public findByIdWithAssociatedList(demandeEstivageCentre:DemandeEstivageCentreVo):Observable<DemandeEstivageCentreVo>{
         return this.http.get<DemandeEstivageCentreVo>(this.API + 'detail/id/' +demandeEstivageCentre.id);
    }

    // getters and setters


    get demandeEstivageCentres(): Array<DemandeEstivageCentreVo> {
    if(this._demandeEstivageCentres==null){
    this._demandeEstivageCentres=new Array<DemandeEstivageCentreVo>();
    }
return this._demandeEstivageCentres;
       }

    set demandeEstivageCentres(value: Array<DemandeEstivageCentreVo>) {
        this._demandeEstivageCentres = value;
       }

    get selectedDemandeEstivageCentre(): DemandeEstivageCentreVo {
    if(this._selectedDemandeEstivageCentre==null){
    this._selectedDemandeEstivageCentre=new DemandeEstivageCentreVo();
    }
           return this._selectedDemandeEstivageCentre;
       }

    set selectedDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this._selectedDemandeEstivageCentre = value;
       }

    get demandeEstivageCentreSelections(): Array<DemandeEstivageCentreVo> {
    if(this._demandeEstivageCentreSelections==null){
    this._demandeEstivageCentreSelections=new Array<DemandeEstivageCentreVo>();
    }
        return this._demandeEstivageCentreSelections;
       }


    set demandeEstivageCentreSelections(value: Array<DemandeEstivageCentreVo>) {
        this._demandeEstivageCentreSelections = value;
       }

    get createDemandeEstivageCentreDialog(): boolean {
        return this._createDemandeEstivageCentreDialog;
       }

    set createDemandeEstivageCentreDialog(value: boolean) {
        this._createDemandeEstivageCentreDialog = value;
       }

    get editDemandeEstivageCentreDialog(): boolean {
        return this._editDemandeEstivageCentreDialog;
       }

    set editDemandeEstivageCentreDialog(value: boolean) {
        this._editDemandeEstivageCentreDialog = value;
       }

    get viewDemandeEstivageCentreDialog(): boolean {
        return this._viewDemandeEstivageCentreDialog;
       }

    set viewDemandeEstivageCentreDialog(value: boolean) {
        this._viewDemandeEstivageCentreDialog = value;
       }

     get searchDemandeEstivageCentre(): DemandeEstivageCentreVo {
     if(this._searchDemandeEstivageCentre==null){
    this._searchDemandeEstivageCentre=new DemandeEstivageCentreVo();
    }
        return this._searchDemandeEstivageCentre;
    }

    set searchDemandeEstivageCentre(value: DemandeEstivageCentreVo) {
        this._searchDemandeEstivageCentre = value;
       }

}
