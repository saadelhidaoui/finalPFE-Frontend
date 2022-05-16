import {ProfilVo} from './Profil.model';
import {SituationModerateurVo} from './SituationModerateur.model';
import {User} from './User.model';



export class ChercheurVo  extends User{


    public numeroMatricule: string;
    public emailPrincipale: string;
    public credentialsNonExpired: null | boolean;
    public enabled: null | boolean;
    public accountNonExpired: null | boolean;
    public accountNonLocked: null | boolean;
    public passwordChanged: null | boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public username: string;
    public password: string;
    public prenom: string;
    public nom: string;
    public role: string;
                public createdAtMax: string ;
                public createdAtMin: string ;
                public updatedAtMax: string ;
                public updatedAtMin: string ;
      public situationModerateurVo: SituationModerateurVo ;
      public profilVo: ProfilVo ;

}
