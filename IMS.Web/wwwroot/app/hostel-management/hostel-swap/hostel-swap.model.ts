import { BedModel } from "../hostel-floor/hostel-floor.model";
 
export class HostelSwapModel {
  Hostel: string;
  Block: string;
  Floor: string;
  Room: string;
}

export class Allocation {
  id: number;
  bedId: number;
  bed: BedModel;
  studentId: number;
  status: number;
  student: StudentModel;
}

export class StudentModel {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  imgUrl: string;
  rollNumber: string;
  gender: GenderModel;
}

export class GenderModel {
  id: number;
  name: string;
}
