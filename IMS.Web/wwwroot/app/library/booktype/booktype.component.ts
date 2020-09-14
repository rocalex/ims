import { Component, OnInit } from '@angular/core';
import { BookTypeService } from './booktype.service';
import { BookTypeModel } from './booktype.model';
import { LoaderService } from '../../../shared/loader-service';

@Component({
  moduleId: module.id,
  templateUrl: './booktype.component.html',
  styleUrls: ['./booktype.component.css']
})
export class BooktypeComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }
}
