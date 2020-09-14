using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StudentFeeManagement
{
    public class StudentFeePdfReportAc
    {
        public string RollNumber { get; set; }

        public string AdmissionNumber { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string CurrentClass { get; set; }

        public string Section { get; set; }

        public string Religion { get; set; }

        public string IsActive { get; set; }

        public string IsArchived { get; set; }

        public List<StudentFeeExcelReportAc> PaymentDetails { get; set; }
    }
}
