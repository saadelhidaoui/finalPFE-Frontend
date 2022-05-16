import {CentreEstivageVo} from './CentreEstivage.model';
import {EstivageVo} from './Estivage.model';



export class EstivageCentreEstivageVo {

    public id: number;

    public reference: string;
     public ordre: number;
                public ordreMax: string ;
                public ordreMin: string ;
      public centreEstivageVo: CentreEstivageVo ;
      public estivageVo: EstivageVo ;

}
