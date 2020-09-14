using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteAcademicYear
{
    public class AddInstituteAcademicYearAc
    {
        [Required]
        public string AcademicYearCode { get; set; }

        [Required]
        [MaxLength(200)]
        public string ChallanStartingNumber { get; set; }

        [Required]
        public DateTime FromDate { get; set; }

        [Required]
        public DateTime ToDate { get; set; }

        public bool IsActive { get; set; }
    }
}
