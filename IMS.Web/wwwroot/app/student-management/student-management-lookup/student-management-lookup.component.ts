import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as LookupModel from './student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-lookup.html'
})
export class StudentManagementLookUpComponent implements OnInit {
  lookUps: LookupModel.LookUpModel[] = LookupModel.Lookups();
  constructor(private router:Router) {
  }

  ngOnInit() {
  }
}
