export class AddClassExamAc {
  constructor() {
    this.ClassExamSubjectMappings = [];
  }
  ClassId: number;
  SectionId: number;
  ExamId: number;
  TotalAttendanceDays: number;
  ClassExamSubjectMappings: ClassExamSubjectMappingAc[];
  ClassExamId: number;
}

export class ClassExamSubjectMappingAc {
  DemoId: number;
  SubjectId: number;
  StartDate: Date;
  StartTime: string;
  EndTime: string;
  MaxScore: number;
  MinScore: number;
  Content: string;
  Remark: string;
}