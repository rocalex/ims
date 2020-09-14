namespace IMS.DomainModel.ApplicationClasses.StudentFeeManagement
{
    public class StudentFeeResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public object Data { get; set; }
    }
}
