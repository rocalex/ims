using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentLeave : BaseModel
    {
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime EndDate { get; set; }

        public int LeaveTypeId { get; set; }
        [ForeignKey("LeaveTypeId")]
        public virtual LeaveType LeaveType { get; set; }

        [Required]
        public string Reason { get; set; }

        public int StatusId { get; set; }
        [ForeignKey("StatusId")]
        public virtual LeaveStatus LeaveStatus { get; set; }

        public int ApprovedById { get; set; }
        [ForeignKey("ApprovedById")]
        public virtual StaffBasicPersonalInformation ApprovedBy { get; set; }

        public int AcademicYearId { get; set; }
        [ForeignKey("AcademicYearId")]
        public virtual InstituteAcademicYear AcademicYear { get; set; }
    }
}
