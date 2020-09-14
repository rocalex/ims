using IMS.DomainModel.Enums;

namespace IMS.DomainModel.ApplicationClasses.NotificationManagement
{
    public class NotificationUserMappingAc
    {
        public int NotificationId { get; set; }

        public string UserId { get; set; }

        public string UserName { get; set; }

        public NoticeToEnum UserType { get; set; }

        public string UserTypeString { get; set; }

        public bool IsNotificationRead { get; set; }
    }
}
