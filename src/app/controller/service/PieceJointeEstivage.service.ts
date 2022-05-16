import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PieceJointeEstivageVo} from '../model/PieceJointeEstivage.model';
import {EstivageVo} from '../model/Estivage.model';


@Injectable({
  providedIn: 'root'
})
export class PieceJointeEstivageService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pieceJointeEstivage/';
        })
    }
     private _pieceJointeEstivages: Array<PieceJointeEstivageVo> ;
     private _selectedPieceJointeEstivage: PieceJointeEstivageVo;
     private _pieceJointeEstivageSelections: Array<PieceJointeEstivageVo>;
     private _createPieceJointeEstivageDialog: boolean;
     private _editPieceJointeEstivageDialog: boolean;
     private _viewPieceJointeEstivageDialog: boolean;
     public editPieceJointeEstivage$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPieceJointeEstivage:PieceJointeEstivageVo ;

    // methods
    public archiver(pieceJointeEstivage: PieceJointeEstivageVo): Observable<PieceJointeEstivageVo> {
        return this.http.put<PieceJointeEstivageVo>(this.API + 'archiver/' ,pieceJointeEstivage);
    }
    public desarchiver(pieceJointeEstivage: PieceJointeEstivageVo): Observable<PieceJointeEstivageVo> {
    return this.http.put<PieceJointeEstivageVo>(this.API + 'desarchiver/' ,pieceJointeEstivage);
    }

    public findAll(){
     return this.http.get<Array<PieceJointeEstivageVo>>(this.API);
    }

    public save(): Observable<PieceJointeEstivageVo> {
           return this.http.post<PieceJointeEstivageVo>(this.API, {...this.selectedPieceJointeEstivage,dateCreation: moment(this.selectedPieceJointeEstivage.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pieceJointeEstivage: PieceJointeEstivageVo) {
         return this.http.delete<number>(this.API + 'id/' + pieceJointeEstivage.id);
    }


    public edit(): Observable<PieceJointeEstivageVo> {
        return this.http.put<PieceJointeEstivageVo>(this.API, this.selectedPieceJointeEstivage);
    }


     public findByCriteria(pieceJointeEstivage:PieceJointeEstivageVo):Observable<Array<PieceJointeEstivageVo>>{
           return this.http.post<Array<PieceJointeEstivageVo>>(this.API +'search', pieceJointeEstivage);
    }

   public findByIdWithAssociatedList(pieceJointeEstivage:PieceJointeEstivageVo):Observable<PieceJointeEstivageVo>{
         return this.http.get<PieceJointeEstivageVo>(this.API + 'detail/id/' +pieceJointeEstivage.id);
    }

    // getters and setters


    get pieceJointeEstivages(): Array<PieceJointeEstivageVo> {
    if(this._pieceJointeEstivages==null){
    this._pieceJointeEstivages=new Array<PieceJointeEstivageVo>();
    }
return this._pieceJointeEstivages;
       }

    set pieceJointeEstivages(value: Array<PieceJointeEstivageVo>) {
        this._pieceJointeEstivages = value;
       }

    get selectedPieceJointeEstivage(): PieceJointeEstivageVo {
    if(this._selectedPieceJointeEstivage==null){
    this._selectedPieceJointeEstivage=new PieceJointeEstivageVo();
    }
           return this._selectedPieceJointeEstivage;
       }

    set selectedPieceJointeEstivage(value: PieceJointeEstivageVo) {
        this._selectedPieceJointeEstivage = value;
       }

    get pieceJointeEstivageSelections(): Array<PieceJointeEstivageVo> {
    if(this._pieceJointeEstivageSelections==null){
    this._pieceJointeEstivageSelections=new Array<PieceJointeEstivageVo>();
    }
        return this._pieceJointeEstivageSelections;
       }


    set pieceJointeEstivageSelections(value: Array<PieceJointeEstivageVo>) {
        this._pieceJointeEstivageSelections = value;
       }

    get createPieceJointeEstivageDialog(): boolean {
        return this._createPieceJointeEstivageDialog;
       }

    set createPieceJointeEstivageDialog(value: boolean) {
        this._createPieceJointeEstivageDialog = value;
       }

    get editPieceJointeEstivageDialog(): boolean {
        return this._editPieceJointeEstivageDialog;
       }

    set editPieceJointeEstivageDialog(value: boolean) {
        this._editPieceJointeEstivageDialog = value;
       }

    get viewPieceJointeEstivageDialog(): boolean {
        return this._viewPieceJointeEstivageDialog;
       }

    set viewPieceJointeEstivageDialog(value: boolean) {
        this._viewPieceJointeEstivageDialog = value;
       }

     get searchPieceJointeEstivage(): PieceJointeEstivageVo {
     if(this._searchPieceJointeEstivage==null){
    this._searchPieceJointeEstivage=new PieceJointeEstivageVo();
    }
        return this._searchPieceJointeEstivage;
    }

    set searchPieceJointeEstivage(value: PieceJointeEstivageVo) {
        this._searchPieceJointeEstivage = value;
       }

}
