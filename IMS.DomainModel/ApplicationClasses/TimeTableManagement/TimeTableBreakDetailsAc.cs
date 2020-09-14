namespace IMS.DomainModel.ApplicationClasses.TimeTableManagement
{
    public class TimeTableBreakDetailsAc
    {
        public int Id { get; set; }

        public int TimeTableId { get; set; }

        public int BreakDuration { get; set; }

        public int BreakAfterPeriod { get; set; }
    }
}
