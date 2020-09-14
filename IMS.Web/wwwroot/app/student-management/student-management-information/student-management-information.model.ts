export class AddStudentManagementAc {
  constructor() {
    this.MiddleName = '';
  }
  RollNumber: string;
  AdmissionDate: Date;
  AdmissionNumber: string;
  AdmissionClassId: number;
  CurrentClassId: number;
  SectionId: number;
  CurrentAcademicYearId: number;
  FirstLanguageId: number;
  SecondLanguageId: number;

  FirstName: string;
  MiddleName: string;
  LastName: string;
  DateOfBirth: Date;
  GenderId: number;
  MaritalStatusId: number;
  IsPhysicallyHandicapped: boolean;

  SchoolApplicationNumber: string;

  FeeChallanNumber: string;

  NationalityId: number;
  SocialSecurityNumber: string;
  MotherTongueId: number;
  ReligionId: number;
  CasteId: number;
  BloodGroupId: number;
  ComingBy: string;
  ComingPlace: string;
  IdentificationMarks: string;

  PassportNumber: string;
  PassportIssuedCountryId: number;
  PassportIssuedDate: Date;
  PassportExpireDate: Date;

  RelievingDate: Date;
  RelievingClassId: number;
  TCNumber: string;
  TCDate: Date;
  RelievingType: RelievingTypeEnum;
  RelievingReason: string;

  FamilyRelationType: FamilyRelationTypeEnum;
  MotherName: string;
  FamilyRelationName: string;
  FamilyRelationEmail: string;
  FamilyRelationMobileNumber: string;
  FamilyRelationOccupationId: number;
  FamilyRelationMonthlyIncome: string;

  PermanentAddress: string;
  PermanentCityId: number;
  PermanentZipcode: string;
  MobileNumber: string;
  AlternatePhoneNumber: string;

  IsPresentAddressIsSameAsPermanent: boolean;
  PresentAddress: string;
  PresentCityId: number;
  PresentZipcode: string;

  StudentPriorEducations: AddStudentPriorEducationAc[];
  StudentSports: AddStudentSportAc[];
  StudentAwards: AddStudentAwardAc[];
  StudentDisciplines: AddStudentDisciplineAc[];
}

export enum StudentSectionEnum {
  A,
  B,
  C,
  D
}

export enum MaritalStatusEnum {
  Married,
  Single,
  Divorce
}

export enum RelievingTypeEnum {
  PassOut,
  Transfer
}

export class ClassModel {
  id: number;
  className: string;
  noOfStudents: number;
}

export enum FamilyRelationTypeEnum {
  Father,
  Mother,
  Sibling,
  Other
}

export class AddStudentPriorEducationAc {
  InstituteName: string;
  FromDate: Date;
  ToDate: Date;
  IsEdit: boolean;
  Id: number;
}

export class AddStudentSportAc {
  SportId: number;
  LevelId: number;
  IsEdit: boolean;
  Id: number;
}

export class AddStudentAwardAc {
  AwardName: string;
  InstituteName: string;
  IsEdit: boolean;
  Id: number;
}

export class AddStudentDisciplineAc {
  StatusId: number;
  Subject: string;
  Date: Date;
  Description: string;
  Remarks: string;
  IsEdit: boolean;
  Id: number;
}

export class StudentManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: StudentManagementResponseType;
}

export enum StudentManagementResponseType {
  RollNumber,
  AdmissionNumber,
  AdmissionClassId,
  CurrentClassId,
  CurrentAcademicYearId,
  FirstLanguageId,
  SecondLanguageId,
  GenderId,
  FirstName,
  LastName,
  FeeChallanNumber,
  NationalityId,
  MotherTongueId,
  ReligionId,
  CasteId,
  BloodGroupId,
  PassportIssuedCountryId,
  RelievingClassId,
  MotherName,
  FamilyRelationName,
  FamilyRelationMobileNumber,
  FamilyRelationOccupationId,
  PermanentAddress,
  PermanentCityId,
  PresentCityId,
  MobileNumber,
  StudentPriorEducations,
  StudentDisciplines,
  StudentSportId,
  StudentLevelId,
  StudentAwardName,
  StudentAwardInstituteName
}

export class UpdateStudentManagementAc {
  constructor() {
    this.MiddleName = '';
    this.GalleryImageToDelete = [];
    this.DocumentToDelete = [];
  }
  Id: number;

  RollNumber: string;
  AdmissionDate: Date;
  AdmissionNumber: string;
  AdmissionClassId: number;
  CurrentClassId: number;
  SectionId: number;
  CurrentAcademicYearId: number;
  FirstLanguageId: number;
  SecondLanguageId: number;

  FirstName: string;
  MiddleName: string;
  LastName: string;
  DateOfBirth: Date;
  GenderId: number;
  MaritalStatusId: number;
  IsPhysicallyHandicapped: boolean;

  SchoolApplicationNumber: string;

  FeeChallanNumber: string;

  NationalityId: number;
  SocialSecurityNumber: string;
  MotherTongueId: number;
  ReligionId: number;
  CasteId: number;
  BloodGroupId: number;
  ComingBy: string;
  ComingPlace: string;
  IdentificationMarks: string;

  PassportNumber: string;
  PassportIssuedCountryId: number;
  PassportIssuedDate: Date;
  PassportExpireDate: Date;

  RelievingDate: Date;
  RelievingClassId: number;
  TCNumber: string;
  TCDate: Date;
  RelievingType: RelievingTypeEnum;
  RelievingReason: string;

  FamilyRelationType: FamilyRelationTypeEnum;
  MotherName: string;
  FamilyRelationName: string;
  FamilyRelationEmail: string;
  FamilyRelationMobileNumber: string;
  FamilyRelationOccupationId: number;
  FamilyRelationMonthlyIncome: string;

  PermanentAddress: string;
  PermanentCityId: number;
  PermanentZipcode: string;
  MobileNumber: string;
  AlternatePhoneNumber: string;

  IsPresentAddressIsSameAsPermanent: boolean;
  PresentAddress: string;
  PresentCityId: number;
  PresentZipcode: string;

  StudentPriorEducations: AddStudentPriorEducationAc[];
  StudentSports: AddStudentSportAc[];
  StudentAwards: AddStudentAwardAc[];
  StudentDisciplines: AddStudentDisciplineAc[];

  GalleryImageToDelete: number[]
  DocumentToDelete: number[];
}

export class AddStudentDocumentMappingAc {
  Name: string;
  ExpiredDate: Date;
  MetaData: string;
  FileType: string;
  File: string;
  FileData: any;
  FileUrl: string;
}