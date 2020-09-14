import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { BookTypeModel } from '../booktype.model';
import { BookTypeService } from '../booktype.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addType: BookTypeModel = new BookTypeModel();
  errorMessage: string = '';
  
  constructor(private loaderService: LoaderService,
    private permissionService: PermissionService,
    private snackBar: SnackbarService,
    private router: Router,
    private bookTypeService: BookTypeService) { }

  ngOnInit() {
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.bookTypeService.addBookType(this.addType).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['library', 'booktypes']);
      } else {
        this.errorMessage = response.message;
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }
}
