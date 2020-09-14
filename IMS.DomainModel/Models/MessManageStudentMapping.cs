using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.Models
{
    public class MessManageStudentMapping
    {
        public int Id { get; set; }
        
        [Required]
        public int MessManageId { get; set; }
        [ForeignKey("MessManageId")]
        public virtual MessManage MessManage { get; set; }

        [Required]
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        [Required]
        public string CardNumber { get; set; }

        [Required]
        public string Duration { get; set; }

        public int InstituteId { get; set; }
    }
}
