import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { MessManageService } from './messmanage.service';
import { SearchMessRequest, MessManageModel, MessMappingModel, AddMessRequest } from './messmanage.model';
import { HostelModel } from '../../hostel-management-hostel/hostel-management-hostel.model';
import { StaffModel } from '../../../library/issuebook/issuebook.model';

@Component({
  selector: 'app-messmanage',
  templateUrl: './messmanage.component.html',
  styleUrls: ['./messmanage.component.css']
})
export class MessmanageComponent implements OnInit {

  hostelList: HostelModel[] = [];
  searchMess: SearchMessRequest = new SearchMessRequest();
  messManages: MessMappingModel[] = [];
  todayDate: Date = new Date();
  isSearched: boolean = false;
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private apiService: MessManageService,
    private snackService: SnackbarService) { }

  ngOnInit() {
    this.getHostelList();
  }

  getHostelList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getHostelList().then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackService.showSnackbar(response.message);
        this.loaderService.toggleLoader(false);
        return;
      }
      this.hostelList = response;
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }

  search() {
    this.loaderService.toggleLoader(true);
    this.apiService.getMessManage(this.searchMess).then(res => {
      let response = res.json();
      this.loaderService.toggleLoader(false);
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackService.showSnackbar(response.message);
        return;
      }
      this.messManages = response;
      this.isSearched = true;
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }
  
  fullName(staff: StaffModel) {
    return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
  }

  save() {
    this.loaderService.toggleLoader(true);
    var request = new AddMessRequest();
    request.fromDate = this.searchMess.fromDate;
    request.toDate = this.searchMess.toDate;
    request.hostelId = this.searchMess.hostelId;
    request.mappings = this.messManages;

    console.log(request);
    this.apiService.addMessManages(request).then(res => {
      let response = res.json();
      this.loaderService.toggleLoader(false);
      this.snackService.showSnackbar(response.message);
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        return;
      }
      this.messManages = [];
      this.isSearched = false;
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }
}
