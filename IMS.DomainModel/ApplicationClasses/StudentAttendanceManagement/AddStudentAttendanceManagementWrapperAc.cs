using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StudentAttendanceManagement
{
    public class AddStudentAttendanceManagementWrapperAc
    {
        public AddStudentAttendanceManagementWrapperAc()
        {
            Students = new List<AddStudentAttendanceManagementAc>();
        }

        public int ClassId { get; set; }

        public int SectionId { get; set; }

        public int PeriodOrderId { get; set; }

        public List<AddStudentAttendanceManagementAc> Students { get; set; }
    }
}
