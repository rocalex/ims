import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { BlockModel, HostelModel } from '../hostel-block.model';
import { HostelBlockService } from '../hostel-block.service';
import { HostelManagementHostelService } from '../../hostel-management-hostel/hostel-management-hostel.service';

@Component({
  moduleId: module.id,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  hostelList: HostelModel[] = [];
  addBlock: BlockModel = new BlockModel();
  hostelId: number;
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private snackbar: SnackbarService,
    private apiService: HostelBlockService,
    private hostelService: HostelManagementHostelService)
  { 
    this.activateRoute.params.subscribe(param => this.hostelId = param.id);
  }

  ngOnInit() {
    this.getHostelInfo();
  }

  getHostelInfo() {
    this.loaderService.toggleLoader(true);
    this.hostelService.getHostelList().then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.hostelList = response;
        this.apiService.getBookTypeById(this.hostelId).then(res1 => {
          let response1 = res1.json();
          if (response1.hasError === null || response1.hasError === undefined || !response1.hasError) {
            this.addBlock = response1;
          } else {
            this.snackbar.showSnackbar(response.message);
          }
          this.loaderService.toggleLoader(false);
        });
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['hostel', 'blocks']);
      }
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  add() {
    this.apiService.updateBookType(this.addBlock).then(res => {
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
