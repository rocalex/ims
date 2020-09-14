using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class ClassExam : BaseModel
    {
        public int ClassId { get; set; }
        [ForeignKey("ClassId")]
        public virtual InstituteClass Class { get; set; }

        public int SectionId { get; set; }
        [ForeignKey("SectionId")]
        public virtual Section Section { get; set; }

        public int ExamId { get; set; }
        [ForeignKey("ExamId")]
        public virtual ExamDefinition Exam { get; set; }

        public int TotalAttendanceDays { get; set; }

        public virtual ICollection<ClassExamSubjectMapping> ClassExamSubjectMappings { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
