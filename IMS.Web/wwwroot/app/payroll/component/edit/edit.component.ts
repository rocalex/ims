import { Component, OnInit } from '@angular/core';
import { ComponentModel } from '../component.model';
import { LoaderService } from '../../../../shared/loader-service';
import { GroupModel } from '../../componentgroup/componentgroup.model';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { ComponentService } from '../component.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  addComponent: ComponentModel = new ComponentModel();
  groupList: GroupModel[] = [];
  errorMessage: string = '';
  componentId: number;
  constructor(
    private loaderService: LoaderService,
    private snackBar: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ComponentService
  ) { 
    this.activatedRoute.params.subscribe(param => this.componentId = param.id);
  }

  ngOnInit() {
    this.loadGroupList();
  }

  loadGroupList() {
    this.loaderService.toggleLoader(true);
    this.service.getComponentGroupById(this.componentId).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.addComponent = response;
        this.service.getComponentGroupsForLoggedInUser().then(res1 => {
          let response1 = res1.json();
          if(response1.hasError === null || response1.hasError === undefined || !response1.hasError) {
            this.groupList = response1;
          } else {
            this.errorMessage = response1.message;
          }
          this.loaderService.toggleLoader(false);
        }).catch(err => {
          this.snackBar.showSnackbar("There is error on fetching Group List");
          this.loaderService.toggleLoader(false);
          this.router.navigate(['payroll', 'component']);
        });
      } else {
        this.snackBar.showSnackbar("There is error on fetching component info");
        this.loaderService.toggleLoader(false);
        this.router.navigate(['payroll', 'component']);
      }
    }).catch(error => {
      this.snackBar.showSnackbar("There is error on fetching component info");
      this.loaderService.toggleLoader(false);
      this.router.navigate(['payroll', 'component']);
    });
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.service.updateComponentGroup(this.addComponent).then(res => {
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
