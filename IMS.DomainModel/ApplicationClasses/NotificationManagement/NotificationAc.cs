using IMS.DomainModel.Enums;
using System;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.NotificationManagement
{
    public class NotificationAc
    {
        public int Id { get; set; }

        public DateTime NotificationCreationDate { get; set; }

        public NoticeToEnum? NotificationTo { get; set; }

        public string NotificationToString { get; set; }

        public string NotificationMessage { get; set; }

        public string NotificationDetails { get; set; }

        public List<NotificationUserMappingAc> NotificationUserMappingsList { get; set; }

        public string InstituteName { get; set; }

        public bool IsReadByUser { get; set; }
    }
}
