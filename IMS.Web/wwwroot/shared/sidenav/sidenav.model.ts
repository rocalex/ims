export class Sidenav {
  constructor() {
    this.show = true;
  }
  title?: string;
  name?: string;
  url?: string;
  icon?: string;
  children?: Sidenav[];
  bindName?: string;
  parentId?: UserGroupFeatureParentEnum;
  childId?: UserGroupFeatureChildEnum;
  show?: boolean;
}

export enum UserGroupFeatureParentEnum {
  Academic,
  Student,
  Staff,
  Administration,
  Transportation,
  Finance
}

export enum UserGroupFeatureChildEnum {
  UserManagementRole,
  UserManagementPermission,
  UserManagementUsers,
  AcademicCountry,
  AcademicState,
  AcademicCity,
  AcademicCurrency,
  StudentDashboard,
  StudentLookUp,
  StudentInfo,
  StudentInActive,
  StudentRelieving,
  StudentArticles,
  StudentPromotion,
  StudentAttendance,
  StudentFeeComponent,
  StudentCourseFeeTerm,
  StudentStudentFee,
  StudentFeeReceipt,
  StudentFeeRefund,
  StudentFeeReport,
  StudentMarkExamDefinition,
  StudentMarkClassExam,
  StudentMarkExamScoreEntry,
  InstituteAcademicYear,
  InstituteWeekOff,
  InstituteHolidayOff,
  InstituteClass,
  InstituteSubject,
  InstituteClassSubjectMapping,
  InstituteTimeTable,
  StaffDashboard,
  StaffDepartment,
  StaffDesignation,
  StaffInfo,
  StaffActivity,
  StaffPlanner,
  AcademicEmail,
  AcademicLookUp,
  AcademicTemplates,
  AcademicAutoSequence,
  AcademicEvent,
  TransportVehicle,
  TransportDriver,
  TransportVehicleDriverMapping,
  TransportStage,
  TransportRoute,
  TransportStudentRouteMapping,
  TransportVehicleMaintanence,
  TransportVehicleRepair,
  TransportVehicleAccident,
  TransportVehicleBreakDown,
  FinancePaymentType,
  FinanceChartOfPayment,
  FinanceBasicReciept,
  FinanceBasicPayment,
  StaffReport,
  StudentReport,
  Homework,
  Disciplinary,
  CircularNotice,
  StudentLeaveManagement,
  StaffLeaveManagement,
  StaffAttendance
}