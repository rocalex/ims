using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.MarkManagement
{
    public class UpdateClassExamAc
    {
        public UpdateClassExamAc()
        {
            ClassExamSubjectMappings = new List<ClassExamSubjectMappingAc>();
        }
        public int ClassExamId { get; set; }

        public int TotalAttendanceDays { get; set; }

        public List<ClassExamSubjectMappingAc> ClassExamSubjectMappings { get; set; }
    }
}
