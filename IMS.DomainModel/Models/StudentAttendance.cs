using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentAttendance : BaseModel
    {
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public DateTime AttendanceDate { get; set; }

        public int PeriodOrderId { get; set; }

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
