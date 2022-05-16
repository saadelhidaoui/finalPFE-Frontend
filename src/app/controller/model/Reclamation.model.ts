import {AdherentVo} from './Adherent.model';
import {PieceJointeReclamationVo} from './PieceJointeReclamation.model';
import {EtatReclamationVo} from './EtatReclamation.model';



export class ReclamationVo {

    public id: number;

    public reference: string;
    public libelle: string;
    public description: string;
    public dateReclamation: Date;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateReclamationMax: string ;
                public dateReclamationMin: string ;
                public pieceJointeReclamationsMax: string ;
                public pieceJointeReclamationsMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public adherentVo: AdherentVo ;
      public etatReclamationVo: EtatReclamationVo ;
      public pieceJointeReclamationsVo: Array<PieceJointeReclamationVo>;

}
