export class BookModel {
  id: number;
  code: string;
  name: string;
  iSBN: string;
  title: string;
  bookTypeId: string;
  bookType: BookTypeModel;
  authorName: string;
  imageUrl: string;
  quantity: number;
  remaining: number;
  puchaseDate: string;
  edition: string;
  price: number;
  pages: number;
  billNo: string;
  publisherId: number;
  publisher: PublisherModel;
}

export class AddAPIRequestModel {
  addBook: BookModel;
  addPublisher: PublisherModel;
}

export class UpdateAPIRequestModel {
  updateBook: BookModel;
  updatePublisher: PublisherModel;
}

export class BookTypeModel {
  id: number;
  name: string;
}

export class PublisherModel {
  id: number;
  name: string;
  email: string;
  contract: string;
  address: string;
}