using System;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class StaffPlannerAc
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime DateOfPlan { get; set; }

        public bool IsActive { get; set; }

        public int StaffId { get; set; }

        public string StaffName { get; set; }

        public int InstituteId { get; set; }

        public List<StaffPlannerAttendeeMappingAc> PlannerAttendeeList { get; set; }
    }
}
