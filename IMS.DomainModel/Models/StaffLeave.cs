using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StaffLeave : BaseModel
    {
        public int StaffId { get; set; }
        [ForeignKey("StaffId")]
        public virtual StaffBasicPersonalInformation Staff { get; set; }

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

        [Required]
        public string ApprovedById { get; set; }
        [ForeignKey("ApprovedById")]
        public virtual ApplicationUser ApprovedBy { get; set; }

        public int AcademicYearId { get; set; }
        [ForeignKey("AcademicYearId")]
        public virtual InstituteAcademicYear AcademicYear { get; set; }
    }
}
