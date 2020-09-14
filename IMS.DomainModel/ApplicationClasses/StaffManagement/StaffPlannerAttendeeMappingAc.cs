using IMS.DomainModel.Enums;

namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class StaffPlannerAttendeeMappingAc
    {
        public int PlannerId { get; set; }

        public string PlannerName { get; set; }

        public string AttendeeId { get; set; }

        public string AttendeeName { get; set; }

        public bool IsSelected { get; set; }

        public ActivityAttendeeTypeEnum PlannerAttendeeType { get; set; }

        public string PlannerAttendeeTypeString { get; set; }
    }
}
