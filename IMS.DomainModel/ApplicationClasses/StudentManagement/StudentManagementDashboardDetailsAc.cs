using IMS.DomainModel.ApplicationClasses.VisualChartData;
using IMS.DomainModel.Models;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StudentManagement
{
    public class StudentManagementDashboardDetailsAc
    {
        public List<ReligionWiseStudentStaffPercentageAc> ReligionWiseStudentPercentagesList { get; set; }

        public List<ClassWiseStudentStaffPercentageAc> ClassWiseStudentPercentagesList { get; set; }

        public List<ActiveInactiveStudentStaffPercentageAc> ActiveInactiveStudentPercentagesList { get; set; }

        public List<GenderWiseStudentStaffPercentageAc> GenderWiseStudentPercentagesList { get; set; }

        public int TotalStudentsCount { get; set; }

        public int ActiveStudentsCount { get; set; }

        public int InActiveStudentsCount { get; set; }

        public int TerminatedStudentsCount { get; set; }

        public double TotalFeeCollected { get; set; }

        public double TotalFeeRefunded { get; set; }

        public List<StaffActivity> ActivityList { get; set; }
    }
}
