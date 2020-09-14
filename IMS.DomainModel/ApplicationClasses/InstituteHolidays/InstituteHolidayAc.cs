using IMS.DomainModel.Enums;
using System;

namespace IMS.DomainModel.ApplicationClasses.InstituteHolidays
{
    public class InstituteHolidayAc
    {
        public int Id { get; set; }

        public int InstitutionId { get; set; }

        public int AcademicYearId { get; set; }

        public HolidayOccuranceTypeEnum OccuranceType { get; set; }

        public string OccuranceTypeString { get; set; }

        public string Description { get; set; }

        public DateTime HolidayDate { get; set; }

        public DateTime? HolidayToDate { get; set; }
    }
}
