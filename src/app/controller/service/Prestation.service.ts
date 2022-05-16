import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PrestationVo} from '../model/Prestation.model';
import {AdherentVo} from '../model/Adherent.model';
import {EtatPrestationVo} from '../model/EtatPrestation.model';
import {PieceJointePrestationVo} from '../model/PieceJointePrestation.model';
import {NiveauImportanceVo} from '../model/NiveauImportance.model';
import {TypePrestationVo} from '../model/TypePrestation.model';


@Injectable({
  providedIn: 'root'
})
export class PrestationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/prestation/';
        })
    }
     private _prestations: Array<PrestationVo> ;
     private _selectedPrestation: PrestationVo;
     private _prestationSelections: Array<PrestationVo>;
     private _createPrestationDialog: boolean;
     private _editPrestationDialog: boolean;
     private _viewPrestationDialog: boolean;
     public editPrestation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPrestation:PrestationVo ;

    // methods
    public archiver(prestation: PrestationVo): Observable<PrestationVo> {
        return this.http.put<PrestationVo>(this.API + 'archiver/' ,prestation);
    }
    public desarchiver(prestation: PrestationVo): Observable<PrestationVo> {
    return this.http.put<PrestationVo>(this.API + 'desarchiver/' ,prestation);
    }

    public findAll(){
     return this.http.get<Array<PrestationVo>>(this.API);
    }

    public save(): Observable<PrestationVo> {
           return this.http.post<PrestationVo>(this.API, {...this.selectedPrestation,dateCreation: moment(this.selectedPrestation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(prestation: PrestationVo) {
         return this.http.delete<number>(this.API + 'id/' + prestation.id);
    }


    public edit(): Observable<PrestationVo> {
        return this.http.put<PrestationVo>(this.API, this.selectedPrestation);
    }


     public findByCriteria(prestation:PrestationVo):Observable<Array<PrestationVo>>{
           return this.http.post<Array<PrestationVo>>(this.API +'search', prestation);
    }

   public findByIdWithAssociatedList(prestation:PrestationVo):Observable<PrestationVo>{
         return this.http.get<PrestationVo>(this.API + 'detail/id/' +prestation.id);
    }

    // getters and setters


    get prestations(): Array<PrestationVo> {
    if(this._prestations==null){
    this._prestations=new Array<PrestationVo>();
    }
return this._prestations;
       }

    set prestations(value: Array<PrestationVo>) {
        this._prestations = value;
       }

    get selectedPrestation(): PrestationVo {
    if(this._selectedPrestation==null){
    this._selectedPrestation=new PrestationVo();
    }
           return this._selectedPrestation;
       }

    set selectedPrestation(value: PrestationVo) {
        this._selectedPrestation = value;
       }

    get prestationSelections(): Array<PrestationVo> {
    if(this._prestationSelections==null){
    this._prestationSelections=new Array<PrestationVo>();
    }
        return this._prestationSelections;
       }


    set prestationSelections(value: Array<PrestationVo>) {
        this._prestationSelections = value;
       }

    get createPrestationDialog(): boolean {
        return this._createPrestationDialog;
       }

    set createPrestationDialog(value: boolean) {
        this._createPrestationDialog = value;
       }

    get editPrestationDialog(): boolean {
        return this._editPrestationDialog;
       }

    set editPrestationDialog(value: boolean) {
        this._editPrestationDialog = value;
       }

    get viewPrestationDialog(): boolean {
        return this._viewPrestationDialog;
       }

    set viewPrestationDialog(value: boolean) {
        this._viewPrestationDialog = value;
       }

     get searchPrestation(): PrestationVo {
     if(this._searchPrestation==null){
    this._searchPrestation=new PrestationVo();
    }
        return this._searchPrestation;
    }

    set searchPrestation(value: PrestationVo) {
        this._searchPrestation = value;
       }

}
