namespace IMS.DomainModel.ApplicationClasses.MarkManagement
{
    public class ExamScoreEntryResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public ExamScoreEntryResponseType ErrorType { get; set; }
    }

    public enum ExamScoreEntryResponseType
    {
        StudentId,
        SubjectId,
        ExamId
    }
}
