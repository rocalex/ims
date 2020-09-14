export class ExamPaper {
  id: number;
  mappingId: number;
  mapping: MappingModel;
  pages: number;
  publisherName: string;
  description: string;
}

export class SubjectModel {
  id: string;
  name: string;
}

export class ClassModel {
  id: string;
  name: string;
}

export class ClassMappingModel {
  classSubjectMappings: MappingModel[];
}

export class MappingModel {
  classId: number;
  instituteClass: ClassModel;
  subjectId: number;
  instituteSubject: SubjectModel;
}

export class AcademicModel {
  academicYearCode: string;
  id: number;
}