import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RendezVousVo} from '../model/RendezVous.model';
import {PieceJointeRendezVousVo} from '../model/PieceJointeRendezVous.model';


@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rendezVous/';
        })
    }
     private _rendezVouss: Array<RendezVousVo> ;
     private _selectedRendezVous: RendezVousVo;
     private _rendezVousSelections: Array<RendezVousVo>;
     private _createRendezVousDialog: boolean;
     private _editRendezVousDialog: boolean;
     private _viewRendezVousDialog: boolean;
     public editRendezVous$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRendezVous:RendezVousVo ;

    // methods
    public archiver(rendezVous: RendezVousVo): Observable<RendezVousVo> {
        return this.http.put<RendezVousVo>(this.API + 'archiver/' ,rendezVous);
    }
    public desarchiver(rendezVous: RendezVousVo): Observable<RendezVousVo> {
    return this.http.put<RendezVousVo>(this.API + 'desarchiver/' ,rendezVous);
    }

    public findAll(){
     return this.http.get<Array<RendezVousVo>>(this.API);
    }

    public save(): Observable<RendezVousVo> {
           return this.http.post<RendezVousVo>(this.API, {...this.selectedRendezVous,dateCreation: moment(this.selectedRendezVous.dateCreation).format("YYYY-MM-DD")});
    }

    delete(rendezVous: RendezVousVo) {
         return this.http.delete<number>(this.API + 'id/' + rendezVous.id);
    }


    public edit(): Observable<RendezVousVo> {
        return this.http.put<RendezVousVo>(this.API, this.selectedRendezVous);
    }


     public findByCriteria(rendezVous:RendezVousVo):Observable<Array<RendezVousVo>>{
           return this.http.post<Array<RendezVousVo>>(this.API +'search', rendezVous);
    }

   public findByIdWithAssociatedList(rendezVous:RendezVousVo):Observable<RendezVousVo>{
         return this.http.get<RendezVousVo>(this.API + 'detail/id/' +rendezVous.id);
    }

    // getters and setters


    get rendezVouss(): Array<RendezVousVo> {
    if(this._rendezVouss==null){
    this._rendezVouss=new Array<RendezVousVo>();
    }
return this._rendezVouss;
       }

    set rendezVouss(value: Array<RendezVousVo>) {
        this._rendezVouss = value;
       }

    get selectedRendezVous(): RendezVousVo {
    if(this._selectedRendezVous==null){
    this._selectedRendezVous=new RendezVousVo();
    }
           return this._selectedRendezVous;
       }

    set selectedRendezVous(value: RendezVousVo) {
        this._selectedRendezVous = value;
       }

    get rendezVousSelections(): Array<RendezVousVo> {
    if(this._rendezVousSelections==null){
    this._rendezVousSelections=new Array<RendezVousVo>();
    }
        return this._rendezVousSelections;
       }


    set rendezVousSelections(value: Array<RendezVousVo>) {
        this._rendezVousSelections = value;
       }

    get createRendezVousDialog(): boolean {
        return this._createRendezVousDialog;
       }

    set createRendezVousDialog(value: boolean) {
        this._createRendezVousDialog = value;
       }

    get editRendezVousDialog(): boolean {
        return this._editRendezVousDialog;
       }

    set editRendezVousDialog(value: boolean) {
        this._editRendezVousDialog = value;
       }

    get viewRendezVousDialog(): boolean {
        return this._viewRendezVousDialog;
       }

    set viewRendezVousDialog(value: boolean) {
        this._viewRendezVousDialog = value;
       }

     get searchRendezVous(): RendezVousVo {
     if(this._searchRendezVous==null){
    this._searchRendezVous=new RendezVousVo();
    }
        return this._searchRendezVous;
    }

    set searchRendezVous(value: RendezVousVo) {
        this._searchRendezVous = value;
       }

}
