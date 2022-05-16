import {PieceJointeProjetVo} from './PieceJointeProjet.model';
import {EtatProjetVo} from './EtatProjet.model';



export class ProjetVo {

    public id: number;

    public reference: string;
    public description: string;
    public dateDebut: Date;
    public pv: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateDebutMax: string ;
                public dateDebutMin: string ;
                public pieceJointeProjetsMax: string ;
                public pieceJointeProjetsMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public etatProjetVo: EtatProjetVo ;
      public pieceJointeProjetsVo: Array<PieceJointeProjetVo>;

}
