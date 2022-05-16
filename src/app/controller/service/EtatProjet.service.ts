import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatProjetVo} from '../model/EtatProjet.model';


@Injectable({
  providedIn: 'root'
})
export class EtatProjetService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatProjet/';
        })
    }
     private _etatProjets: Array<EtatProjetVo> ;
     private _selectedEtatProjet: EtatProjetVo;
     private _etatProjetSelections: Array<EtatProjetVo>;
     private _createEtatProjetDialog: boolean;
     private _editEtatProjetDialog: boolean;
     private _viewEtatProjetDialog: boolean;
     public editEtatProjet$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatProjet:EtatProjetVo ;

    // methods
    public archiver(etatProjet: EtatProjetVo): Observable<EtatProjetVo> {
        return this.http.put<EtatProjetVo>(this.API + 'archiver/' ,etatProjet);
    }
    public desarchiver(etatProjet: EtatProjetVo): Observable<EtatProjetVo> {
    return this.http.put<EtatProjetVo>(this.API + 'desarchiver/' ,etatProjet);
    }

    public findAll(){
     return this.http.get<Array<EtatProjetVo>>(this.API);
    }

    public save(): Observable<EtatProjetVo> {
           return this.http.post<EtatProjetVo>(this.API, {...this.selectedEtatProjet,dateCreation: moment(this.selectedEtatProjet.dateCreation).format("YYYY-MM-DD")});
    }

    delete(etatProjet: EtatProjetVo) {
         return this.http.delete<number>(this.API + 'id/' + etatProjet.id);
    }


    public edit(): Observable<EtatProjetVo> {
        return this.http.put<EtatProjetVo>(this.API, this.selectedEtatProjet);
    }


     public findByCriteria(etatProjet:EtatProjetVo):Observable<Array<EtatProjetVo>>{
           return this.http.post<Array<EtatProjetVo>>(this.API +'search', etatProjet);
    }

   public findByIdWithAssociatedList(etatProjet:EtatProjetVo):Observable<EtatProjetVo>{
         return this.http.get<EtatProjetVo>(this.API + 'detail/id/' +etatProjet.id);
    }

    // getters and setters


    get etatProjets(): Array<EtatProjetVo> {
    if(this._etatProjets==null){
    this._etatProjets=new Array<EtatProjetVo>();
    }
return this._etatProjets;
       }

    set etatProjets(value: Array<EtatProjetVo>) {
        this._etatProjets = value;
       }

    get selectedEtatProjet(): EtatProjetVo {
    if(this._selectedEtatProjet==null){
    this._selectedEtatProjet=new EtatProjetVo();
    }
           return this._selectedEtatProjet;
       }

    set selectedEtatProjet(value: EtatProjetVo) {
        this._selectedEtatProjet = value;
       }

    get etatProjetSelections(): Array<EtatProjetVo> {
    if(this._etatProjetSelections==null){
    this._etatProjetSelections=new Array<EtatProjetVo>();
    }
        return this._etatProjetSelections;
       }


    set etatProjetSelections(value: Array<EtatProjetVo>) {
        this._etatProjetSelections = value;
       }

    get createEtatProjetDialog(): boolean {
        return this._createEtatProjetDialog;
       }

    set createEtatProjetDialog(value: boolean) {
        this._createEtatProjetDialog = value;
       }

    get editEtatProjetDialog(): boolean {
        return this._editEtatProjetDialog;
       }

    set editEtatProjetDialog(value: boolean) {
        this._editEtatProjetDialog = value;
       }

    get viewEtatProjetDialog(): boolean {
        return this._viewEtatProjetDialog;
       }

    set viewEtatProjetDialog(value: boolean) {
        this._viewEtatProjetDialog = value;
       }

     get searchEtatProjet(): EtatProjetVo {
     if(this._searchEtatProjet==null){
    this._searchEtatProjet=new EtatProjetVo();
    }
        return this._searchEtatProjet;
    }

    set searchEtatProjet(value: EtatProjetVo) {
        this._searchEtatProjet = value;
       }

}
