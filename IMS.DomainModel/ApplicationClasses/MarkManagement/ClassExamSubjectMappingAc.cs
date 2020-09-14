using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.MarkManagement
{
    public class ClassExamSubjectMappingAc
    {
        public int SubjectId { get; set; }

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
    }
}
