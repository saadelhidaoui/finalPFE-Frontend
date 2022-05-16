import {AdherentVo} from './Adherent.model';
import {QualiteVo} from './Qualite.model';



export class EnfantVo {

    public id: number;

    public reference: string;
    public nom: string;
    public prenom: string;
     public age: number;
    public dateNaissance: Date;
    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public ageMax: string ;
                public ageMin: string ;
                public dateNaissanceMax: string ;
                public dateNaissanceMin: string ;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public qualiteVo: QualiteVo ;
      public adherentVo: AdherentVo ;

}
