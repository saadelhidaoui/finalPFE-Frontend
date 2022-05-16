import {Component, OnInit} from '@angular/core';
import {RegionService} from '../../../../../../controller/service/Region.service';
import {RegionVo} from '../../../../../../controller/model/Region.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-region-view-moderateur',
  templateUrl: './region-view-moderateur.component.html',
  styleUrls: ['./region-view-moderateur.component.css']
})
export class RegionViewModerateurComponent implements OnInit {


constructor(private datePipe: DatePipe, private regionService: RegionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewRegionDialog  = false;
}

// getters and setters

get regions(): Array<RegionVo> {
    return this.regionService.regions;
       }
set regions(value: Array<RegionVo>) {
        this.regionService.regions = value;
       }

 get selectedRegion():RegionVo {
           return this.regionService.selectedRegion;
       }
    set selectedRegion(value: RegionVo) {
        this.regionService.selectedRegion = value;
       }

   get viewRegionDialog():boolean {
           return this.regionService.viewRegionDialog;

       }
    set viewRegionDialog(value: boolean) {
        this.regionService.viewRegionDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
