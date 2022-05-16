import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PieceJointeConventionVo} from '../model/PieceJointeConvention.model';
import {ConventionVo} from '../model/Convention.model';


@Injectable({
  providedIn: 'root'
})
export class PieceJointeConventionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pieceJointeConvention/';
        })
    }
     private _pieceJointeConventions: Array<PieceJointeConventionVo> ;
     private _selectedPieceJointeConvention: PieceJointeConventionVo;
     private _pieceJointeConventionSelections: Array<PieceJointeConventionVo>;
     private _createPieceJointeConventionDialog: boolean;
     private _editPieceJointeConventionDialog: boolean;
     private _viewPieceJointeConventionDialog: boolean;
     public editPieceJointeConvention$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPieceJointeConvention:PieceJointeConventionVo ;

    // methods
    public archiver(pieceJointeConvention: PieceJointeConventionVo): Observable<PieceJointeConventionVo> {
        return this.http.put<PieceJointeConventionVo>(this.API + 'archiver/' ,pieceJointeConvention);
    }
    public desarchiver(pieceJointeConvention: PieceJointeConventionVo): Observable<PieceJointeConventionVo> {
    return this.http.put<PieceJointeConventionVo>(this.API + 'desarchiver/' ,pieceJointeConvention);
    }

    public findAll(){
     return this.http.get<Array<PieceJointeConventionVo>>(this.API);
    }

    public save(): Observable<PieceJointeConventionVo> {
           return this.http.post<PieceJointeConventionVo>(this.API, {...this.selectedPieceJointeConvention,dateCreation: moment(this.selectedPieceJointeConvention.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pieceJointeConvention: PieceJointeConventionVo) {
         return this.http.delete<number>(this.API + 'id/' + pieceJointeConvention.id);
    }


    public edit(): Observable<PieceJointeConventionVo> {
        return this.http.put<PieceJointeConventionVo>(this.API, this.selectedPieceJointeConvention);
    }


     public findByCriteria(pieceJointeConvention:PieceJointeConventionVo):Observable<Array<PieceJointeConventionVo>>{
           return this.http.post<Array<PieceJointeConventionVo>>(this.API +'search', pieceJointeConvention);
    }

   public findByIdWithAssociatedList(pieceJointeConvention:PieceJointeConventionVo):Observable<PieceJointeConventionVo>{
         return this.http.get<PieceJointeConventionVo>(this.API + 'detail/id/' +pieceJointeConvention.id);
    }

    // getters and setters


    get pieceJointeConventions(): Array<PieceJointeConventionVo> {
    if(this._pieceJointeConventions==null){
    this._pieceJointeConventions=new Array<PieceJointeConventionVo>();
    }
return this._pieceJointeConventions;
       }

    set pieceJointeConventions(value: Array<PieceJointeConventionVo>) {
        this._pieceJointeConventions = value;
       }

    get selectedPieceJointeConvention(): PieceJointeConventionVo {
    if(this._selectedPieceJointeConvention==null){
    this._selectedPieceJointeConvention=new PieceJointeConventionVo();
    }
           return this._selectedPieceJointeConvention;
       }

    set selectedPieceJointeConvention(value: PieceJointeConventionVo) {
        this._selectedPieceJointeConvention = value;
       }

    get pieceJointeConventionSelections(): Array<PieceJointeConventionVo> {
    if(this._pieceJointeConventionSelections==null){
    this._pieceJointeConventionSelections=new Array<PieceJointeConventionVo>();
    }
        return this._pieceJointeConventionSelections;
       }


    set pieceJointeConventionSelections(value: Array<PieceJointeConventionVo>) {
        this._pieceJointeConventionSelections = value;
       }

    get createPieceJointeConventionDialog(): boolean {
        return this._createPieceJointeConventionDialog;
       }

    set createPieceJointeConventionDialog(value: boolean) {
        this._createPieceJointeConventionDialog = value;
       }

    get editPieceJointeConventionDialog(): boolean {
        return this._editPieceJointeConventionDialog;
       }

    set editPieceJointeConventionDialog(value: boolean) {
        this._editPieceJointeConventionDialog = value;
       }

    get viewPieceJointeConventionDialog(): boolean {
        return this._viewPieceJointeConventionDialog;
       }

    set viewPieceJointeConventionDialog(value: boolean) {
        this._viewPieceJointeConventionDialog = value;
       }

     get searchPieceJointeConvention(): PieceJointeConventionVo {
     if(this._searchPieceJointeConvention==null){
    this._searchPieceJointeConvention=new PieceJointeConventionVo();
    }
        return this._searchPieceJointeConvention;
    }

    set searchPieceJointeConvention(value: PieceJointeConventionVo) {
        this._searchPieceJointeConvention = value;
       }

}
