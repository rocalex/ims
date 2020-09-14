export class HostelModel {
  id: number;
  code: string;
  name: string;
  hostelType: number;
  contactPerson: string;
  contactMobile: string;
  countryId: number;
  stateId: number;
  cityId: number;
  city: PositionModel;
  zipCode: string;
  address1: string;
  address2: string;
  hostelCautionDeposit: number;
  assignMembers: number[];
  status: boolean;
  placeName: string;
}

export class StudentModel {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  imgUrl: string;
  rollNo: string;
}

export class PositionModel {
  id: number;
  name: string;
}