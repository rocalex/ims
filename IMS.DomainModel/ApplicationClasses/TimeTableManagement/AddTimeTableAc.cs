using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.TimeTableManagement
{
    public class AddTimeTableAc
    {
        public TimeTableAc TimeTable { get; set; }

        public List<TimeTableDetailsAc> TimeTableSubjectDetailsList { get; set; }

        public List<TimeTableBreakDetailsAc> TimeTableBreakDetailsList { get; set; }
    }
}
