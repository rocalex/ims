using System;

namespace IMS.DomainModel.ApplicationClasses.StudentAttendanceManagement
{
    public class GetStudentAttendanceManagementAc
    {
        public GetStudentAttendanceManagementAc()
        {
            StartDate = DateTime.UtcNow;
            EndDate = DateTime.UtcNow;
        }
        
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int ClassId { get; set; }

        public int SectionId { get; set; }

        public int PeriodOrderId { get; set; }
    }
}
