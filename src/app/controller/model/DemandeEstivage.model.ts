import {AdherentVo} from './Adherent.model';
import {EtatDemandeEstivageVo} from './EtatDemandeEstivage.model';
import {PieceJointeEstivageVo} from './PieceJointeEstivage.model';
import {DemandeEstivageCentreVo} from './DemandeEstivageCentre.model';
import {EstivageCentreEstivageVo} from './EstivageCentreEstivage.model';



export class DemandeEstivageVo {

    public id: number;

    public reference: string;
    public dateDebutEstivage: Date;
    public dateFinEstivage: Date;
    public dateTraitement: Date;
                public dateDebutEstivageMax: string ;
                public dateDebutEstivageMin: string ;
                public dateFinEstivageMax: string ;
                public dateFinEstivageMin: string ;
                public dateTraitementMax: string ;
                public dateTraitementMin: string ;
                public pieceJointeEstivagesMax: string ;
                public pieceJointeEstivagesMin: string ;
      public demandeEstivageCentreVo: DemandeEstivageCentreVo ;
      public adherentVo: AdherentVo ;
      public etatDemandeEstivageVo: EtatDemandeEstivageVo ;
      public estivageCentreEstivageVo: EstivageCentreEstivageVo ;
      public pieceJointeEstivagesVo: Array<PieceJointeEstivageVo>;

}
