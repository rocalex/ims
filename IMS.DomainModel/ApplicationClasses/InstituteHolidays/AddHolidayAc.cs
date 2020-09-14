using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteHolidays
{
    public class AddHolidayAc
    {
        public int? Id { get; set; }

        [Required]
        public int AcademicYearId { get; set; }

        public HolidayOccuranceTypeEnum OccuranceType { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string OccuranceTypeString { get; set; }
    }
}
