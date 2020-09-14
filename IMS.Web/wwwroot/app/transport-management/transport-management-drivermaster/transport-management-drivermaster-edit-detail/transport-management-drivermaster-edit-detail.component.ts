import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DriverMasterService } from '../transport-management-drivermaster.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { DriverMasterManagementResponse, DriverMasterManagementResponseType, UpdateDriverMasterManagementAc } from '../transport-management-drivermaster.model';

@Component({
    moduleId: module.id,
    templateUrl: 'transport-management-drivermaster-edit-detail.html'
})
export class EditAndDetailTransportManagementDriverMasterComponent implements OnInit {
    currentDate: Date = new Date();
    addDriver: UpdateDriverMasterManagementAc = new UpdateDriverMasterManagementAc();
    error: DriverMasterManagementResponse = new DriverMasterManagementResponse();
    @ViewChild('fileInput') fileInput: ElementRef;
    imgURL: any;
    constructor(private driverMasterService: DriverMasterService, private loaderService: LoaderService,
        private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.addDriver.Id = res.id);
        this.getDriverMaster();
    }

    getDriverMaster() {
        this.loaderService.toggleLoader(true);
        this.driverMasterService.getDriverMaster(this.addDriver.Id).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['transportmanagement', 'drivermaster', 'list']);
            } else {
                this.addDriver.Address = response.address;
                this.addDriver.DateOfBirth = response.dateOfBirth;
                this.addDriver.DateOfIssue = response.dateOfIssue;
                this.addDriver.IsDriver = response.isDriver;
                this.addDriver.IssuingAuthority = response.issuingAuthority;
                this.addDriver.LicenseNumber = response.licenseNumber;
                this.addDriver.LicenseType = response.licenseType;
                this.addDriver.MobileNumber = response.mobileNumber;
                this.addDriver.Name = response.name;
                this.addDriver.PlaceOfIssue = response.placeOfIssue;
                this.addDriver.Salary = response.salary;
                this.addDriver.ValidityTill = response.validityTill;
                if (response.licensePhoto) {
                    this.imgURL = response.licensePhoto;
                }
            }
            this.loaderService.toggleLoader(false);
        });
    }

    updateDriverMaster() {
        this.loaderService.toggleLoader(true);
        this.driverMasterService.updateDriverMaster(this.addDriver).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.addImage(this.addDriver.Id, response.message);
            } else {
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        })
    }

    hasError(fieldName: string) {
        var id = DriverMasterManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        } else {
            return false;
        }
    }

    resetError(fieldName: string) {
        var id = DriverMasterManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new DriverMasterManagementResponse();
        }
    }

    preview(files: any[]) {
        if (files.length === 0)
            return;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        }
    }

    addImage(id: number, message: string) {
        this.loaderService.toggleLoader(true);
        const formData = new FormData();
        var files = this.fileInput.nativeElement.files;
        if (files.length !== 0) {
            for (const file of files) {
                formData.append(file.name, file);
            }
        }
        this.driverMasterService.addImages(id, formData).then(res => {
            this.snackBar.showSnackbar(message);
            this.router.navigate(['transportmanagement', 'drivermaster', 'list']);
            this.loaderService.toggleLoader(false);
        })
    }
}
