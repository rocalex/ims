import { Component, OnInit } from '@angular/core';
import { RoleManagementService } from '../role-management.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';

@Component({
    moduleId: module.id,
    templateUrl: 'role-management-add.html'
})
export class RoleManagementAddComponent implements OnInit {
    roleName: string;
    constructor(private roleManagementService: RoleManagementService, private router: Router,
        private snackBar: SnackbarService, private loaderService: LoaderService) {
    }

    ngOnInit() {
    }

    addRole() {
        this.loaderService.toggleLoader(true);
        this.roleManagementService.addNewRole({ RoleName: this.roleName }).then(res => {
            var response = res.json();
            if (response.message === 'Role added successfully') {
                this.router.navigate(['role', 'list']);
          }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
}
