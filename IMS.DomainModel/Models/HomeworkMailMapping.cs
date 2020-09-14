using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class HomeworkMailMapping : BaseModel
    {
        public int HomeworkId { get; set; }
        [ForeignKey("HomeworkId")]
        public virtual Homework Homework { get; set; }

        [Required]
        public string Message { get; set; }

        public string Subject { get; set; }

        public virtual ICollection<StudentRecieveHomeworkMailMapping> StudentRecieveHomeworkMailMappings { get; set; }
    }
}
