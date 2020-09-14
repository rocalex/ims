import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { PermissionService } from '../../../../shared/permission.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { MappingModel } from './mapping.model';
import { MappingService } from './mapping.service';
import { ComponentModel } from '../../component/component.model';

@Component({
    moduleId: module.id,
    templateUrl: './mapping.component.html'
})
export class MappingComponent implements OnInit {

    groupList: MappingModel[] = [];
    addMapping: MappingModel = new MappingModel();
    componentList: ComponentModel[] = [];
    typeList: any[] = [
        { id: 1, name: "Standard" },
        { id: 2, name: "Formula" }
    ];
    staffId: number;
    constructor(
        private groupService: MappingService,
        private loaderService: LoaderService,
        private snackBar: SnackbarService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private permissionService: PermissionService,
        public dialog: MatDialog
    ) {
        this.activatedRoute.params.subscribe(param => {
            this.staffId = param.id;
            this.addMapping.staffId = this.staffId;
        });
     }

    ngOnInit() {
        this.getGroupList();
    }

    getGroupList() {
        this.loaderService.toggleLoader(true);
        this.groupService.getMappingForLoggedInUser(this.staffId)
            .then(res => {
                this.groupList = res.json();
                this.getComponentList();
                this.loaderService.toggleLoader(false);
            }).catch(e => {
                this.loaderService.toggleLoader(false);
            });
    }

    getComponentList() {
        this.loaderService.toggleLoader(true);
        this.groupService.getComponentList().then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
              this.snackBar.showSnackbar(response.message);
              return;
            }
            this.componentList = response;
            this.loaderService.toggleLoader(false);
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }

    openAdd() {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '800px',
            height: '500px',
            data: { addMapping: this.addMapping, componentList: this.componentList }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getGroupList();
        });
    }

    openEdit(mapping: MappingModel) {
        const dialogRef = this.dialog.open(EditDialog, {
            width: '800px',
            height: '500px',
            data: { addMapping: mapping, componentList: this.componentList }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getGroupList();
        });
    }

    delete(mapping: MappingModel) {
        this.loaderService.toggleLoader(true);
        this.groupService.deleteMapping(mapping.id).then(res => {
            let response = res.json();
            this.snackBar.showSnackbar(response.message);
            this.getGroupList();
            this.loaderService.toggleLoader(false);
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }

    isAllowed(type: string) {
        return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
}

export interface DialogData {
    addMapping: MappingModel,
    componentList: ComponentModel[]
}


@Component({
    selector: 'add-mapping-dialog',
    templateUrl: 'add-mapping.dialog.html',
})
export class DialogOverviewExampleDialog {

    componentList: ComponentModel[] = [];
    operatorList: string[] = ['+', '-'];
    typeList: any[] = [
        { id: 1, name: "Standard" },
        { id: 2, name: "Formula" }
    ];
    isFormula: boolean = false;
    addMapping: MappingModel = new MappingModel();
    constructor(
        private apiService: MappingService,
        private snackBar: SnackbarService,
        private loaderService: LoaderService,
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.componentList = data.componentList;
        this.addMapping = data.addMapping;
    }

    changeComponentType(value) {
        if (value == 2) {
            this.isFormula = true;
        } else if(value == 1) {
            this.isFormula = false;
        }
    }

    add(): void {
        this.loaderService.toggleLoader(true);
        this.apiService.addMapping(this.addMapping).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
            } else {
                this.snackBar.showSnackbar(response.message);
                this.dialogRef.close();
            }
            this.loaderService.toggleLoader(false);
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }
}


@Component({
    selector: 'edit-dialog',
    templateUrl: 'edit-mapping.dialog.html',
})
export class EditDialog {

    componentList: ComponentModel[] = [];
    operatorList: string[] = ['+', '-'];
    typeList: any[] = [
        { id: 1, name: "Standard" },
        { id: 2, name: "Formula" }
    ];
    isFormula: boolean = false;
    addMapping: MappingModel = new MappingModel();
    constructor(
        private apiService: MappingService,
        private snackBar: SnackbarService,
        private loaderService: LoaderService,
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.componentList = data.componentList;
        this.addMapping = data.addMapping;
        this.changeComponentType(this.addMapping.componentTypeId);
    }

    changeComponentType(value) {
        if (value == 2) {
            this.isFormula = true;
        } else if(value == 1) {
            this.isFormula = false;
        }
    }

    add(): void {
        this.loaderService.toggleLoader(true);
        this.apiService.updateMapping(this.addMapping).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
            } else {
                this.snackBar.showSnackbar(response.message);
                this.dialogRef.close();
            }
            this.loaderService.toggleLoader(false);
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
