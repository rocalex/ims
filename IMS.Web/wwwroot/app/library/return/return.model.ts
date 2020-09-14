export class ReturnBookModel {
  issueBookId: number;
  fine: number;
  returnDate: Date;
}

export class ReturnBookRequest {
  bookId: number;
  returnBookList: ReturnBookModel[]
}