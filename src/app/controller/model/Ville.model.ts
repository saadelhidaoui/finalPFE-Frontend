import {MissionVo} from './Mission.model';
import {RegionVo} from './Region.model';



export class VilleVo {

    public id: number;

    public reference: string;
    public libelle: string;
      public regionVo: RegionVo ;
      public missionsVo: Array<MissionVo>;

}
