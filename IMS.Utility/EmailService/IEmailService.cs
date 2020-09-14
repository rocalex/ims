using IMS.DomainModel.ApplicationClasses.EmailService;
using MimeKit.Text;

namespace IMS.Utility.EmailService
{
    public interface IEmailService
    {
        /// <summary>
        /// Method to send mail in html template - SS
        /// </summary>
        /// <param name="emailMessage">email details</param>
        void SendMail(EmailMessage emailMessage);

        /// <summary>
        /// Method to send mail with specific format - RS
        /// </summary>
        /// <param name="emailMessage">email details</param>
        void SendMail(EmailMessage emailMessage, TextFormat textFormat);
    }
}
