using IMS.DomainModel.Enums;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.TimeTableManagement
{
    public class TimeTableDetailsAc
    {
        public int Id { get; set; }

        public int TimeTableId { get; set; }

        public int SubjectId { get; set; }

        public string SubjectName { get; set; }

        public string SubjectCode { get; set; }

        public WeekDaysEnum WeekDaysEnum { get; set; }

        public string WeekDaysEnumString { get; set; }

        public int PeriodNumber { get; set; }

        public bool IsBreakPeriod { get; set; }

        public List<TimeTableDetailsAc> TimeTableWeekDaySubjectList { get; set; }
    }
}
