import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { BlockModel, HostelModel } from '../hostel-block.model';
import { HostelBlockService } from '../hostel-block.service';
import { HostelManagementHostelService } from '../../hostel-management-hostel/hostel-management-hostel.service';

@Component({
  moduleId: module.id,
  templateUrl: './hostel-block-add.component.html',
  styleUrls: ['./hostel-block-add.component.css']
})
export class HostelBlockAddComponent implements OnInit {
  
  hostelList: HostelModel[] = [];
  addBlock: BlockModel = new BlockModel();
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private snackbar: SnackbarService,
    private apiService: HostelBlockService,
    private hostelService: HostelManagementHostelService) { }

  ngOnInit() {
    this.getHostelInfo();
  }

  getHostelInfo() {
    this.loaderService.toggleLoader(true);
    this.hostelService.getHostelList().then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.hostelList = response;
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['hostel', 'blocks']);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  add() {
    this.apiService.addBookType(this.addBlock).then(res => {
      let response = res.json();
      console.log(response);
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['hostel', 'blocks']);
      }
      else {
        this.snackbar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  checkWhiteSpace(nameModel: any, name: string) {
    if (name) {
      if (name.trim() === '') {
        nameModel.whiteSpaceError = true;
      } else {
        nameModel.whiteSpaceError = false;
      }
    }
  }

}
