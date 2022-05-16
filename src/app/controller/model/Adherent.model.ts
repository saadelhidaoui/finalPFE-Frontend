import {StatutVo} from './Statut.model';
import {QualiteVo} from './Qualite.model';
import {EtatCarteVo} from './EtatCarte.model';
import {FonctionVo} from './Fonction.model';
import {EnfantVo} from './Enfant.model';
import {ConjointVo} from './Conjoint.model';
import {VilleVo} from './Ville.model';
import {PieceJointeAdherentVo} from './PieceJointeAdherent.model';
import {User} from './User.model';



export class AdherentVo  extends User{


    public numAdhesion: string;
    public cin: string;
    public nom: string;
    public prenom: string;
    public origine: string;
    public telephone: string;
    public adresse: string;
    public ppr: string;
    public dateNaissance: Date;
    public dateArrivee: Date;
    public dateReception: Date;
    public numeroMatricule: string;
    public emailPrincipale: string;
    public credentialsNonExpired: null | boolean;
    public enabled: null | boolean;
    public accountNonExpired: null | boolean;
    public accountNonLocked: null | boolean;
    public passwordChanged: null | boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public username: string;
    public password: string;
    public role: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
                public dateNaissanceMax: string ;
                public dateNaissanceMin: string ;
                public dateArriveeMax: string ;
                public dateArriveeMin: string ;
                public dateReceptionMax: string ;
                public dateReceptionMin: string ;
                public conjointsMax: string ;
                public conjointsMin: string ;
                public pieceJointeAdherentsMax: string ;
                public pieceJointeAdherentsMin: string ;
                public createdAtMax: string ;
                public createdAtMin: string ;
                public updatedAtMax: string ;
                public updatedAtMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public villeVo: VilleVo ;
      public qualiteVo: QualiteVo ;
      public etatCarteVo: EtatCarteVo ;
      public statutVo: StatutVo ;
      public fonctionVo: FonctionVo ;
      public conjointsVo: Array<ConjointVo>;
      public enfantsVo: Array<EnfantVo>;
      public pieceJointeAdherentsVo: Array<PieceJointeAdherentVo>;

}
