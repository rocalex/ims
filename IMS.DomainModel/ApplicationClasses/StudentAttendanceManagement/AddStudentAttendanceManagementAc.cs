using System;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StudentAttendanceManagement
{
    public class AddStudentAttendanceManagementAc
    {
        public AddStudentAttendanceManagementAc()
        {
            AttendanceDates = new List<DateTime>();
            AttendanceType = new List<string>();
        }

        public int StudentId { get; set; }

        public List<DateTime> AttendanceDates { get; set; }

        public List<string> AttendanceType { get; set; }
    }
}
