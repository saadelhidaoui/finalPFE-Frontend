import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PieceJointeProjetVo} from '../model/PieceJointeProjet.model';
import {ProjetVo} from '../model/Projet.model';


@Injectable({
  providedIn: 'root'
})
export class PieceJointeProjetService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pieceJointeProjet/';
        })
    }
     private _pieceJointeProjets: Array<PieceJointeProjetVo> ;
     private _selectedPieceJointeProjet: PieceJointeProjetVo;
     private _pieceJointeProjetSelections: Array<PieceJointeProjetVo>;
     private _createPieceJointeProjetDialog: boolean;
     private _editPieceJointeProjetDialog: boolean;
     private _viewPieceJointeProjetDialog: boolean;
     public editPieceJointeProjet$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPieceJointeProjet:PieceJointeProjetVo ;

    // methods
    public archiver(pieceJointeProjet: PieceJointeProjetVo): Observable<PieceJointeProjetVo> {
        return this.http.put<PieceJointeProjetVo>(this.API + 'archiver/' ,pieceJointeProjet);
    }
    public desarchiver(pieceJointeProjet: PieceJointeProjetVo): Observable<PieceJointeProjetVo> {
    return this.http.put<PieceJointeProjetVo>(this.API + 'desarchiver/' ,pieceJointeProjet);
    }

    public findAll(){
     return this.http.get<Array<PieceJointeProjetVo>>(this.API);
    }

    public save(): Observable<PieceJointeProjetVo> {
           return this.http.post<PieceJointeProjetVo>(this.API, {...this.selectedPieceJointeProjet,dateCreation: moment(this.selectedPieceJointeProjet.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pieceJointeProjet: PieceJointeProjetVo) {
         return this.http.delete<number>(this.API + 'id/' + pieceJointeProjet.id);
    }


    public edit(): Observable<PieceJointeProjetVo> {
        return this.http.put<PieceJointeProjetVo>(this.API, this.selectedPieceJointeProjet);
    }


     public findByCriteria(pieceJointeProjet:PieceJointeProjetVo):Observable<Array<PieceJointeProjetVo>>{
           return this.http.post<Array<PieceJointeProjetVo>>(this.API +'search', pieceJointeProjet);
    }

   public findByIdWithAssociatedList(pieceJointeProjet:PieceJointeProjetVo):Observable<PieceJointeProjetVo>{
         return this.http.get<PieceJointeProjetVo>(this.API + 'detail/id/' +pieceJointeProjet.id);
    }

    // getters and setters


    get pieceJointeProjets(): Array<PieceJointeProjetVo> {
    if(this._pieceJointeProjets==null){
    this._pieceJointeProjets=new Array<PieceJointeProjetVo>();
    }
return this._pieceJointeProjets;
       }

    set pieceJointeProjets(value: Array<PieceJointeProjetVo>) {
        this._pieceJointeProjets = value;
       }

    get selectedPieceJointeProjet(): PieceJointeProjetVo {
    if(this._selectedPieceJointeProjet==null){
    this._selectedPieceJointeProjet=new PieceJointeProjetVo();
    }
           return this._selectedPieceJointeProjet;
       }

    set selectedPieceJointeProjet(value: PieceJointeProjetVo) {
        this._selectedPieceJointeProjet = value;
       }

    get pieceJointeProjetSelections(): Array<PieceJointeProjetVo> {
    if(this._pieceJointeProjetSelections==null){
    this._pieceJointeProjetSelections=new Array<PieceJointeProjetVo>();
    }
        return this._pieceJointeProjetSelections;
       }


    set pieceJointeProjetSelections(value: Array<PieceJointeProjetVo>) {
        this._pieceJointeProjetSelections = value;
       }

    get createPieceJointeProjetDialog(): boolean {
        return this._createPieceJointeProjetDialog;
       }

    set createPieceJointeProjetDialog(value: boolean) {
        this._createPieceJointeProjetDialog = value;
       }

    get editPieceJointeProjetDialog(): boolean {
        return this._editPieceJointeProjetDialog;
       }

    set editPieceJointeProjetDialog(value: boolean) {
        this._editPieceJointeProjetDialog = value;
       }

    get viewPieceJointeProjetDialog(): boolean {
        return this._viewPieceJointeProjetDialog;
       }

    set viewPieceJointeProjetDialog(value: boolean) {
        this._viewPieceJointeProjetDialog = value;
       }

     get searchPieceJointeProjet(): PieceJointeProjetVo {
     if(this._searchPieceJointeProjet==null){
    this._searchPieceJointeProjet=new PieceJointeProjetVo();
    }
        return this._searchPieceJointeProjet;
    }

    set searchPieceJointeProjet(value: PieceJointeProjetVo) {
        this._searchPieceJointeProjet = value;
       }

}
