import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PieceJointeMissionVo} from '../model/PieceJointeMission.model';
import {MissionVo} from '../model/Mission.model';


@Injectable({
  providedIn: 'root'
})
export class PieceJointeMissionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/pieceJointeMission/';
        })
    }
     private _pieceJointeMissions: Array<PieceJointeMissionVo> ;
     private _selectedPieceJointeMission: PieceJointeMissionVo;
     private _pieceJointeMissionSelections: Array<PieceJointeMissionVo>;
     private _createPieceJointeMissionDialog: boolean;
     private _editPieceJointeMissionDialog: boolean;
     private _viewPieceJointeMissionDialog: boolean;
     public editPieceJointeMission$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPieceJointeMission:PieceJointeMissionVo ;

    // methods
    public archiver(pieceJointeMission: PieceJointeMissionVo): Observable<PieceJointeMissionVo> {
        return this.http.put<PieceJointeMissionVo>(this.API + 'archiver/' ,pieceJointeMission);
    }
    public desarchiver(pieceJointeMission: PieceJointeMissionVo): Observable<PieceJointeMissionVo> {
    return this.http.put<PieceJointeMissionVo>(this.API + 'desarchiver/' ,pieceJointeMission);
    }

    public findAll(){
     return this.http.get<Array<PieceJointeMissionVo>>(this.API);
    }

    public save(): Observable<PieceJointeMissionVo> {
           return this.http.post<PieceJointeMissionVo>(this.API, {...this.selectedPieceJointeMission,dateCreation: moment(this.selectedPieceJointeMission.dateCreation).format("YYYY-MM-DD")});
    }

    delete(pieceJointeMission: PieceJointeMissionVo) {
         return this.http.delete<number>(this.API + 'id/' + pieceJointeMission.id);
    }


    public edit(): Observable<PieceJointeMissionVo> {
        return this.http.put<PieceJointeMissionVo>(this.API, this.selectedPieceJointeMission);
    }


     public findByCriteria(pieceJointeMission:PieceJointeMissionVo):Observable<Array<PieceJointeMissionVo>>{
           return this.http.post<Array<PieceJointeMissionVo>>(this.API +'search', pieceJointeMission);
    }

   public findByIdWithAssociatedList(pieceJointeMission:PieceJointeMissionVo):Observable<PieceJointeMissionVo>{
         return this.http.get<PieceJointeMissionVo>(this.API + 'detail/id/' +pieceJointeMission.id);
    }

    // getters and setters


    get pieceJointeMissions(): Array<PieceJointeMissionVo> {
    if(this._pieceJointeMissions==null){
    this._pieceJointeMissions=new Array<PieceJointeMissionVo>();
    }
return this._pieceJointeMissions;
       }

    set pieceJointeMissions(value: Array<PieceJointeMissionVo>) {
        this._pieceJointeMissions = value;
       }

    get selectedPieceJointeMission(): PieceJointeMissionVo {
    if(this._selectedPieceJointeMission==null){
    this._selectedPieceJointeMission=new PieceJointeMissionVo();
    }
           return this._selectedPieceJointeMission;
       }

    set selectedPieceJointeMission(value: PieceJointeMissionVo) {
        this._selectedPieceJointeMission = value;
       }

    get pieceJointeMissionSelections(): Array<PieceJointeMissionVo> {
    if(this._pieceJointeMissionSelections==null){
    this._pieceJointeMissionSelections=new Array<PieceJointeMissionVo>();
    }
        return this._pieceJointeMissionSelections;
       }


    set pieceJointeMissionSelections(value: Array<PieceJointeMissionVo>) {
        this._pieceJointeMissionSelections = value;
       }

    get createPieceJointeMissionDialog(): boolean {
        return this._createPieceJointeMissionDialog;
       }

    set createPieceJointeMissionDialog(value: boolean) {
        this._createPieceJointeMissionDialog = value;
       }

    get editPieceJointeMissionDialog(): boolean {
        return this._editPieceJointeMissionDialog;
       }

    set editPieceJointeMissionDialog(value: boolean) {
        this._editPieceJointeMissionDialog = value;
       }

    get viewPieceJointeMissionDialog(): boolean {
        return this._viewPieceJointeMissionDialog;
       }

    set viewPieceJointeMissionDialog(value: boolean) {
        this._viewPieceJointeMissionDialog = value;
       }

     get searchPieceJointeMission(): PieceJointeMissionVo {
     if(this._searchPieceJointeMission==null){
    this._searchPieceJointeMission=new PieceJointeMissionVo();
    }
        return this._searchPieceJointeMission;
    }

    set searchPieceJointeMission(value: PieceJointeMissionVo) {
        this._searchPieceJointeMission = value;
       }

}
