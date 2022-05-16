import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ReclamationVo} from '../model/Reclamation.model';
import {AdherentVo} from '../model/Adherent.model';
import {PieceJointeReclamationVo} from '../model/PieceJointeReclamation.model';
import {EtatReclamationVo} from '../model/EtatReclamation.model';


@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/reclamation/';
        })
    }
     private _reclamations: Array<ReclamationVo> ;
     private _selectedReclamation: ReclamationVo;
     private _reclamationSelections: Array<ReclamationVo>;
     private _createReclamationDialog: boolean;
     private _editReclamationDialog: boolean;
     private _viewReclamationDialog: boolean;
     public editReclamation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchReclamation:ReclamationVo ;

    // methods
    public archiver(reclamation: ReclamationVo): Observable<ReclamationVo> {
        return this.http.put<ReclamationVo>(this.API + 'archiver/' ,reclamation);
    }
    public desarchiver(reclamation: ReclamationVo): Observable<ReclamationVo> {
    return this.http.put<ReclamationVo>(this.API + 'desarchiver/' ,reclamation);
    }

    public findAll(){
     return this.http.get<Array<ReclamationVo>>(this.API);
    }

    public save(): Observable<ReclamationVo> {
           return this.http.post<ReclamationVo>(this.API, {...this.selectedReclamation,dateCreation: moment(this.selectedReclamation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(reclamation: ReclamationVo) {
         return this.http.delete<number>(this.API + 'id/' + reclamation.id);
    }


    public edit(): Observable<ReclamationVo> {
        return this.http.put<ReclamationVo>(this.API, this.selectedReclamation);
    }


     public findByCriteria(reclamation:ReclamationVo):Observable<Array<ReclamationVo>>{
           return this.http.post<Array<ReclamationVo>>(this.API +'search', reclamation);
    }

   public findByIdWithAssociatedList(reclamation:ReclamationVo):Observable<ReclamationVo>{
         return this.http.get<ReclamationVo>(this.API + 'detail/id/' +reclamation.id);
    }

    // getters and setters


    get reclamations(): Array<ReclamationVo> {
    if(this._reclamations==null){
    this._reclamations=new Array<ReclamationVo>();
    }
return this._reclamations;
       }

    set reclamations(value: Array<ReclamationVo>) {
        this._reclamations = value;
       }

    get selectedReclamation(): ReclamationVo {
    if(this._selectedReclamation==null){
    this._selectedReclamation=new ReclamationVo();
    }
           return this._selectedReclamation;
       }

    set selectedReclamation(value: ReclamationVo) {
        this._selectedReclamation = value;
       }

    get reclamationSelections(): Array<ReclamationVo> {
    if(this._reclamationSelections==null){
    this._reclamationSelections=new Array<ReclamationVo>();
    }
        return this._reclamationSelections;
       }


    set reclamationSelections(value: Array<ReclamationVo>) {
        this._reclamationSelections = value;
       }

    get createReclamationDialog(): boolean {
        return this._createReclamationDialog;
       }

    set createReclamationDialog(value: boolean) {
        this._createReclamationDialog = value;
       }

    get editReclamationDialog(): boolean {
        return this._editReclamationDialog;
       }

    set editReclamationDialog(value: boolean) {
        this._editReclamationDialog = value;
       }

    get viewReclamationDialog(): boolean {
        return this._viewReclamationDialog;
       }

    set viewReclamationDialog(value: boolean) {
        this._viewReclamationDialog = value;
       }

     get searchReclamation(): ReclamationVo {
     if(this._searchReclamation==null){
    this._searchReclamation=new ReclamationVo();
    }
        return this._searchReclamation;
    }

    set searchReclamation(value: ReclamationVo) {
        this._searchReclamation = value;
       }

}
