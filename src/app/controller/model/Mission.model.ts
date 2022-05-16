import {VilleVo} from './Ville.model';
import {ModerateurVo} from './Moderateur.model';
import {PieceJointeMissionVo} from './PieceJointeMission.model';



export class MissionVo {

    public id: number;

    public reference: string;
    public dateDebut: Date;
    public dateFin: Date;
    public moyenDeTransport: string;
     public distance: number;
    public pv: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateDebutMax: string ;
                public dateDebutMin: string ;
                public dateFinMax: string ;
                public dateFinMin: string ;
                public distanceMax: string ;
                public distanceMin: string ;
                public pieceJointeMissionsMax: string ;
                public pieceJointeMissionsMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public villeVo: VilleVo ;
      public moderateurVo: ModerateurVo ;
      public pieceJointeMissionsVo: Array<PieceJointeMissionVo>;

}
