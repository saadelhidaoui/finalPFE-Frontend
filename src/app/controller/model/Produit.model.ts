import {PieceJointeProduitVo} from './PieceJointeProduit.model';



export class ProduitVo {

    public id: number;

    public reference: string;
    public libelle: string;
    public dateArrivee: Date;
     public quantite: number;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateArriveeMax: string ;
                public dateArriveeMin: string ;
                public quantiteMax: string ;
                public quantiteMin: string ;
                public pieceJointeProduitsMax: string ;
                public pieceJointeProduitsMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public pieceJointeProduitsVo: Array<PieceJointeProduitVo>;

}
