import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PieceJointeRendezVousVo} from '../model/PieceJointeRendezVous.model';
import {RendezVousVo} from '../model/RendezVous.model';


@Injectable({
  providedIn: 'root'
})
export class PieceJointeRendezVousService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pieceJointeRendezVous/';
        })
    }
     private _pieceJointeRendezVouss: Array<PieceJointeRendezVousVo> ;
     private _selectedPieceJointeRendezVous: PieceJointeRendezVousVo;
     private _pieceJointeRendezVousSelections: Array<PieceJointeRendezVousVo>;
     private _createPieceJointeRendezVousDialog: boolean;
     private _editPieceJointeRendezVousDialog: boolean;
     private _viewPieceJointeRendezVousDialog: boolean;
     public editPieceJointeRendezVous$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPieceJointeRendezVous:PieceJointeRendezVousVo ;

    // methods
    public archiver(pieceJointeRendezVous: PieceJointeRendezVousVo): Observable<PieceJointeRendezVousVo> {
        return this.http.put<PieceJointeRendezVousVo>(this.API + 'archiver/' ,pieceJointeRendezVous);
    }
    public desarchiver(pieceJointeRendezVous: PieceJointeRendezVousVo): Observable<PieceJointeRendezVousVo> {
    return this.http.put<PieceJointeRendezVousVo>(this.API + 'desarchiver/' ,pieceJointeRendezVous);
    }

    public findAll(){
     return this.http.get<Array<PieceJointeRendezVousVo>>(this.API);
    }

    public save(): Observable<PieceJointeRendezVousVo> {
           return this.http.post<PieceJointeRendezVousVo>(this.API, {...this.selectedPieceJointeRendezVous,dateCreation: moment(this.selectedPieceJointeRendezVous.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pieceJointeRendezVous: PieceJointeRendezVousVo) {
         return this.http.delete<number>(this.API + 'id/' + pieceJointeRendezVous.id);
    }


    public edit(): Observable<PieceJointeRendezVousVo> {
        return this.http.put<PieceJointeRendezVousVo>(this.API, this.selectedPieceJointeRendezVous);
    }


     public findByCriteria(pieceJointeRendezVous:PieceJointeRendezVousVo):Observable<Array<PieceJointeRendezVousVo>>{
           return this.http.post<Array<PieceJointeRendezVousVo>>(this.API +'search', pieceJointeRendezVous);
    }

   public findByIdWithAssociatedList(pieceJointeRendezVous:PieceJointeRendezVousVo):Observable<PieceJointeRendezVousVo>{
         return this.http.get<PieceJointeRendezVousVo>(this.API + 'detail/id/' +pieceJointeRendezVous.id);
    }

    // getters and setters


    get pieceJointeRendezVouss(): Array<PieceJointeRendezVousVo> {
    if(this._pieceJointeRendezVouss==null){
    this._pieceJointeRendezVouss=new Array<PieceJointeRendezVousVo>();
    }
return this._pieceJointeRendezVouss;
       }

    set pieceJointeRendezVouss(value: Array<PieceJointeRendezVousVo>) {
        this._pieceJointeRendezVouss = value;
       }

    get selectedPieceJointeRendezVous(): PieceJointeRendezVousVo {
    if(this._selectedPieceJointeRendezVous==null){
    this._selectedPieceJointeRendezVous=new PieceJointeRendezVousVo();
    }
           return this._selectedPieceJointeRendezVous;
       }

    set selectedPieceJointeRendezVous(value: PieceJointeRendezVousVo) {
        this._selectedPieceJointeRendezVous = value;
       }

    get pieceJointeRendezVousSelections(): Array<PieceJointeRendezVousVo> {
    if(this._pieceJointeRendezVousSelections==null){
    this._pieceJointeRendezVousSelections=new Array<PieceJointeRendezVousVo>();
    }
        return this._pieceJointeRendezVousSelections;
       }


    set pieceJointeRendezVousSelections(value: Array<PieceJointeRendezVousVo>) {
        this._pieceJointeRendezVousSelections = value;
       }

    get createPieceJointeRendezVousDialog(): boolean {
        return this._createPieceJointeRendezVousDialog;
       }

    set createPieceJointeRendezVousDialog(value: boolean) {
        this._createPieceJointeRendezVousDialog = value;
       }

    get editPieceJointeRendezVousDialog(): boolean {
        return this._editPieceJointeRendezVousDialog;
       }

    set editPieceJointeRendezVousDialog(value: boolean) {
        this._editPieceJointeRendezVousDialog = value;
       }

    get viewPieceJointeRendezVousDialog(): boolean {
        return this._viewPieceJointeRendezVousDialog;
       }

    set viewPieceJointeRendezVousDialog(value: boolean) {
        this._viewPieceJointeRendezVousDialog = value;
       }

     get searchPieceJointeRendezVous(): PieceJointeRendezVousVo {
     if(this._searchPieceJointeRendezVous==null){
    this._searchPieceJointeRendezVous=new PieceJointeRendezVousVo();
    }
        return this._searchPieceJointeRendezVous;
    }

    set searchPieceJointeRendezVous(value: PieceJointeRendezVousVo) {
        this._searchPieceJointeRendezVous = value;
       }

}
