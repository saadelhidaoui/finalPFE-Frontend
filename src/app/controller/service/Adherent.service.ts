import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {AdherentVo} from '../model/Adherent.model';
import {StatutVo} from '../model/Statut.model';
import {QualiteVo} from '../model/Qualite.model';
import {EtatCarteVo} from '../model/EtatCarte.model';
import {FonctionVo} from '../model/Fonction.model';
import {EnfantVo} from '../model/Enfant.model';
import {ConjointVo} from '../model/Conjoint.model';
import {VilleVo} from '../model/Ville.model';
import {PieceJointeAdherentVo} from '../model/PieceJointeAdherent.model';


@Injectable({
    providedIn: 'root'
})
export class AdherentService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/adherent/';
        });
    }

    private _adherents: Array<AdherentVo>;
    private _selectedAdherent: AdherentVo;
    private _adherentSelections: Array<AdherentVo>;
    private _createAdherentDialog: boolean;
    private _editAdherentDialog: boolean;
    private _viewAdherentDialog: boolean;
    public editAdherent$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchAdherent: AdherentVo;
    private _switchChercheurDialog: boolean;

    // methods
    public archiver(adherent: AdherentVo): Observable<AdherentVo> {
        return this.http.put<AdherentVo>(this.API + 'archiver/', adherent);
    }

    public desarchiver(adherent: AdherentVo): Observable<AdherentVo> {
        return this.http.put<AdherentVo>(this.API + 'desarchiver/', adherent);
    }

    public findAll() {
        return this.http.get<Array<AdherentVo>>(this.API);
    }

    public save(): Observable<AdherentVo> {
        return this.http.post<AdherentVo>(this.API, {
            ...this.selectedAdherent,
            dateCreation: moment(this.selectedAdherent.dateCreation).format('YYYY-MM-DD')
        });
    }

    delete(adherent: AdherentVo) {
        return this.http.delete<number>(this.API + 'id/' + adherent.id);
    }


    public edit(): Observable<AdherentVo> {
        return this.http.put<AdherentVo>(this.API, this.selectedAdherent);
    }


    public findByCriteria(adherent: AdherentVo): Observable<Array<AdherentVo>> {
        return this.http.post<Array<AdherentVo>>(this.API + 'search', adherent);
    }

    public findByIdWithAssociatedList(adherent: AdherentVo): Observable<AdherentVo> {
        return this.http.get<AdherentVo>(this.API + 'detail/id/' + adherent.id);
    }

    // getters and setters


    get adherents(): Array<AdherentVo> {
        if (this._adherents == null) {
            this._adherents = new Array<AdherentVo>();
        }
        return this._adherents;
    }

    set adherents(value: Array<AdherentVo>) {
        this._adherents = value;
    }

    get selectedAdherent(): AdherentVo {
        if (this._selectedAdherent == null) {
            this._selectedAdherent = new AdherentVo();
        }
        return this._selectedAdherent;
    }

    set selectedAdherent(value: AdherentVo) {
        this._selectedAdherent = value;
    }

    get adherentSelections(): Array<AdherentVo> {
        if (this._adherentSelections == null) {
            this._adherentSelections = new Array<AdherentVo>();
        }
        return this._adherentSelections;
    }


    set adherentSelections(value: Array<AdherentVo>) {
        this._adherentSelections = value;
    }

    get createAdherentDialog(): boolean {
        return this._createAdherentDialog;
    }

    set createAdherentDialog(value: boolean) {
        this._createAdherentDialog = value;
    }

    get editAdherentDialog(): boolean {
        return this._editAdherentDialog;
    }

    set editAdherentDialog(value: boolean) {
        this._editAdherentDialog = value;
    }

    get viewAdherentDialog(): boolean {
        return this._viewAdherentDialog;
    }

    set viewAdherentDialog(value: boolean) {
        this._viewAdherentDialog = value;
    }

    get searchAdherent(): AdherentVo {
        if (this._searchAdherent == null) {
            this._searchAdherent = new AdherentVo();
        }
        return this._searchAdherent;
    }

    set searchAdherent(value: AdherentVo) {
        this._searchAdherent = value;
    }

    get switchChercheurDialog(): boolean {
        return this._switchChercheurDialog;
    }

    set switchChercheurDialog(value: boolean) {
        this._switchChercheurDialog = value;
    }
}
