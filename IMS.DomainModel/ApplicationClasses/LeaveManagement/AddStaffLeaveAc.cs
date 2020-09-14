using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.LeaveManagement
{
    public class AddStaffLeaveAc
    {
        public int StaffId { get; set; } 

        public DateTime FromDate { get; set; }

        public DateTime EndDate { get; set; }

        public int LeaveTypeId { get; set; }

        [Required]
        public string Reason { get; set; }

        public int StatusId { get; set; }

        [Required]
        public string ApprovedById { get; set; }
    }
}
