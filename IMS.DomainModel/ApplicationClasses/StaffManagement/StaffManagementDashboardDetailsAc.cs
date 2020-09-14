using IMS.DomainModel.ApplicationClasses.VisualChartData;
using IMS.DomainModel.Models;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class StaffManagementDashboardDetailsAc
    {
        public List<StaffBasicPersonalInformation> StaffsList { get; set; }

        public List<ActiveInactiveStudentStaffPercentageAc> ActiveInactiveStaffsPercentageList { get; set; }

        public List<ReligionWiseStudentStaffPercentageAc> ReligionWiseStaffPercentagesList { get; set; }

        public List<ClassWiseStudentStaffPercentageAc> ClassWiseStaffPercentagesList { get; set; }

        public List<GenderWiseStudentStaffPercentageAc> GenderWiseStaffPercentageList { get; set; }

        public List<TeachingTypeWiseStudentStaffPercentageAc> TeachingTypeWiseStaffPercentageList { get; set; }

        public List<NationalityWiseStudentStaffPercentageAc> NationalityWiseStaffPercentagesList { get; set; }

        public List<StaffActivity> ActivityList { get; set; }

        public List<StaffPlanner> StaffPlansList { get; set; }
    }
}
