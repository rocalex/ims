using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Payroll.TimesheetManagement
{
    public class AddTimesheet
    {
        [Required]
        public int StaffId { get; set; }
        [Required]
        public DateTime PresenceDate { get; set; }
        [Required]
        public int PresenceType { get; set; }
    }
}
