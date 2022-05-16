import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {GestionReclamationVo} from '../model/GestionReclamation.model';
import {ReclamationVo} from '../model/Reclamation.model';
import {ModerateurVo} from '../model/Moderateur.model';


@Injectable({
  providedIn: 'root'
})
export class GestionReclamationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/gestionReclamation/';
        })
    }
     private _gestionReclamations: Array<GestionReclamationVo> ;
     private _selectedGestionReclamation: GestionReclamationVo;
     private _gestionReclamationSelections: Array<GestionReclamationVo>;
     private _createGestionReclamationDialog: boolean;
     private _editGestionReclamationDialog: boolean;
     private _viewGestionReclamationDialog: boolean;
     public editGestionReclamation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchGestionReclamation:GestionReclamationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<GestionReclamationVo>>(this.API);
    }

    public save(): Observable<GestionReclamationVo> {
           return this.http.post<GestionReclamationVo>(this.API, {...this.selectedGestionReclamation,dateTraitement: moment(this.selectedGestionReclamation.dateTraitement).format("YYYY-MM-DD")});
    }

    delete(gestionReclamation: GestionReclamationVo) {
         return this.http.delete<number>(this.API + 'id/' + gestionReclamation.id);
    }


    public edit(): Observable<GestionReclamationVo> {
        return this.http.put<GestionReclamationVo>(this.API, this.selectedGestionReclamation);
    }


     public findByCriteria(gestionReclamation:GestionReclamationVo):Observable<Array<GestionReclamationVo>>{
           return this.http.post<Array<GestionReclamationVo>>(this.API +'search', gestionReclamation);
    }

   public findByIdWithAssociatedList(gestionReclamation:GestionReclamationVo):Observable<GestionReclamationVo>{
         return this.http.get<GestionReclamationVo>(this.API + 'detail/id/' +gestionReclamation.id);
    }

    // getters and setters


    get gestionReclamations(): Array<GestionReclamationVo> {
    if(this._gestionReclamations==null){
    this._gestionReclamations=new Array<GestionReclamationVo>();
    }
return this._gestionReclamations;
       }

    set gestionReclamations(value: Array<GestionReclamationVo>) {
        this._gestionReclamations = value;
       }

    get selectedGestionReclamation(): GestionReclamationVo {
    if(this._selectedGestionReclamation==null){
    this._selectedGestionReclamation=new GestionReclamationVo();
    }
           return this._selectedGestionReclamation;
       }

    set selectedGestionReclamation(value: GestionReclamationVo) {
        this._selectedGestionReclamation = value;
       }

    get gestionReclamationSelections(): Array<GestionReclamationVo> {
    if(this._gestionReclamationSelections==null){
    this._gestionReclamationSelections=new Array<GestionReclamationVo>();
    }
        return this._gestionReclamationSelections;
       }


    set gestionReclamationSelections(value: Array<GestionReclamationVo>) {
        this._gestionReclamationSelections = value;
       }

    get createGestionReclamationDialog(): boolean {
        return this._createGestionReclamationDialog;
       }

    set createGestionReclamationDialog(value: boolean) {
        this._createGestionReclamationDialog = value;
       }

    get editGestionReclamationDialog(): boolean {
        return this._editGestionReclamationDialog;
       }

    set editGestionReclamationDialog(value: boolean) {
        this._editGestionReclamationDialog = value;
       }

    get viewGestionReclamationDialog(): boolean {
        return this._viewGestionReclamationDialog;
       }

    set viewGestionReclamationDialog(value: boolean) {
        this._viewGestionReclamationDialog = value;
       }

     get searchGestionReclamation(): GestionReclamationVo {
     if(this._searchGestionReclamation==null){
    this._searchGestionReclamation=new GestionReclamationVo();
    }
        return this._searchGestionReclamation;
    }

    set searchGestionReclamation(value: GestionReclamationVo) {
        this._searchGestionReclamation = value;
       }

}
