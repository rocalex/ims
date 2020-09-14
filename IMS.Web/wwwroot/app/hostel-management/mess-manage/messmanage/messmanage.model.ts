import { StudentModel } from "../../hostel-management-hostel/hostel-management-hostel.model";

export class SearchMessRequest {
  hostelId: number;
  fromDate: Date;
  toDate: Date;
}

export class MessManageModel {
  id: number;
  hostelId: number;
  duration: string;
  fromDate: Date;
  toDate: Date;
  name: string;
}

export class MessMappingModel {
  id: number;
  messManageId: number;
  studentId: number;
  student: StudentModel;
  cardNumber: string;
  duration: string;
}

export class AddMessRequest {
  hostelId: number;
  fromDate: Date;
  toDate: Date;
  mappings: MessMappingModel[];
}