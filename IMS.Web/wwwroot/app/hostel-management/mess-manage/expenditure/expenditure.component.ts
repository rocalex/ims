import { Component, OnInit } from '@angular/core';
import { HostelModel } from '../../hostel-management-hostel/hostel-management-hostel.model';
import { MessManageModel } from '../messmanage/messmanage.model';
import { ExpenseModel } from '../expense/expense.model';
import { ExpenditureService } from './expenditure.srevice';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { PermissionService } from '../../../../shared/permission.service';
import { SearchExpenditureModel, SearchExpenditureResultModel } from './expenditure.model';


@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.css']
})
export class ExpenditureComponent implements OnInit {

  hostelList: HostelModel[] = [];
  messManageList: MessManageModel[] = [];
  isSearched: boolean = false;

  searchResult: SearchExpenditureResultModel = new SearchExpenditureResultModel();
  constructor(
    private apiService: ExpenditureService,
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

  search(id) {
    this.loaderService.toggleLoader(true);
    this.apiService.getTotalSummary(id).then(res => {
      let response = res.json();
      this.loaderService.toggleLoader(false);
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        return;
      }
      this.searchResult = response;
      this.isSearched = true;
    }).catch(e => {
      this.loaderService.toggleLoader(false);
    });
  }
}
