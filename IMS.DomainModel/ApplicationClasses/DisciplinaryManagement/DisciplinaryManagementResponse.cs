namespace IMS.DomainModel.ApplicationClasses.DisciplinaryManagement
{
    public class DisciplinaryManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public DisciplinaryManagementResponseType ErrorType { get; set; }

        public object Data { get; set; }
    }

    public enum DisciplinaryManagementResponseType
    {
        StudentId,
        StatusId,
        Subject,
        Description,
        Id
    }
}
