using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum NoticeToEnum
    {
        [Description("All Students")]
        AllStudents,

        [Description("All Staffs")]
        AllStaffs,

        [Description("Student")]
        Student,

        [Description("Staff")]
        Staff,

        [Description("System User")]
        SystemUser
    }
}
