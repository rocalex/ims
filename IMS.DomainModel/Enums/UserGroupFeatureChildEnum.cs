using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum UserGroupFeatureChildEnum
    {
        [Description("Role")]
        UserManagementRole,
        [Description("Permission")]
        UserManagementPermission,
        [Description("Users")]
        UserManagementUsers,
        [Description("Country")]
        AcademicCountry,
        [Description("State")]
        AcademicState,
        [Description("City")]
        AcademicCity,
        [Description("Currency")]
        AcademicCurrency,
        [Description("Dashboard")]
        StudentDashboard,
        [Description("LookUp")]
        StudentLookUp,
        [Description("Info")]
        StudentInfo,
        [Description("In Active")]
        StudentInActive,
        [Description("Relieving")]
        StudentRelieving,
        [Description("Articles")]
        StudentArticles,
        [Description("Promotion")]
        StudentPromotion,
        [Description("Student Attendance")]
        StudentAttendance,
        [Description("Fee Component")]
        StudentFeeComponent,
        [Description("Course Fee Term")]
        StudentCourseFeeTerm,
        [Description("Student Fee")]
        StudentStudentFee,
        [Description("Fee Receipt")]
        StudentFeeReceipt,
        [Description("Fee Refund")]
        StudentFeeRefund,
        [Description("Fee Report")]
        StudentFeeReport,
        [Description("Exam Definition")]
        StudentMarkExamDefinition,
        [Description("ClassExam")]
        StudentMarkClassExam,
        [Description("Exam Score Entry")]
        StudentMarkExamScoreEntry,
        [Description("Academic Year")]
        InstituteAcademicYear,
        [Description("Week Off")]
        InstituteWeekOff,
        [Description("Holiday Off")]
        InstituteHolidayOff,
        [Description("Class")]
        InstituteClass,
        [Description("Subject")]
        InstituteSubject,
        [Description("Class Subject Mapping")]
        InstituteClassSubjectMapping,
        [Description("Time Table")]
        InstituteTimeTable,
        [Description("Dashboard")]
        StaffDashboard,
        [Description("Department")]
        StaffDepartment,
        [Description("Designation")]
        StaffDesignation,
        [Description("Info")]
        StaffInfo,
        [Description("Activity")]
        StaffActivity,
        [Description("Planner")]
        StaffPlanner,
        [Description("Email")]
        AcademicEmail,
        [Description("LookUp")]
        AcademicLookUp,
        [Description("Templates")]
        AcademicTemplates,
        [Description("Auto Sequence")]
        AcademicAutoSequence,
        [Description("Event Management")]
        AcademicEvent,
        [Description("Vehicle Master")]
        TransportVehicle,
        [Description("Driver Master")]
        TransportDriver,
        [Description("Vehicle Driver Mapping")]
        TransportVehicleDriverMapping,
        [Description("Stage")]
        TransportStage,
        [Description("Route")]
        TransportRoute,
        [Description("Student Route Mapping")]
        TransportStudentRouteMapping,
        [Description("Vehicle Maintanence")]
        TransportVehicleMaintanence,
        [Description("Vehicle Repair")]
        TransportVehicleRepair,
        [Description("Vehicle Accident")]
        TransportVehicleAccident,
        [Description("Vehicle Break Down")]
        TransportVehicleBreakDown,
        [Description("Payment Type")]
        FinancePaymentType,
        [Description("Chart Of Payment")]
        FinanceChartOfPayment,
        [Description("Basic Reciept")]
        FinanceBasicReciept,
        [Description("Basic Payment")]
        FinanceBasicPayment,
        [Description("Staff Report")]
        StaffReport,
        [Description("Student Report")]
        StudentReport,
        [Description("Homework")]
        Homework,
        [Description("Disciplinary")]
        Disciplinary,
        [Description("Circular/Notice")]
        CircularNotice,
        [Description("Student Leave Management")]
        StudentLeaveManagement,
        [Description("Staff Leave Management")]
        StaffLeaveManagement,
        [Description("Staff Attendance")]
        StaffAttendance
    }
}
