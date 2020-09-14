using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum TemplateTypeEnum
    {
        [Description("Student Add")]
        StudentAdd,
        [Description("Student Edit")]
        StudentEdit,
        [Description("Student Delete")]
        StudentDelete,
        [Description("Staff Add")]
        StaffAdd,
        [Description("Staff Edit")]
        StaffEdit,
        [Description("Staff Delete")]
        StaffDelete,
        [Description("Change Password")]
        ChangePassword,
        [Description("Forgot Password")]
        ForgotPassword,
        [Description("Time Table")]
        TimeTable,
        [Description("Fee Payment Add")]
        FeePaymentAdd,
        [Description("Fee Payment Reminder")]
        FeePaymentReminder,
        [Description("Staff Leave Add")]
        StaffLeaveAdd,
        [Description("Staff Leave Edit")]
        StaffLeaveEdit,
        [Description("Student Leave Add")]
        StudentLeaveAdd,
        [Description("Student Leave Edit")]
        StudentLeaveEdit,
        [Description("Student Leave Approve Reject")]
        StudentLeaveApproveReject,
        [Description("Staff Leave Approve Reject")]
        StaffLeaveApproveReject
    }
}
