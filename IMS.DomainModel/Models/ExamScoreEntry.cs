using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class ExamScoreEntry : BaseModel
    {
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public int ExamId { get; set; }
        [ForeignKey("ExamId")]
        public virtual ClassExam Exam { get; set; }

        public int SubjectId { get; set; }
        [ForeignKey("SubjectId")]
        public virtual InstituteSubject Subject { get; set; }

        [Required]
        public double Mark { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
