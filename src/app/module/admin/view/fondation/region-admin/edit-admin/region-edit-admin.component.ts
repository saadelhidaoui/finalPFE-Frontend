import {Component, OnInit} from '@angular/core';
import {RegionService} from '../../../../../../controller/service/Region.service';
import {RegionVo} from '../../../../../../controller/model/Region.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-region-edit-admin',
  templateUrl: './region-edit-admin.component.html',
  styleUrls: ['./region-edit-admin.component.css']
})
export class RegionEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private regionService: RegionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.regionService.edit().subscribe(region=>{
    const myIndex = this.regions.findIndex(e => e.id === this.selectedRegion.id);
    this.regions[myIndex] = this.selectedRegion;
    this.editRegionDialog = false;
    this.selectedRegion = new RegionVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editRegionDialog  = false;
}

// getters and setters

get regions(): Array<RegionVo> {
    return this.regionService.regions;
       }
set regions(value: Array<RegionVo>) {
        this.regionService.regions = value;
       }

 get selectedRegion(): RegionVo {
           return this.regionService.selectedRegion;
       }
    set selectedRegion(value: RegionVo) {
        this.regionService.selectedRegion = value;
       }

   get editRegionDialog(): boolean {
           return this.regionService.editRegionDialog;

       }
    set editRegionDialog(value: boolean) {
        this.regionService.editRegionDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
