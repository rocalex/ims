using System;

namespace IMS.DomainModel.ApplicationClasses.ApiService.Student
{
    public class GetAttendanceAc
    {
        public int StudentId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
