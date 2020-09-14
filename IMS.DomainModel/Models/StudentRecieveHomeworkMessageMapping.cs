using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentRecieveHomeworkMessageMapping : BaseModel
    {
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public int HomeworkMessageId { get; set; }
        [ForeignKey("HomeworkMessageId")]
        public virtual HomeworkMessageMapping HomeworkMessageMapping { get; set; }
    }
}
