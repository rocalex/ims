using IMS.DomainModel.Enums;

namespace IMS.DomainModel.ApplicationClasses.CircularNoticeManagement
{
    public class CircularNoticeRecipientAc
    {
        public int CircularNoticeId { get; set; }

        public string RecipientId { get; set; }

        public string RecipientName { get; set; }

        public NoticeToEnum RecipientType { get; set; }

        public string RecipientTypeString { get; set; }

        public bool IsSelected { get; set; }
    }
}
