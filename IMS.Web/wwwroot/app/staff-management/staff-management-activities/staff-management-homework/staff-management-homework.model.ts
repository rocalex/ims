export class AddHomeworkManagementAc {
  constructor() {
    this.HomeworkDate = new Date();
    this.HomeworkSubjectMappings = [];
  }
  StaffId: number;
  HomeworkDate: Date;
  ClassId: number;
  SectionId: number;
  HomeworkSubjectMappings: AddHomeworkSubjectMappingAc[];
}

export class AddHomeworkSubjectMappingAc {
  constructor() {
    this.HomeworkData = '';
  }
  SubjectId: number;
  HomeworkData: string;
  IsSelected: boolean;
  Subject: any;
}

export class HomeworkMailMapping {
  constructor() {
    this.Bcc = [];
  }
  HomeworkId: number;
  Message: string;
  Subject: string;
  Bcc: string[];
  Students: any[];
}

export class HomeworkMessageMapping {
  constructor() {
    this.OtherNumbers = [];
  }
  HomeworkId: number;
  Message: string;
  OtherNumbers: string[];
  Students: any[];
}