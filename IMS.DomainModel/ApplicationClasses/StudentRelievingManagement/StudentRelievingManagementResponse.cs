namespace IMS.DomainModel.ApplicationClasses.StudentRelievingManagement
{
    public class StudentRelievingManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public StudentRelievingManagementResponseType ErrorType { get; set; }
    }

    public enum StudentRelievingManagementResponseType
    {
        StudentId
    }
}
