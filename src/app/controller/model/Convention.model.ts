import {OrganismeVo} from './Organisme.model';
import {PieceJointeConventionVo} from './PieceJointeConvention.model';



export class ConventionVo {

    public id: number;

    public reference: string;
    public libelle: string;
    public description: string;
    public dateDebut: Date;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateDebutMax: string ;
                public dateDebutMin: string ;
                public pieceJointeConventionsMax: string ;
                public pieceJointeConventionsMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public organismeVo: OrganismeVo ;
      public pieceJointeConventionsVo: Array<PieceJointeConventionVo>;

}
