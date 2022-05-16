import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PieceJointePrestationVo} from '../model/PieceJointePrestation.model';
import {PrestationVo} from '../model/Prestation.model';


@Injectable({
  providedIn: 'root'
})
export class PieceJointePrestationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pieceJointePrestation/';
        })
    }
     private _pieceJointePrestations: Array<PieceJointePrestationVo> ;
     private _selectedPieceJointePrestation: PieceJointePrestationVo;
     private _pieceJointePrestationSelections: Array<PieceJointePrestationVo>;
     private _createPieceJointePrestationDialog: boolean;
     private _editPieceJointePrestationDialog: boolean;
     private _viewPieceJointePrestationDialog: boolean;
     public editPieceJointePrestation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPieceJointePrestation:PieceJointePrestationVo ;

    // methods
    public archiver(pieceJointePrestation: PieceJointePrestationVo): Observable<PieceJointePrestationVo> {
        return this.http.put<PieceJointePrestationVo>(this.API + 'archiver/' ,pieceJointePrestation);
    }
    public desarchiver(pieceJointePrestation: PieceJointePrestationVo): Observable<PieceJointePrestationVo> {
    return this.http.put<PieceJointePrestationVo>(this.API + 'desarchiver/' ,pieceJointePrestation);
    }

    public findAll(){
     return this.http.get<Array<PieceJointePrestationVo>>(this.API);
    }

    public save(): Observable<PieceJointePrestationVo> {
           return this.http.post<PieceJointePrestationVo>(this.API, {...this.selectedPieceJointePrestation,dateCreation: moment(this.selectedPieceJointePrestation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pieceJointePrestation: PieceJointePrestationVo) {
         return this.http.delete<number>(this.API + 'id/' + pieceJointePrestation.id);
    }


    public edit(): Observable<PieceJointePrestationVo> {
        return this.http.put<PieceJointePrestationVo>(this.API, this.selectedPieceJointePrestation);
    }


     public findByCriteria(pieceJointePrestation:PieceJointePrestationVo):Observable<Array<PieceJointePrestationVo>>{
           return this.http.post<Array<PieceJointePrestationVo>>(this.API +'search', pieceJointePrestation);
    }

   public findByIdWithAssociatedList(pieceJointePrestation:PieceJointePrestationVo):Observable<PieceJointePrestationVo>{
         return this.http.get<PieceJointePrestationVo>(this.API + 'detail/id/' +pieceJointePrestation.id);
    }

    // getters and setters


    get pieceJointePrestations(): Array<PieceJointePrestationVo> {
    if(this._pieceJointePrestations==null){
    this._pieceJointePrestations=new Array<PieceJointePrestationVo>();
    }
return this._pieceJointePrestations;
       }

    set pieceJointePrestations(value: Array<PieceJointePrestationVo>) {
        this._pieceJointePrestations = value;
       }

    get selectedPieceJointePrestation(): PieceJointePrestationVo {
    if(this._selectedPieceJointePrestation==null){
    this._selectedPieceJointePrestation=new PieceJointePrestationVo();
    }
           return this._selectedPieceJointePrestation;
       }

    set selectedPieceJointePrestation(value: PieceJointePrestationVo) {
        this._selectedPieceJointePrestation = value;
       }

    get pieceJointePrestationSelections(): Array<PieceJointePrestationVo> {
    if(this._pieceJointePrestationSelections==null){
    this._pieceJointePrestationSelections=new Array<PieceJointePrestationVo>();
    }
        return this._pieceJointePrestationSelections;
       }


    set pieceJointePrestationSelections(value: Array<PieceJointePrestationVo>) {
        this._pieceJointePrestationSelections = value;
       }

    get createPieceJointePrestationDialog(): boolean {
        return this._createPieceJointePrestationDialog;
       }

    set createPieceJointePrestationDialog(value: boolean) {
        this._createPieceJointePrestationDialog = value;
       }

    get editPieceJointePrestationDialog(): boolean {
        return this._editPieceJointePrestationDialog;
       }

    set editPieceJointePrestationDialog(value: boolean) {
        this._editPieceJointePrestationDialog = value;
       }

    get viewPieceJointePrestationDialog(): boolean {
        return this._viewPieceJointePrestationDialog;
       }

    set viewPieceJointePrestationDialog(value: boolean) {
        this._viewPieceJointePrestationDialog = value;
       }

     get searchPieceJointePrestation(): PieceJointePrestationVo {
     if(this._searchPieceJointePrestation==null){
    this._searchPieceJointePrestation=new PieceJointePrestationVo();
    }
        return this._searchPieceJointePrestation;
    }

    set searchPieceJointePrestation(value: PieceJointePrestationVo) {
        this._searchPieceJointePrestation = value;
       }

}
