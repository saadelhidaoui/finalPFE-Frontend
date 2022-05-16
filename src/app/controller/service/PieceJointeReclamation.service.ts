import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PieceJointeReclamationVo} from '../model/PieceJointeReclamation.model';
import {ReclamationVo} from '../model/Reclamation.model';


@Injectable({
  providedIn: 'root'
})
export class PieceJointeReclamationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pieceJointeReclamation/';
        })
    }
     private _pieceJointeReclamations: Array<PieceJointeReclamationVo> ;
     private _selectedPieceJointeReclamation: PieceJointeReclamationVo;
     private _pieceJointeReclamationSelections: Array<PieceJointeReclamationVo>;
     private _createPieceJointeReclamationDialog: boolean;
     private _editPieceJointeReclamationDialog: boolean;
     private _viewPieceJointeReclamationDialog: boolean;
     public editPieceJointeReclamation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPieceJointeReclamation:PieceJointeReclamationVo ;

    // methods
    public archiver(pieceJointeReclamation: PieceJointeReclamationVo): Observable<PieceJointeReclamationVo> {
        return this.http.put<PieceJointeReclamationVo>(this.API + 'archiver/' ,pieceJointeReclamation);
    }
    public desarchiver(pieceJointeReclamation: PieceJointeReclamationVo): Observable<PieceJointeReclamationVo> {
    return this.http.put<PieceJointeReclamationVo>(this.API + 'desarchiver/' ,pieceJointeReclamation);
    }

    public findAll(){
     return this.http.get<Array<PieceJointeReclamationVo>>(this.API);
    }

    public save(): Observable<PieceJointeReclamationVo> {
           return this.http.post<PieceJointeReclamationVo>(this.API, {...this.selectedPieceJointeReclamation,dateCreation: moment(this.selectedPieceJointeReclamation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pieceJointeReclamation: PieceJointeReclamationVo) {
         return this.http.delete<number>(this.API + 'id/' + pieceJointeReclamation.id);
    }


    public edit(): Observable<PieceJointeReclamationVo> {
        return this.http.put<PieceJointeReclamationVo>(this.API, this.selectedPieceJointeReclamation);
    }


     public findByCriteria(pieceJointeReclamation:PieceJointeReclamationVo):Observable<Array<PieceJointeReclamationVo>>{
           return this.http.post<Array<PieceJointeReclamationVo>>(this.API +'search', pieceJointeReclamation);
    }

   public findByIdWithAssociatedList(pieceJointeReclamation:PieceJointeReclamationVo):Observable<PieceJointeReclamationVo>{
         return this.http.get<PieceJointeReclamationVo>(this.API + 'detail/id/' +pieceJointeReclamation.id);
    }

    // getters and setters


    get pieceJointeReclamations(): Array<PieceJointeReclamationVo> {
    if(this._pieceJointeReclamations==null){
    this._pieceJointeReclamations=new Array<PieceJointeReclamationVo>();
    }
return this._pieceJointeReclamations;
       }

    set pieceJointeReclamations(value: Array<PieceJointeReclamationVo>) {
        this._pieceJointeReclamations = value;
       }

    get selectedPieceJointeReclamation(): PieceJointeReclamationVo {
    if(this._selectedPieceJointeReclamation==null){
    this._selectedPieceJointeReclamation=new PieceJointeReclamationVo();
    }
           return this._selectedPieceJointeReclamation;
       }

    set selectedPieceJointeReclamation(value: PieceJointeReclamationVo) {
        this._selectedPieceJointeReclamation = value;
       }

    get pieceJointeReclamationSelections(): Array<PieceJointeReclamationVo> {
    if(this._pieceJointeReclamationSelections==null){
    this._pieceJointeReclamationSelections=new Array<PieceJointeReclamationVo>();
    }
        return this._pieceJointeReclamationSelections;
       }


    set pieceJointeReclamationSelections(value: Array<PieceJointeReclamationVo>) {
        this._pieceJointeReclamationSelections = value;
       }

    get createPieceJointeReclamationDialog(): boolean {
        return this._createPieceJointeReclamationDialog;
       }

    set createPieceJointeReclamationDialog(value: boolean) {
        this._createPieceJointeReclamationDialog = value;
       }

    get editPieceJointeReclamationDialog(): boolean {
        return this._editPieceJointeReclamationDialog;
       }

    set editPieceJointeReclamationDialog(value: boolean) {
        this._editPieceJointeReclamationDialog = value;
       }

    get viewPieceJointeReclamationDialog(): boolean {
        return this._viewPieceJointeReclamationDialog;
       }

    set viewPieceJointeReclamationDialog(value: boolean) {
        this._viewPieceJointeReclamationDialog = value;
       }

     get searchPieceJointeReclamation(): PieceJointeReclamationVo {
     if(this._searchPieceJointeReclamation==null){
    this._searchPieceJointeReclamation=new PieceJointeReclamationVo();
    }
        return this._searchPieceJointeReclamation;
    }

    set searchPieceJointeReclamation(value: PieceJointeReclamationVo) {
        this._searchPieceJointeReclamation = value;
       }

}
