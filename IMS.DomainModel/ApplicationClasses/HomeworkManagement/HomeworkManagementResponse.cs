namespace IMS.DomainModel.ApplicationClasses.HomeworkManagement
{
    public class HomeworkManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public HomeworkManagementReponseType ErrorType { get; set; }

        public object Data { get; set; }
    }

    public enum HomeworkManagementReponseType
    {
        StaffId,
        ClassId,
        SectionId,
        SubjectId,
        HomeworkData,
        Id,
        Message,
        Subject
    }
}
