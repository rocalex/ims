using IMS.DomainModel.Enums;
using System;

namespace IMS.DomainModel.ApplicationClasses.EventManagement
{
    public class EventInfoAc
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime EventDate { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public EventManagementInfoPriorityEnum Priority { get; set; }

        public string PriorityName { get; set; }

        public int InstituteId { get; set; }
    }
}
