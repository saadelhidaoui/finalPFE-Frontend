import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DemandeEstivageVo} from '../model/DemandeEstivage.model';
import {AdherentVo} from '../model/Adherent.model';
import {EtatDemandeEstivageVo} from '../model/EtatDemandeEstivage.model';
import {PieceJointeEstivageVo} from '../model/PieceJointeEstivage.model';
import {DemandeEstivageCentreVo} from '../model/DemandeEstivageCentre.model';
import {EstivageCentreEstivageVo} from '../model/EstivageCentreEstivage.model';


@Injectable({
  providedIn: 'root'
})
export class DemandeEstivageService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/demandeEstivage/';
        })
    }
     private _demandeEstivages: Array<DemandeEstivageVo> ;
     private _selectedDemandeEstivage: DemandeEstivageVo;
     private _demandeEstivageSelections: Array<DemandeEstivageVo>;
     private _createDemandeEstivageDialog: boolean;
     private _editDemandeEstivageDialog: boolean;
     private _viewDemandeEstivageDialog: boolean;
     public editDemandeEstivage$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDemandeEstivage:DemandeEstivageVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DemandeEstivageVo>>(this.API);
    }

    public save(): Observable<DemandeEstivageVo> {
           return this.http.post<DemandeEstivageVo>(this.API, {...this.selectedDemandeEstivage,dateTraitement: moment(this.selectedDemandeEstivage.dateTraitement).format("YYYY-MM-DD")});
    }

    delete(demandeEstivage: DemandeEstivageVo) {
         return this.http.delete<number>(this.API + 'id/' + demandeEstivage.id);
    }


    public edit(): Observable<DemandeEstivageVo> {
        return this.http.put<DemandeEstivageVo>(this.API, this.selectedDemandeEstivage);
    }


     public findByCriteria(demandeEstivage:DemandeEstivageVo):Observable<Array<DemandeEstivageVo>>{
           return this.http.post<Array<DemandeEstivageVo>>(this.API +'search', demandeEstivage);
    }

   public findByIdWithAssociatedList(demandeEstivage:DemandeEstivageVo):Observable<DemandeEstivageVo>{
         return this.http.get<DemandeEstivageVo>(this.API + 'detail/id/' +demandeEstivage.id);
    }

    // getters and setters


    get demandeEstivages(): Array<DemandeEstivageVo> {
    if(this._demandeEstivages==null){
    this._demandeEstivages=new Array<DemandeEstivageVo>();
    }
return this._demandeEstivages;
       }

    set demandeEstivages(value: Array<DemandeEstivageVo>) {
        this._demandeEstivages = value;
       }

    get selectedDemandeEstivage(): DemandeEstivageVo {
    if(this._selectedDemandeEstivage==null){
    this._selectedDemandeEstivage=new DemandeEstivageVo();
    }
           return this._selectedDemandeEstivage;
       }

    set selectedDemandeEstivage(value: DemandeEstivageVo) {
        this._selectedDemandeEstivage = value;
       }

    get demandeEstivageSelections(): Array<DemandeEstivageVo> {
    if(this._demandeEstivageSelections==null){
    this._demandeEstivageSelections=new Array<DemandeEstivageVo>();
    }
        return this._demandeEstivageSelections;
       }


    set demandeEstivageSelections(value: Array<DemandeEstivageVo>) {
        this._demandeEstivageSelections = value;
       }

    get createDemandeEstivageDialog(): boolean {
        return this._createDemandeEstivageDialog;
       }

    set createDemandeEstivageDialog(value: boolean) {
        this._createDemandeEstivageDialog = value;
       }

    get editDemandeEstivageDialog(): boolean {
        return this._editDemandeEstivageDialog;
       }

    set editDemandeEstivageDialog(value: boolean) {
        this._editDemandeEstivageDialog = value;
       }

    get viewDemandeEstivageDialog(): boolean {
        return this._viewDemandeEstivageDialog;
       }

    set viewDemandeEstivageDialog(value: boolean) {
        this._viewDemandeEstivageDialog = value;
       }

     get searchDemandeEstivage(): DemandeEstivageVo {
     if(this._searchDemandeEstivage==null){
    this._searchDemandeEstivage=new DemandeEstivageVo();
    }
        return this._searchDemandeEstivage;
    }

    set searchDemandeEstivage(value: DemandeEstivageVo) {
        this._searchDemandeEstivage = value;
       }

}
