namespace IMS.DomainModel.ApplicationClasses.TimeTableManagement
{
    public class TimeTableAc
    {
        public int Id { get; set; }

        public int ClassId { get; set; }

        public int SectionId { get; set; }

        public int AcademicYearId { get; set; }

        public int PeriodCount { get; set; }

        public int PeriodDuration { get; set; }

        public string PeriodStartTime { get; set; }

        public int BreaksCount { get; set; }
    }
}
