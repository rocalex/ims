namespace IMS.DomainModel.AppSettings
{
    public class SmsConfiguration
    {
        public string SmsApi { get; set; }

        public string SmsSenderId { get; set; }

        public bool IsSmsSendingEnabled { get; set; }

        public int SmsRoute { get; set; }

        public string UserId { get; set; }

        public string Password { get; set; }
    }
}
