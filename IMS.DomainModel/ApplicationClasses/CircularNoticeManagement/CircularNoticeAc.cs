using IMS.DomainModel.Enums;
using System;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.CircularNoticeManagement
{
    public class CircularNoticeAc
    {
        public int Id { get; set; }

        public DateTime NoticeDate { get; set; }

        public NoticeToEnum NoticeTo { get; set; }

        public string NoticeToString { get; set; }

        public NoticeTypeEnum NoticeType { get; set; }

        public string NoticeTypeString { get; set; }

        public string Message { get; set; }

        public string Description { get; set; }

        public bool IsNotificationSendingEnabled { get; set; }

        public List<CircularNoticeRecipientAc> CircularNoticeRecipientsList { get; set; }

        public string InstituteName { get; set; }

        public string CreatedByName { get; set; }
    }
}
