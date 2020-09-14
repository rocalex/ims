import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DriverMasterService } from '../transport-management-drivermaster.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { DriverMasterManagementResponseType, DriverMasterManagementResponse, AddDriverMasterManagementAc } from '../transport-management-drivermaster.model';

@Component({
    moduleId: module.id,
    templateUrl: 'transport-management-drivermaster-add.html'
})
export class AddTransportManagementDriverMasterComponent implements OnInit {
    currentDate: Date = new Date();
    addDriver: AddDriverMasterManagementAc = new AddDriverMasterManagementAc();
    error: DriverMasterManagementResponse = new DriverMasterManagementResponse();
    @ViewChild('fileInput') fileInput: ElementRef;
    imgURL: any;
    constructor(private driverMasterService: DriverMasterService, private loaderService: LoaderService,
        private router: Router, private snackBar: SnackbarService) {
    }

    ngOnInit() {
    }

    addDriverMaster() {
        this.loaderService.toggleLoader(true);
        this.driverMasterService.addDriverMaster(this.addDriver).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.addImage(response.data.id, response.message);
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
