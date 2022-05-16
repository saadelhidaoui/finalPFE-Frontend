import {RendezVousVo} from './RendezVous.model';



export class PieceJointeRendezVousVo {

    public id: number;

    public path: string;
    public dateAjout: Date;
    public libelle: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateAjoutMax: string ;
                public dateAjoutMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public rendezVousVo: RendezVousVo ;

}
