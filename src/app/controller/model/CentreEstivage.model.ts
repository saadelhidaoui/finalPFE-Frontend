import {VilleVo} from './Ville.model';



export class CentreEstivageVo {

    public id: number;

    public reference: string;
     public capacite: number;
    public libelle: string;
    public vip: null | boolean;
                public capaciteMax: string ;
                public capaciteMin: string ;
      public villeVo: VilleVo ;

}
