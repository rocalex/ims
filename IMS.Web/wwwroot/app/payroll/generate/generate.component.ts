import {Component, OnInit} from '@angular/core';
import { SearchPayrollModel } from './generate.model';
import {HttpService} from "../../../core/http.service";
import {LoaderService} from "../../../shared/loader-service";

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent implements OnInit {

  monthList: any[] = [
    { value: 1, viewValue: "January" },
    { value: 2, viewValue: "February" },
    { value: 3, viewValue: "March" },
    { value: 4, viewValue: "April" },
    { value: 5, viewValue: "May" },
    { value: 6, viewValue: "June" },
    { value: 7, viewValue: "July" },
    { value: 8, viewValue: "August" },
    { value: 9, viewValue: "September" },
    { value: 10, viewValue: "October" },
    { value: 11, viewValue: "November" },
    { value: 12, viewValue: "December" },
  ];
  academicYearList: any[] = [];
  staffList: any[] = [];
  searchPayroll: SearchPayrollModel = new SearchPayrollModel();
  constructor(private httpService: HttpService, private loaderService: LoaderService) { }
  
  ngOnInit() {
    this.getInitialData()
  }
  
  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.httpService.get('/api/instituteacademicyearmanagement').then(res => {
      this.academicYearList = res.json();
      this.loaderService.toggleLoader(false);
    })

    this.loaderService.toggleLoader(true);
    this.httpService.get('/api/staffmanagement').then(res => {
      this.staffList = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  search() {
    console.log(this.searchPayroll);
  }
}
