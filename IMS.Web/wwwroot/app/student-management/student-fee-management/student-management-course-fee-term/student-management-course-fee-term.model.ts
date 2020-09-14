export class AddCourseFeeTerm {
    term: number;
    courseFeeTermAc: CourseFeeTerm;
    courseFeeTermDetailsList: CourseFeeTermDetails[];
}

export class CourseFeeTerm {
    id: number;
    classId: number;
    className: string;
    academicYearId: number;
    academicYearName: string;
    dueDate: Date;
    lateFee: number;
    religionId: number;
    religionName: string;
}

export class CourseFeeTermDetails {
    id: number;
    courseFeeTermId: number;
    feeComponentId: number;
    feeComponentName: string;
    amount: number;
}