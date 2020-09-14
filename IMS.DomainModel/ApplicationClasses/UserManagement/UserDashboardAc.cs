using IMS.DomainModel.ApplicationClasses.TimeTableManagement;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.UserManagement
{
    public class UserDashboardAc
    {
        public string Name { get; set; }

        public string Institute { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Class { get; set; }

        public string Section { get; set; }

        public string Religion { get; set; }

        public string Nationality { get; set; }

        public string PersonalImage { get; set; }

        public string RollNumber { get; set; }

        public string EmployeeId { get; set; }

        public int ClassStudentCount { get; set; }

        public int InstituteStudentCount { get; set; }

        public AddTimeTableAc TimeTableDetails { get; set; }

        public UserDashboardTypeEnum UserDashboardType { get; set; }

        public List<InstituteClass> ClassList { get; set; }

        public List<Section> SectionsList { get; set; }

        public List<StaffActivity> ActivityList { get; set; }
    }
}
