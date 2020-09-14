namespace IMS.DomainModel.ApplicationClasses.StudentPromotionManagement
{
    public class StudentPromotionManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public StudentPromotionManagementResponseType ErrorType { get; set; }
    }

    public enum StudentPromotionManagementResponseType
    {
        StudentId,
        ClassId,
        SectionId
    }
}
