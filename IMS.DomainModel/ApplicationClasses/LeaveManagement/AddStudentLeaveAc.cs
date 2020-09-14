using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.LeaveManagement
{
    public class AddStudentLeaveAc
    {
        public int StudentId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime EndDate { get; set; }

        public int LeaveTypeId { get; set; }

        [Required]
        public string Reason { get; set; }

        public int StatusId { get; set; }

        public int ApprovedById { get; set; }
    }
}
