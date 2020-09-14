import { Component, OnInit } from '@angular/core';
import { HostelModel } from '../../hostel-management-hostel/hostel-management-hostel.model';
import { MessManageModel } from '../../mess-manage/messmanage/messmanage.model';
import { ExpenseModel } from '../../mess-manage/expense/expense.model';
import { ExpenditureService } from '../../mess-manage/expenditure/expenditure.srevice';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { PermissionService } from '../../../../shared/permission.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-expenditure',
  templateUrl: './messmanage.component.html'
})
export class MessManageComponent implements OnInit {

  hostelList: HostelModel[] = [];
  messManageList: MessManageModel[] = [];
  isSearched: boolean = false;
  results: any[] = [];
  constructor(
    private apiService: ExpenditureService,
    private reportService: ReportService,
    private loaderService: LoaderService,
    private snackBar: SnackbarService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.getHostelList();
  }

  getHostelList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getHostelList().then(res => {
      let response = res.json();
      this.loaderService.toggleLoader(false);
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        return;
      }
      this.hostelList = response;
    }).catch(e => {
      this.loaderService.toggleLoader(false);
    });
  }

  getMessManageList(hostelId: number) {
    this.loaderService.toggleLoader(true);
    this.apiService.getMessManageList(hostelId).then(res => {
      let response = res.json();
      this.loaderService.toggleLoader(false);
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        return;
      }
      this.messManageList = response;
    }).catch(e => {
      this.loaderService.toggleLoader(false);
    });
  }

  fullName(staff) {
    return staff.firstName + ' ' + (staff.middleName?staff.middleName:'') + ' ' + staff.lastName;
  }
  
  search(id) {
    this.loaderService.toggleLoader(true);
    this.reportService.getMessManageSummar(id).then(res => {
      let response = res.json();
      this.loaderService.toggleLoader(false);
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        return;
      }
      this.results = response;
      this.isSearched = true;
    }).catch(e => {
      this.loaderService.toggleLoader(false);
    });
  }
}
