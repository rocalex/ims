using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentRecieveHomeworkMailMapping : BaseModel
    {
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public int HomeworkMailId { get; set; }
        [ForeignKey("HomeworkMailId")]
        public virtual HomeworkMailMapping HomeworkMailMapping { get; set; }
    }
}
