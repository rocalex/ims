namespace IMS.DomainModel.ApplicationClasses.MarkManagement
{
    public class ClassExamResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public ClassExamResponseType ErrorType { get; set; }
    }

    public enum ClassExamResponseType
    {
        ClassId,
        SectionId,
        ExamId,
        SubjectId,
        ClassExamId
    }
}
