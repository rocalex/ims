using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Homework : BaseModel
    {
        public int StaffId { get; set; }
        [ForeignKey("StaffId")]
        public virtual StaffBasicPersonalInformation Staff { get; set; }

        public DateTime HomeworkDate { get; set; }

        public int ClassId { get; set; }
        [ForeignKey("ClassId")]
        public virtual InstituteClass Class { get; set; }

        public int SectionId { get; set; }
        [ForeignKey("SectionId")]
        public virtual Section Section { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public virtual ICollection<HomeworkSubjectMapping> HomeworkSubjectMappings { get; set; }

        public virtual ICollection<HomeworkMailMapping> HomeworkMailMappings { get; set; }

        public virtual ICollection<HomeworkMessageMapping> HomeworkMessageMappings { get; set; }

        [NotMapped]
        public HomeworkMailMapping LastHomeworkMailMapping { get; set; }

        [NotMapped]
        public HomeworkMessageMapping LastHomeworkMessageMapping { get; set; }
    }
}
