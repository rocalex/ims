import { Component, OnInit } from '@angular/core';
import { BlockModel, FloorDisplayModel } from './hostel-floor.model';
import { FloorRoomService } from './hostel-floor.service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { LoaderService } from '../../../shared/loader-service';

@Component({
  moduleId: module.id,
  templateUrl: './hostel-floor.component.html',
  styleUrls: ['./hostel-floor.component.css']
})
export class HostelFloorComponent implements OnInit {

  blockList: BlockModel[] = [];
  floorDisplayList: FloorDisplayModel[] = [];

  constructor(
    private snackBar: SnackbarService,
    private loader: LoaderService,
    private apiService: FloorRoomService
  ) { }

  ngOnInit() {
    this.getBlockList();
  }

  getBlockList() {
    this.loader.toggleLoader(true);
    this.apiService.getFloorsForLoggedInUser().then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.blockList = response;
        this.blockList.map(block => {
          for(var i=0; i<block.floorAmount; i++) {
            let floor: FloorDisplayModel = new FloorDisplayModel();
            floor.blockId = block.id;
            floor.blockName = block.name;
            floor.hostelName = block.hostel.name;
            floor.floorNo = i + 1;
            floor.floorName = `Floor ${(i + 1)}`;
            this.floorDisplayList.push(floor);
          }
        });
      }
      else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loader.toggleLoader(false);
    })
    .catch((err) => {
        this.loader.toggleLoader(false);
    });
  }
}
