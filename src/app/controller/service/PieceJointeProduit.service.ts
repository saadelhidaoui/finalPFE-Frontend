import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PieceJointeProduitVo} from '../model/PieceJointeProduit.model';
import {ProduitVo} from '../model/Produit.model';


@Injectable({
  providedIn: 'root'
})
export class PieceJointeProduitService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pieceJointeProduit/';
        })
    }
     private _pieceJointeProduits: Array<PieceJointeProduitVo> ;
     private _selectedPieceJointeProduit: PieceJointeProduitVo;
     private _pieceJointeProduitSelections: Array<PieceJointeProduitVo>;
     private _createPieceJointeProduitDialog: boolean;
     private _editPieceJointeProduitDialog: boolean;
     private _viewPieceJointeProduitDialog: boolean;
     public editPieceJointeProduit$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPieceJointeProduit:PieceJointeProduitVo ;

    // methods
    public archiver(pieceJointeProduit: PieceJointeProduitVo): Observable<PieceJointeProduitVo> {
        return this.http.put<PieceJointeProduitVo>(this.API + 'archiver/' ,pieceJointeProduit);
    }
    public desarchiver(pieceJointeProduit: PieceJointeProduitVo): Observable<PieceJointeProduitVo> {
    return this.http.put<PieceJointeProduitVo>(this.API + 'desarchiver/' ,pieceJointeProduit);
    }

    public findAll(){
     return this.http.get<Array<PieceJointeProduitVo>>(this.API);
    }

    public save(): Observable<PieceJointeProduitVo> {
           return this.http.post<PieceJointeProduitVo>(this.API, {...this.selectedPieceJointeProduit,dateCreation: moment(this.selectedPieceJointeProduit.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pieceJointeProduit: PieceJointeProduitVo) {
         return this.http.delete<number>(this.API + 'id/' + pieceJointeProduit.id);
    }


    public edit(): Observable<PieceJointeProduitVo> {
        return this.http.put<PieceJointeProduitVo>(this.API, this.selectedPieceJointeProduit);
    }


     public findByCriteria(pieceJointeProduit:PieceJointeProduitVo):Observable<Array<PieceJointeProduitVo>>{
           return this.http.post<Array<PieceJointeProduitVo>>(this.API +'search', pieceJointeProduit);
    }

   public findByIdWithAssociatedList(pieceJointeProduit:PieceJointeProduitVo):Observable<PieceJointeProduitVo>{
         return this.http.get<PieceJointeProduitVo>(this.API + 'detail/id/' +pieceJointeProduit.id);
    }

    // getters and setters


    get pieceJointeProduits(): Array<PieceJointeProduitVo> {
    if(this._pieceJointeProduits==null){
    this._pieceJointeProduits=new Array<PieceJointeProduitVo>();
    }
return this._pieceJointeProduits;
       }

    set pieceJointeProduits(value: Array<PieceJointeProduitVo>) {
        this._pieceJointeProduits = value;
       }

    get selectedPieceJointeProduit(): PieceJointeProduitVo {
    if(this._selectedPieceJointeProduit==null){
    this._selectedPieceJointeProduit=new PieceJointeProduitVo();
    }
           return this._selectedPieceJointeProduit;
       }

    set selectedPieceJointeProduit(value: PieceJointeProduitVo) {
        this._selectedPieceJointeProduit = value;
       }

    get pieceJointeProduitSelections(): Array<PieceJointeProduitVo> {
    if(this._pieceJointeProduitSelections==null){
    this._pieceJointeProduitSelections=new Array<PieceJointeProduitVo>();
    }
        return this._pieceJointeProduitSelections;
       }


    set pieceJointeProduitSelections(value: Array<PieceJointeProduitVo>) {
        this._pieceJointeProduitSelections = value;
       }

    get createPieceJointeProduitDialog(): boolean {
        return this._createPieceJointeProduitDialog;
       }

    set createPieceJointeProduitDialog(value: boolean) {
        this._createPieceJointeProduitDialog = value;
       }

    get editPieceJointeProduitDialog(): boolean {
        return this._editPieceJointeProduitDialog;
       }

    set editPieceJointeProduitDialog(value: boolean) {
        this._editPieceJointeProduitDialog = value;
       }

    get viewPieceJointeProduitDialog(): boolean {
        return this._viewPieceJointeProduitDialog;
       }

    set viewPieceJointeProduitDialog(value: boolean) {
        this._viewPieceJointeProduitDialog = value;
       }

     get searchPieceJointeProduit(): PieceJointeProduitVo {
     if(this._searchPieceJointeProduit==null){
    this._searchPieceJointeProduit=new PieceJointeProduitVo();
    }
        return this._searchPieceJointeProduit;
    }

    set searchPieceJointeProduit(value: PieceJointeProduitVo) {
        this._searchPieceJointeProduit = value;
       }

}
