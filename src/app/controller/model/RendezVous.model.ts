import {PieceJointeRendezVousVo} from './PieceJointeRendezVous.model';



export class RendezVousVo {

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
                public pieceJointeRendezVousMax: string ;
                public pieceJointeRendezVousMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public pieceJointeRendezVousVo: Array<PieceJointeRendezVousVo>;

}
