using System;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StaffAttendanceManagement
{
    public class AddStaffAttendanceManagementWrapperAc
    {
        public AddStaffAttendanceManagementWrapperAc()
        {
            AttendanceDates = new List<DateTime>();
            AttendanceType = new List<string>();
        }

        public int StaffId { get; set; }

        public List<DateTime> AttendanceDates { get; set; }

        public List<string> AttendanceType { get; set; }
    }
}
