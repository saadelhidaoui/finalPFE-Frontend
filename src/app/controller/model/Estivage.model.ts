import {CentreEstivageVo} from './CentreEstivage.model';
import {NiveauImportanceVo} from './NiveauImportance.model';



export class EstivageVo {

    public id: number;

    public reference: string;
    public numArrivee: string;
    public envoye: null | boolean;
    public dateEnvoi: Date;
    public notes: string;
    public chargeCas: string;
    public resultat: null | boolean;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateEnvoiMax: string ;
                public dateEnvoiMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public centreEstivageVo: CentreEstivageVo ;
      public niveauImportanceVo: NiveauImportanceVo ;

}
