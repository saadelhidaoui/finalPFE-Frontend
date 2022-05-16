import {EtatTacheVo} from './EtatTache.model';
import {ModerateurVo} from './Moderateur.model';



export class TacheVo {

    public id: number;

    public reference: string;
    public dateTache: Date;
    public description: string;
                public dateTacheMax: string ;
                public dateTacheMin: string ;
      public etatTacheVo: EtatTacheVo ;
      public moderateurVo: ModerateurVo ;

}
