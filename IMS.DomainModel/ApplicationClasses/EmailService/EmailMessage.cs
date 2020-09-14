using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.EmailService
{
    public class EmailMessage
    {
        public EmailMessage()
        {
            ToAddresses = new List<EmailAddress>();
            FromAddresses = new List<EmailAddress>();
            BccAddresses = new List<EmailAddress>();
            CcAddresses = new List<EmailAddress>();
        }

        public List<EmailAddress> ToAddresses { get; set; }
        public List<EmailAddress> FromAddresses { get; set; }
        public List<EmailAddress> BccAddresses { get; set; }
        public List<EmailAddress> CcAddresses { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
    }
}
