using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class HomeworkSubjectMapping : BaseModel
    {
        public int HomeworkId { get; set; }
        [ForeignKey("HomeworkId")]
        public virtual Homework Homework { get; set; }

        public int SubjectId { get; set; }
        [ForeignKey("SubjectId")]
        public virtual InstituteSubject Subject { get; set; }

        [Required]
        public string HomeworkData { get; set; }

        public bool IsSelected { get; set; }
    }
}
