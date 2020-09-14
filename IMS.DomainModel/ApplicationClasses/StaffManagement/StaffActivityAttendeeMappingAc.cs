using IMS.DomainModel.Enums;

namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class StaffActivityAttendeeMappingAc
    {
        public int ActivityId { get; set; }

        public string ActivityName { get; set; }

        public string AttendeeId { get; set; }

        public string AttendeeName { get; set; }

        public bool IsSelected { get; set; }

        public ActivityAttendeeTypeEnum ActivityAttendeeType { get; set; }

        public string ActivityAttendeeTypeString { get; set; }
    }
}
