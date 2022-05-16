import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PieceJointeAdherentVo} from '../model/PieceJointeAdherent.model';
import {AdherentVo} from '../model/Adherent.model';


@Injectable({
  providedIn: 'root'
})
export class PieceJointeAdherentService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pieceJointeAdherent/';
        })
    }
     private _pieceJointeAdherents: Array<PieceJointeAdherentVo> ;
     private _selectedPieceJointeAdherent: PieceJointeAdherentVo;
     private _pieceJointeAdherentSelections: Array<PieceJointeAdherentVo>;
     private _createPieceJointeAdherentDialog: boolean;
     private _editPieceJointeAdherentDialog: boolean;
     private _viewPieceJointeAdherentDialog: boolean;
     public editPieceJointeAdherent$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPieceJointeAdherent:PieceJointeAdherentVo ;

    // methods
    public archiver(pieceJointeAdherent: PieceJointeAdherentVo): Observable<PieceJointeAdherentVo> {
        return this.http.put<PieceJointeAdherentVo>(this.API + 'archiver/' ,pieceJointeAdherent);
    }
    public desarchiver(pieceJointeAdherent: PieceJointeAdherentVo): Observable<PieceJointeAdherentVo> {
    return this.http.put<PieceJointeAdherentVo>(this.API + 'desarchiver/' ,pieceJointeAdherent);
    }

    public findAll(){
     return this.http.get<Array<PieceJointeAdherentVo>>(this.API);
    }

    public save(): Observable<PieceJointeAdherentVo> {
           return this.http.post<PieceJointeAdherentVo>(this.API, {...this.selectedPieceJointeAdherent,dateCreation: moment(this.selectedPieceJointeAdherent.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pieceJointeAdherent: PieceJointeAdherentVo) {
         return this.http.delete<number>(this.API + 'id/' + pieceJointeAdherent.id);
    }


    public edit(): Observable<PieceJointeAdherentVo> {
        return this.http.put<PieceJointeAdherentVo>(this.API, this.selectedPieceJointeAdherent);
    }


     public findByCriteria(pieceJointeAdherent:PieceJointeAdherentVo):Observable<Array<PieceJointeAdherentVo>>{
           return this.http.post<Array<PieceJointeAdherentVo>>(this.API +'search', pieceJointeAdherent);
    }

   public findByIdWithAssociatedList(pieceJointeAdherent:PieceJointeAdherentVo):Observable<PieceJointeAdherentVo>{
         return this.http.get<PieceJointeAdherentVo>(this.API + 'detail/id/' +pieceJointeAdherent.id);
    }

    // getters and setters


    get pieceJointeAdherents(): Array<PieceJointeAdherentVo> {
    if(this._pieceJointeAdherents==null){
    this._pieceJointeAdherents=new Array<PieceJointeAdherentVo>();
    }
return this._pieceJointeAdherents;
       }

    set pieceJointeAdherents(value: Array<PieceJointeAdherentVo>) {
        this._pieceJointeAdherents = value;
       }

    get selectedPieceJointeAdherent(): PieceJointeAdherentVo {
    if(this._selectedPieceJointeAdherent==null){
    this._selectedPieceJointeAdherent=new PieceJointeAdherentVo();
    }
           return this._selectedPieceJointeAdherent;
       }

    set selectedPieceJointeAdherent(value: PieceJointeAdherentVo) {
        this._selectedPieceJointeAdherent = value;
       }

    get pieceJointeAdherentSelections(): Array<PieceJointeAdherentVo> {
    if(this._pieceJointeAdherentSelections==null){
    this._pieceJointeAdherentSelections=new Array<PieceJointeAdherentVo>();
    }
        return this._pieceJointeAdherentSelections;
       }


    set pieceJointeAdherentSelections(value: Array<PieceJointeAdherentVo>) {
        this._pieceJointeAdherentSelections = value;
       }

    get createPieceJointeAdherentDialog(): boolean {
        return this._createPieceJointeAdherentDialog;
       }

    set createPieceJointeAdherentDialog(value: boolean) {
        this._createPieceJointeAdherentDialog = value;
       }

    get editPieceJointeAdherentDialog(): boolean {
        return this._editPieceJointeAdherentDialog;
       }

    set editPieceJointeAdherentDialog(value: boolean) {
        this._editPieceJointeAdherentDialog = value;
       }

    get viewPieceJointeAdherentDialog(): boolean {
        return this._viewPieceJointeAdherentDialog;
       }

    set viewPieceJointeAdherentDialog(value: boolean) {
        this._viewPieceJointeAdherentDialog = value;
       }

     get searchPieceJointeAdherent(): PieceJointeAdherentVo {
     if(this._searchPieceJointeAdherent==null){
    this._searchPieceJointeAdherent=new PieceJointeAdherentVo();
    }
        return this._searchPieceJointeAdherent;
    }

    set searchPieceJointeAdherent(value: PieceJointeAdherentVo) {
        this._searchPieceJointeAdherent = value;
       }

}
