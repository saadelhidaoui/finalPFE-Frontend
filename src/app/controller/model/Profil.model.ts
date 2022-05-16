import {GradeVo} from './Grade.model';
import {EchelleVo} from './Echelle.model';



export class ProfilVo {

    public id: number;

    public reference: string;
    public libelle: string;
      public gradeVo: GradeVo ;
      public echelleVo: EchelleVo ;

}
