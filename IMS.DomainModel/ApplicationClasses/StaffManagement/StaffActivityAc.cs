using System;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class StaffActivityAc
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool IsActive { get; set; }

        public int InstituteId { get; set; }

        public string Location { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public int MeetingAgendaId { get; set; }

        public string MeetingAgendaName { get; set; }

        public int ActivityStatusId { get; set; }

        public string ActivityStatusName { get; set; }

        public List<StaffActivityAttendeeMappingAc> ActivityAttendeeList { get; set; }
    }
}
