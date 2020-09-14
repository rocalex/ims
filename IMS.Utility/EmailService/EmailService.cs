using IMS.DomainModel.ApplicationClasses.EmailService;
using IMS.DomainModel.AppSettings;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System.Linq;

namespace IMS.Utility.EmailService
{
    public class EmailService : IEmailService
    {
        #region Private Variable(s)

        private readonly EmailConfiguration _emailConfiguration;

        #endregion

        #region Constructor

        public EmailService(IOptions<EmailConfiguration> options)
        {
            _emailConfiguration = options.Value;
        }

        #endregion

        #region Public Method(s)

        /// <summary>
        /// Method to send mail in html template - SS
        /// </summary>
        /// <param name="emailMessage">email details</param>
        public void SendMail(EmailMessage emailMessage)
        {
            var message = new MimeMessage();
            message.To.AddRange(emailMessage.ToAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));
            message.From.AddRange(emailMessage.FromAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));
            if (emailMessage.BccAddresses.Count != 0)
                message.Bcc.AddRange(emailMessage.BccAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));
            if (emailMessage.CcAddresses.Count != 0)
                message.Bcc.AddRange(emailMessage.CcAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));

            message.Subject = emailMessage.Subject;
            //We will say we are sending HTML. But there are options for plaintext etc. 
            message.Body = new TextPart(TextFormat.Html)
            {
                Text = emailMessage.Content
            };

            //Be careful that the SmtpClient class is the one from Mailkit not the framework!
            using (var emailClient = new SmtpClient())
            {
                //The last parameter here is to use SSL (Which you should!)
                emailClient.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.SmtpPort, SecureSocketOptions.StartTlsWhenAvailable);

                //Remove any OAuth functionality as we won't be using it. 
                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");

                emailClient.Authenticate(_emailConfiguration.SmtpUsername, _emailConfiguration.SmtpPassword);

                emailClient.Send(message);

                emailClient.Disconnect(true);
            }
        }

        /// <summary>
        /// Method to send mail with specific format - RS
        /// </summary>
        /// <param name="emailMessage">email details</param>
        public void SendMail(EmailMessage emailMessage, TextFormat textFormat)
        {
            var message = new MimeMessage();
            message.To.AddRange(emailMessage.ToAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));
            message.From.AddRange(emailMessage.FromAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));
            if (emailMessage.BccAddresses.Count != 0)
                message.Bcc.AddRange(emailMessage.BccAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));
            if (emailMessage.CcAddresses.Count != 0)
                message.Bcc.AddRange(emailMessage.CcAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));

            message.Subject = emailMessage.Subject;
            //We will say we are sending HTML. But there are options for plaintext etc. 
            message.Body = new TextPart(textFormat)
            {
                Text = emailMessage.Content
            };

            //Be careful that the SmtpClient class is the one from Mailkit not the framework!
            using (var emailClient = new SmtpClient())
            {
                //The last parameter here is to use SSL (Which you should!)
                emailClient.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.SmtpPort, true);

                //Remove any OAuth functionality as we won't be using it. 
                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");

                emailClient.Authenticate(_emailConfiguration.SmtpUsername, _emailConfiguration.SmtpPassword);

                emailClient.Send(message);

                emailClient.Disconnect(true);
            }
        }

        #endregion
    }
}
