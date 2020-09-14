export class AddStaffManagementAc {
  constructor() {
    this.MiddleName = '';
  }
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DateOfBirth: Date;
  GenderId: number;
  MaritalStatusId: number;
  Qualification: string;
  DateOfJoining: Date;
  IsTeachingStaff: boolean;
  TeachingStaffId: number;
  EmployeeId: string;
  DesignationId: number;
  NationalityId: number;
  SocialSecurityNumber: string;
  MotherTongueId: number;
  ReligionId: number;
  CasteId: number;
  BloodGroupId: number;
  IdentificationMarks: string;
  PassportNumber: string;
  PassportIssuedCountryId: number;
  PassportIssuedDate: Date;
  PassportExpireDate: Date;
  PermanentAddress: string;
  PermanentCityId: number;
  PermanentZipcode: string;
  MobileNumber: string;
  AlternatePhoneNumber: string;
  IsPresentAddressIsSameAsPermanent: boolean;
  PresentAddress: string;
  PresentCityId: number;
  PresentZipcode: string;
  Email: string;
  AddStaffExperienceMappings: AddStaffExperienceMappingAc[];
  DepartmentsIdList: Array<number>;
}

export enum MaritalStatusEnum {
  Married,
  Single,
  Divorce
}

export class AddStaffExperienceMappingAc {
  Id: number;
  InstituteName: string;
  StartDate: Date;
  EndDate: Date;
  IsEdit: boolean
}

export class StaffManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: StaffManagementResponseType;
}

export enum StaffManagementResponseType {
  EmployeeId,
  FirstName,
  LastName,
  MaritalStatusId,
  TeachingStaffId,
  DesignationId,
  NationalityId,
  MotherTongueId,
  ReligionId,
  CasteId,
  BloodGroupId,
  PassportIssuedCountryId,
  PermanentAddress,
  MobileNumber,
  PermanentCityId,
  PresentCityId,
  Email,
  ExperienceList
}

export class EditStaffManagementAc {
  constructor() {
    this.MiddleName = '';
    this.GalleryImageToDelete = [];
  }
  Id: number
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DateOfBirth: Date;
  GenderId: number;
  MaritalStatusId: number;
  Qualification: string;
  DateOfJoining: Date;
  IsTeachingStaff: boolean;
  TeachingStaffId: number;
  EmployeeId: string;
  DesignationId: number;
  NationalityId: number;
  SocialSecurityNumber: string;
  MotherTongueId: number;
  ReligionId: number;
  CasteId: number;
  BloodGroupId: number;
  IdentificationMarks: string;
  PassportNumber: string;
  PassportIssuedCountryId: number;
  PassportIssuedDate: Date;
  PassportExpireDate: Date;
  PermanentAddress: string;
  PermanentCityId: number;
  PermanentZipcode: string;
  MobileNumber: string;
  AlternatePhoneNumber: string;
  IsPresentAddressIsSameAsPermanent: boolean;
  PresentAddress: string;
  PresentCityId: number;
  PresentZipcode: string;
  Email: string;
  AddStaffExperienceMappings: AddStaffExperienceMappingAc[];
  DepartmentsIdList: Array<number>;
  Photo: string;
  GalleryImageToDelete: number[];
}

export class AddStaffDocumentMappingAc {
  Name: string;
  ExpiredDate: Date;
  MetaData: string;
  FileType: string;
  File: string;
  FileData: any;
  FileUrl: string;
}