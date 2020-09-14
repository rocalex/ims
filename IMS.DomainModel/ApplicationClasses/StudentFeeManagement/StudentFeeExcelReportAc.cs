namespace IMS.DomainModel.ApplicationClasses.StudentFeeManagement
{
    public class StudentFeeExcelReportAc
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

        public string FeeComponentType { get; set; }

        public string FeeComponent { get; set; }

        public int? Term { get; set; }

        public double? Amount { get; set; }

        public string PaymentDate { get; set; }
    }
}
