using IMS.DomainModel.ApplicationClasses;
using System.Threading.Tasks;

namespace IMS.Utility.SmsService
{
    public interface ISmsService
    {
        /// <summary>
        /// Method for sending SMS using MSG91 - RS
        /// </summary>
        /// <param name="phoneNumber"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        Task<NotificationErrorAc> SendSms(string phoneNumber, string message);
    }
}
