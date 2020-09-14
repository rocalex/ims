import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModelLookUp, LookUpResponse, LookUpResponseType } from '../academic-management.model';

@Component({
  moduleId: module.id,
  selector: 'academic-shared',
  templateUrl: 'academic-management-shared.html'
})
export class AcademicManagementSharedComponent implements OnInit {
  @Input() lookUpData: BaseModelLookUp = new BaseModelLookUp();
  @Output() saveChanges: EventEmitter<any> = new EventEmitter<any>();
  @Input() error: LookUpResponse = new LookUpResponse();
  @Input() selectedUrl: string = '';
  @Input() countries: any[] = [];
  @Input() selectedCountry: any = {};
  @Input() states: any[] = [];
  @Input() selectedState: any = {};
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  hasError(fieldName: string) {
    var id = LookUpResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = LookUpResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new LookUpResponse();
    }
  }

  add() {
    this.saveChanges.emit({ lookUp: this.lookUpData, country: this.selectedCountry, state: this.selectedState });
  }

  isAllowedForCountry() {
    if (this.selectedUrl === 'state' || this.selectedUrl === 'city') {
      if (this.selectedCountry.id) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  getStates() {
    var country = this.countries.find(x => x.id === this.selectedCountry.id);
    this.states = country.states;
    this.selectedState = {};
  }

  isAllowedForState() {
    if (this.selectedUrl === 'city') {
      if (this.selectedState.id) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
