using IMS.DomainModel.ApplicationClasses;
using IMS.DomainModel.AppSettings;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace IMS.Utility.SmsService
{
    public class SmsService : ISmsService
    {
        #region Private Variable(s)

        private readonly SmsConfiguration _smsConfiguration;

        #endregion

        #region Constructor

        public SmsService(IOptions<SmsConfiguration> smsConfiguration)
        {
            _smsConfiguration = smsConfiguration.Value;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for sending SMS using MSG91 - RS
        /// </summary>
        /// <param name="phoneNumber"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public async Task<NotificationErrorAc> SendSms(string phoneNumber, string message)
        {
            message = HttpUtility.UrlEncode(message);

            try
            {
                string apiUrl = string.Format(_smsConfiguration.SmsApi, message, _smsConfiguration.UserId, _smsConfiguration.Password, phoneNumber);

                WebRequest request = WebRequest.Create(apiUrl);
                HttpWebResponse response = (HttpWebResponse) (await request.GetResponseAsync());
                Stream stream = response.GetResponseStream();

                Encoding ec = Encoding.GetEncoding("utf-8");
                StreamReader reader = new StreamReader(stream, ec);
                string result = reader.ReadToEnd();

                reader.Close();
                stream.Close();

                return new NotificationErrorAc { Message = "SMS sent", HasError = false };
            }
            catch(Exception ex)
            {
                return new NotificationErrorAc { Message = ex.Message.ToString(), HasError = true };
            }
        }

        #endregion
    }
}
