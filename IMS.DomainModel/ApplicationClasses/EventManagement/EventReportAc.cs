namespace IMS.DomainModel.ApplicationClasses.EventManagement
{
    public class EventReportAc
    {
        // SMS or Email
        public string Format { get; set; }

        public string To { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }

        public string SentOn { get; set; }
    }
}
