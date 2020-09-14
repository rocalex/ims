namespace IMS.DomainModel.ApplicationClasses.FeeManagement
{
    public class CourseFeeTermDetailsAc
    {
        public int Id { get; set; }

        public int CourseFeeTermId { get; set; }

        public int FeeComponentId { get; set; }

        public string FeeComponentName { get; set; }

        public double Amount { get; set; }

        public int Term { get; set; }
    }
}
