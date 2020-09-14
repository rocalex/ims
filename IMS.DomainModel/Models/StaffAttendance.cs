using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StaffAttendance : BaseModel
    {
        public int StaffId { get; set; }
        [ForeignKey("StaffId")]
        public virtual StaffBasicPersonalInformation Staff { get; set; }

        public DateTime AttendanceDate { get; set; }

        public AttendanceType AttendanceType { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        [NotMapped]
        public string AttendanceTypeDescription { get; set; }

        public int? AcademicYearId { get; set; }
        [ForeignKey("AcademicYearId")]
        public virtual InstituteAcademicYear AcademicYear { get; set; }
    }
}
