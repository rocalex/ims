import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/loader-service';
import { PermissionService } from '../../../shared/permission.service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { LocationModel, AddressModel, PositionModel, BranchModel } from './branch.model';
import { BranchService } from './branch.service';

@Component({
  moduleId: module.id,
  templateUrl: './branch.component.html'
})
export class BranchComponent implements OnInit {

  addBranch: BranchModel = new BranchModel();
  billingAddress: AddressModel = new AddressModel();
  shippingAddress: AddressModel = new AddressModel();
  locationList: LocationModel[] = [];
  countryList: PositionModel[] = [];
  billingStateList: PositionModel[] = [];
  billingCityList: PositionModel[] = [];
  shippingStateList: PositionModel[] = [];
  shippingCityList: PositionModel[] = [];
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private apiService: BranchService,
    private snackService: SnackbarService
    ) { }

  ngOnInit() {
    this.getCountryList();
  }

  init() {
      this.addBranch = new BranchModel();
      this.billingAddress = new AddressModel();
      this.shippingAddress = new AddressModel();
      this.billingStateList = [];
      this.billingCityList = [];
      this.shippingStateList = [];
      this.shippingCityList = [];
  }

  getCountryList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getCountryList().then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackService.showSnackbar(response.message);
        return;
      }
      this.countryList = response;
      this.loaderService.toggleLoader(false);
    });
  }

  billingCountryChange(id) {
      this.apiService.getStateList(id).then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
            this.snackService.showSnackbar(response.message);
            return;
        }
        this.billingStateList = response;
      });
  }

  billingStateChange(id) {
    this.apiService.getCityList(id).then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
            this.snackService.showSnackbar(response.message);
            return;
        }
        this.billingCityList = response;
      });
  }

  shippingCountryChange(id) {
    this.apiService.getStateList(id).then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
            this.snackService.showSnackbar(response.message);
            return;
        }
        this.shippingStateList = response;
      });
  }

  shippingStateChange(id) {
    this.apiService.getCityList(id).then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
            this.snackService.showSnackbar(response.message);
            return;
        }
        this.shippingCityList = response;
      });
  }

  save() {
      this.saveBillingAddress();
  }

  saveBillingAddress() {
    this.loaderService.toggleLoader(true);
    if(this.billingAddress.cityId != null) {
        this.apiService.saveAddress(this.billingAddress).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
                return;
            }
            this.addBranch.billingAddressId = response.id;
            this.saveShippingAddress();
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    } else {
        this.saveShippingAddress();
    }
  }

  saveShippingAddress() {
    if(this.shippingAddress.cityId != null) {
        this.apiService.saveAddress(this.shippingAddress).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
                return;
            }
            this.addBranch.shippingAddressId = response.id;
            this.saveLocation();
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    } else {
        this.saveLocation();
    }
  }

  saveLocation() {
    this.apiService.saveBranch(this.addBranch).then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
            this.snackService.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
            return;
        }
        this.init();
        this.loaderService.toggleLoader(false);
    }).catch(err => {
        this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
