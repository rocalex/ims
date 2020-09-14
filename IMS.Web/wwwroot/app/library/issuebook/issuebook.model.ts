export class IssueBookModel {
  id: number;
  userType: number;
  bookId: number;
  book: BookModel;
  staffId: number;
  staff: StaffModel;
  studentId: number;
  student: StudentModel;
  description: string;
  issueDate: Date;
  refNo: number;
  status: number;
}

export class BookModel {
  id: number;
  name: string;
  remaining: number;
}

export class StudentModel {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

export class StaffModel {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}