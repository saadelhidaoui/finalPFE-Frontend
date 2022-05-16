import {AdherentVo} from './Adherent.model';
import {QualiteVo} from './Qualite.model';



export class ConjointVo {

    public id: number;

    public cin: string;
    public nom: string;
    public prenom: string;
    public origin: string;
    public email: string;
    public telephone: string;
      public qualiteVo: QualiteVo ;
      public adherentVo: AdherentVo ;

}
