import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DailyExpenseModel, SearchDailyExpenseRequest } from './daily.model';
import { HostelModel } from '../../hostel-management-hostel/hostel-management-hostel.model';
import { MessManageModel } from '../messmanage/messmanage.model';
import { ExpenseModel } from '../expense/expense.model';
import { DailyExpenseService } from './daily.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {
  searchDaily: SearchDailyExpenseRequest = new SearchDailyExpenseRequest();
  hostelList: HostelModel[] = [];
  messManageList: MessManageModel[] = [];
  expenseTypeList: ExpenseModel[] = [];
  dailyExpenses: DailyExpenseModel[] = [];
  isSearched: boolean = false;
  totalfiles: Array<File> =[];
  totalFileName = [];

  constructor(
    private apiService: DailyExpenseService,
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
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.loaderService.toggleLoader(false);
        return;
      }
      this.hostelList = response;
      this.getExpenseTypeList();
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

  getExpenseTypeList() {
    this.apiService.getExpenseTypeList().then(res => {
      let response = res.json();
      this.loaderService.toggleLoader(false);
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        return;
      }
      this.expenseTypeList = response;
    }).catch(e => {
      this.loaderService.toggleLoader(false);
    });
  }

  search() {
    this.loaderService.toggleLoader(true);
    this.apiService.getDailyExpenseList(this.searchDaily).then(res => {
      let response = res.json();
      this.loaderService.toggleLoader(false);
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        return;
      }
      this.dailyExpenses = response;
      this.isSearched = true;
    }).catch(e => {
      this.loaderService.toggleLoader(false);
    });
  }

  save() {
    this.loaderService.toggleLoader(true);
    this.apiService.saveDailyExpenses(this.dailyExpenses).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.loaderService.toggleLoader(false);
        return;
      }
      this.dailyExpenses = response.result;
      this.addProofUrl(this.dailyExpenses);
      this.isSearched = false;
    }).catch(e => {
      this.loaderService.toggleLoader(false);
    });
  }

  fileSelectionChange(fileInput: any, index) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      this.totalfiles[index]=(fileInput.target.files[0]);
      this.totalFileName[index]=fileInput.target.files[0].name;
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  addProofUrl(results: DailyExpenseModel[]) {
    
    let main_form: FormData = new FormData();

    for(let j=0;j<this.totalfiles.length; j++)
    {
      console.log("the values is ",<File>this.totalfiles[j]);
      console.log("the name is ",this.totalFileName[j]);

      main_form.append(this.totalFileName[j],<File>this.totalfiles[j])
    }

    //reverseFileNames=this.totalFileName.reverse();

    let AllFilesObj= []

    results.forEach((result, index) => { 
      let eachObj=
      {
        'id' : result.id,
        'file_name' : this.totalFileName[index]
      }
      AllFilesObj.push(eachObj); 
    });

    //console.log("the Array data is ",AllFilesObj);
    main_form.append("fileInfo",JSON.stringify(AllFilesObj))

    this.apiService.uploadProfileProof(main_form).then(data => {
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false)
    });
  }
}
