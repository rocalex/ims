import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { BookTypeModel } from '../booktype.model';
import { BookTypeService } from '../booktype.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  bookType: BookTypeModel = new BookTypeModel();
  bookTypeId: number;
  constructor(
    private bookTypeService: BookTypeService,
    private snackBar: SnackbarService,
    private loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(param => this.bookTypeId = param.id);
  }

  ngOnInit() {
    this.getBookTypeInfo();
  }

  getBookTypeInfo() {
    this.loaderService.toggleLoader(true);
    this.bookTypeService.getBookTypeById(this.bookTypeId).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['library', 'booktypes']);
      }
      this.bookType = response;
      console.log(this.bookType);
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      console.log(error.json());
      this.loaderService.toggleLoader(false);
    });
  }

  save() {
    this.loaderService.toggleLoader(true);
    this.bookTypeService.updateBookType(this.bookType)
      .then(res => {
        let response = res.json();
        
        if (response.hasError === null || response.hasError === undefined || !response.hasError) {
          this.snackBar.showSnackbar(response.message);
          this.router.navigate(['library', 'booktypes']);
        }

        this.loaderService.toggleLoader(false);
      }).catch(error => {
        this.loaderService.toggleLoader(false);
      });
  }

}
