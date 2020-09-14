using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.MarkManagement
{
    public class AddClassExamAc
    {
        public AddClassExamAc()
        {
            ClassExamSubjectMappings = new List<ClassExamSubjectMappingAc>();
        }
        public int ClassId { get; set; }

        public int SectionId { get; set; }

        public int ExamId { get; set; }

        public int TotalAttendanceDays { get; set; }

        public List<ClassExamSubjectMappingAc> ClassExamSubjectMappings { get; set; }
    }
}
