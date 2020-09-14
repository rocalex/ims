using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class ClassExamSubjectMapping : BaseModel
    {
        public int SubjectId { get; set; }
        [ForeignKey("SubjectId")]
        public virtual InstituteSubject Subject { get; set; }

        public DateTime? StartDate { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        [Required]
        public double MaxScore { get; set; }

        [Required]
        public double MinScore { get; set; }

        public string Content { get; set; }

        public string Remark { get; set; }

        public int ClassExamId { get; set; }
        [ForeignKey("ClassExamId")]
        public virtual ClassExam ClassExam { get; set; }
    }
}
