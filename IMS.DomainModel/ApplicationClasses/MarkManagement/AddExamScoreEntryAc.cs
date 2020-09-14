namespace IMS.DomainModel.ApplicationClasses.MarkManagement
{
    public class AddExamScoreEntryAc
    {
        public int StudentId { get; set; }

        public int ExamId { get; set; }

        public int SubjectId { get; set; }

        public double Mark { get; set; }
    }
}
