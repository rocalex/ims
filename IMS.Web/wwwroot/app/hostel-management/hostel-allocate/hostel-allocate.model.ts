import { StudentModel } from "../hostel-management-hostel/hostel-management-hostel.model";
import { BedModel } from "../hostel-floor/hostel-floor.model";

export class HostelAllocateModel {
  Id: number;
  Hostel: string;
  Block: string;
  Floor: string;
}

export class AllocationModel {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  rollNo: string;
  studentId: number;
  imgUrl: string;
  bedNo: number;
  bedId: number;
  bed: BedModel;
  roomNo: number;
  status: number;
}