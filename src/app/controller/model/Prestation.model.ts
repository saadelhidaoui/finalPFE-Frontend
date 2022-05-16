import {AdherentVo} from './Adherent.model';
import {EtatPrestationVo} from './EtatPrestation.model';
import {PieceJointePrestationVo} from './PieceJointePrestation.model';
import {NiveauImportanceVo} from './NiveauImportance.model';
import {TypePrestationVo} from './TypePrestation.model';



export class PrestationVo {

    public id: number;

    public reference: string;
    public numArrivee: string;
    public envoye: null | boolean;
    public dateEnvoi: Date;
    public dateTraitement: Date;
    public chargeCas: string;
    public resultat: null | boolean;
    public notes: string;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateEnvoiMax: string ;
                public dateEnvoiMin: string ;
                public dateTraitementMax: string ;
                public dateTraitementMin: string ;
                public pieceJointePrestationsMax: string ;
                public pieceJointePrestationsMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public etatPrestationVo: EtatPrestationVo ;
      public niveauImportanceVo: NiveauImportanceVo ;
      public typePrestationVo: TypePrestationVo ;
      public adherentVo: AdherentVo ;
      public pieceJointePrestationsVo: Array<PieceJointePrestationVo>;

}
