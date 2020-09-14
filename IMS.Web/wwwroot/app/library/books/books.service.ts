import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { UpdateAPIRequestModel, AddAPIRequestModel } from './books.model';

@Injectable()
export class BookService {
  BookUrl = 'api/book';
  BookTypeUrl = 'api/booktype';
  constructor(private http: HttpService) { }

  getBookTypes() {
      return this.http.get(this.BookTypeUrl);
  }
  
  getBookList() {
      return this.http.get(this.BookUrl);
  }

  addBook(request: AddAPIRequestModel) {
      return this.http.post(this.BookUrl, request);
  }

  updateBook(request: UpdateAPIRequestModel) {
      return this.http.put(this.BookUrl, request);
  }

  getBookDetail(id: number) {
      return this.http.get(this.BookUrl + `/${id}`);
  }

  updateImage(studentId: number, formData: FormData) {
    return this.http.postForFormData(this.BookUrl + '/image/' + studentId, formData);
  }

  delete(id: number) {
      return this.http.delete(this.BookUrl);
  }
}
