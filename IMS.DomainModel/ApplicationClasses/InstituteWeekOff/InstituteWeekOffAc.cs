using IMS.DomainModel.Enums;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.InstituteWeekOff
{
    public class InstituteWeekOffAc
    {
        public int InstitutionId { get; set; }

        public int AcademicYearId { get; set; }

        public WeekNumberEnum WeekNumber { get; set; }

        public string WeekNumberString { get; set; }

        public WeekDaysEnum WeekDay { get; set; }

        public string WeekDayString { get; set; }

        public bool IsWeekOff { get; set; }

        public List<InstituteWeekOffAc> WeekNumberWeekOffListAc { get; set; }
    }
}
