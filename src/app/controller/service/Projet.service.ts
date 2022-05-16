import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ProjetVo} from '../model/Projet.model';
import {PieceJointeProjetVo} from '../model/PieceJointeProjet.model';
import {EtatProjetVo} from '../model/EtatProjet.model';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/projet/';
        })
    }
     private _projets: Array<ProjetVo> ;
     private _selectedProjet: ProjetVo;
     private _projetSelections: Array<ProjetVo>;
     private _createProjetDialog: boolean;
     private _editProjetDialog: boolean;
     private _viewProjetDialog: boolean;
     public editProjet$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchProjet:ProjetVo ;

    // methods
    public archiver(projet: ProjetVo): Observable<ProjetVo> {
        return this.http.put<ProjetVo>(this.API + 'archiver/' ,projet);
    }
    public desarchiver(projet: ProjetVo): Observable<ProjetVo> {
    return this.http.put<ProjetVo>(this.API + 'desarchiver/' ,projet);
    }

    public findAll(){
     return this.http.get<Array<ProjetVo>>(this.API);
    }

    public save(): Observable<ProjetVo> {
           return this.http.post<ProjetVo>(this.API, {...this.selectedProjet,dateCreation: moment(this.selectedProjet.dateCreation).format("YYYY-MM-DD")});
    }

    delete(projet: ProjetVo) {
         return this.http.delete<number>(this.API + 'id/' + projet.id);
    }


    public edit(): Observable<ProjetVo> {
        return this.http.put<ProjetVo>(this.API, this.selectedProjet);
    }


     public findByCriteria(projet:ProjetVo):Observable<Array<ProjetVo>>{
           return this.http.post<Array<ProjetVo>>(this.API +'search', projet);
    }

   public findByIdWithAssociatedList(projet:ProjetVo):Observable<ProjetVo>{
         return this.http.get<ProjetVo>(this.API + 'detail/id/' +projet.id);
    }

    // getters and setters


    get projets(): Array<ProjetVo> {
    if(this._projets==null){
    this._projets=new Array<ProjetVo>();
    }
return this._projets;
       }

    set projets(value: Array<ProjetVo>) {
        this._projets = value;
       }

    get selectedProjet(): ProjetVo {
    if(this._selectedProjet==null){
    this._selectedProjet=new ProjetVo();
    }
           return this._selectedProjet;
       }

    set selectedProjet(value: ProjetVo) {
        this._selectedProjet = value;
       }

    get projetSelections(): Array<ProjetVo> {
    if(this._projetSelections==null){
    this._projetSelections=new Array<ProjetVo>();
    }
        return this._projetSelections;
       }


    set projetSelections(value: Array<ProjetVo>) {
        this._projetSelections = value;
       }

    get createProjetDialog(): boolean {
        return this._createProjetDialog;
       }

    set createProjetDialog(value: boolean) {
        this._createProjetDialog = value;
       }

    get editProjetDialog(): boolean {
        return this._editProjetDialog;
       }

    set editProjetDialog(value: boolean) {
        this._editProjetDialog = value;
       }

    get viewProjetDialog(): boolean {
        return this._viewProjetDialog;
       }

    set viewProjetDialog(value: boolean) {
        this._viewProjetDialog = value;
       }

     get searchProjet(): ProjetVo {
     if(this._searchProjet==null){
    this._searchProjet=new ProjetVo();
    }
        return this._searchProjet;
    }

    set searchProjet(value: ProjetVo) {
        this._searchProjet = value;
       }

}
