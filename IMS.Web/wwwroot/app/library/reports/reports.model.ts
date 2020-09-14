import { BookModel } from "../books/books.model";
import { BookTypeModel } from "../booktype/booktype.model";
import { StudentModel } from "../../hostel-management/hostel-management-hostel/hostel-management-hostel.model";
import { StaffModel } from "../issuebook/issuebook.model";

export class BookReportsModel {
    id: number;
    book: BookModel;
    status: number;
    userType: number;
    student: StudentModel;
    staff: StaffModel;
    issuedDate: Date;
}

export class UserModel {
    id: number;
    firstName: string;
    lastName: string;
    userType: number;
}

export class Book {
    id: number;
    name: string;
}