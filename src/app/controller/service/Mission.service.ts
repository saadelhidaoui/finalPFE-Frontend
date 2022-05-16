import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {MissionVo} from '../model/Mission.model';
import {VilleVo} from '../model/Ville.model';
import {ModerateurVo} from '../model/Moderateur.model';
import {PieceJointeMissionVo} from '../model/PieceJointeMission.model';


@Injectable({
  providedIn: 'root'
})
export class MissionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/mission/';
        })
    }
     private _missions: Array<MissionVo> ;
     private _selectedMission: MissionVo;
     private _missionSelections: Array<MissionVo>;
     private _createMissionDialog: boolean;
     private _editMissionDialog: boolean;
     private _viewMissionDialog: boolean;
     public editMission$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchMission:MissionVo ;

    // methods
    public archiver(mission: MissionVo): Observable<MissionVo> {
        return this.http.put<MissionVo>(this.API + 'archiver/' ,mission);
    }
    public desarchiver(mission: MissionVo): Observable<MissionVo> {
    return this.http.put<MissionVo>(this.API + 'desarchiver/' ,mission);
    }

    public findAll(){
     return this.http.get<Array<MissionVo>>(this.API);
    }

    public save(): Observable<MissionVo> {
           return this.http.post<MissionVo>(this.API, {...this.selectedMission,dateCreation: moment(this.selectedMission.dateCreation).format("YYYY-MM-DD")});
    }

    delete(mission: MissionVo) {
         return this.http.delete<number>(this.API + 'id/' + mission.id);
    }


    public edit(): Observable<MissionVo> {
        return this.http.put<MissionVo>(this.API, this.selectedMission);
    }


     public findByCriteria(mission:MissionVo):Observable<Array<MissionVo>>{
           return this.http.post<Array<MissionVo>>(this.API +'search', mission);
    }

   public findByIdWithAssociatedList(mission:MissionVo):Observable<MissionVo>{
         return this.http.get<MissionVo>(this.API + 'detail/id/' +mission.id);
    }

    // getters and setters


    get missions(): Array<MissionVo> {
    if(this._missions==null){
    this._missions=new Array<MissionVo>();
    }
return this._missions;
       }

    set missions(value: Array<MissionVo>) {
        this._missions = value;
       }

    get selectedMission(): MissionVo {
    if(this._selectedMission==null){
    this._selectedMission=new MissionVo();
    }
           return this._selectedMission;
       }

    set selectedMission(value: MissionVo) {
        this._selectedMission = value;
       }

    get missionSelections(): Array<MissionVo> {
    if(this._missionSelections==null){
    this._missionSelections=new Array<MissionVo>();
    }
        return this._missionSelections;
       }


    set missionSelections(value: Array<MissionVo>) {
        this._missionSelections = value;
       }

    get createMissionDialog(): boolean {
        return this._createMissionDialog;
       }

    set createMissionDialog(value: boolean) {
        this._createMissionDialog = value;
       }

    get editMissionDialog(): boolean {
        return this._editMissionDialog;
       }

    set editMissionDialog(value: boolean) {
        this._editMissionDialog = value;
       }

    get viewMissionDialog(): boolean {
        return this._viewMissionDialog;
       }

    set viewMissionDialog(value: boolean) {
        this._viewMissionDialog = value;
       }

     get searchMission(): MissionVo {
     if(this._searchMission==null){
    this._searchMission=new MissionVo();
    }
        return this._searchMission;
    }

    set searchMission(value: MissionVo) {
        this._searchMission = value;
       }

}
