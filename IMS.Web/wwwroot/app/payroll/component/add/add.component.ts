import { Component, OnInit } from '@angular/core';
import { ComponentModel } from '../component.model';
import { LoaderService } from '../../../../shared/loader-service';
import { GroupModel } from '../../componentgroup/componentgroup.model';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { ComponentService } from '../component.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addComponent: ComponentModel = new ComponentModel();
  groupList: GroupModel[] = [];
  errorMessage: string = '';
  constructor(
    private loaderService: LoaderService,
    private snackBar: SnackbarService,
    private router: Router,
    private service: ComponentService
  ) { }

  ngOnInit() {
    this.loadGroupList();
  }

  loadGroupList() {
    this.loaderService.toggleLoader(true);
    this.service.getComponentGroupsForLoggedInUser().then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.groupList = response;
        console.log(this.groupList);
      } else {
        this.errorMessage = response.message;
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.snackBar.showSnackbar("There is error on fetching Group List");
      this.loaderService.toggleLoader(false);
    });
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.service.addComponentGroup(this.addComponent).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['payroll', 'components']);
      } else {
        this.errorMessage = response.message;
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
        this.snackBar.showSnackbar("There is error on saving component information");
        this.loaderService.toggleLoader(false);
    });
  }
}
