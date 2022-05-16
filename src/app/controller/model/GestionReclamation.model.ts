import {ReclamationVo} from './Reclamation.model';
import {ModerateurVo} from './Moderateur.model';



export class GestionReclamationVo {

    public id: number;

    public reference: string;
    public dateTraitement: Date;
                public dateTraitementMax: string ;
                public dateTraitementMin: string ;
      public moderateurVo: ModerateurVo ;
      public reclamationVo: ReclamationVo ;

}
