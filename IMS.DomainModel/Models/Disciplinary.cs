using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Disciplinary : BaseModel
    {
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public int StatusId { get; set; }
        [ForeignKey("StatusId")]
        public DisciplinaryStatus Status { get; set; }

        [Required]
        public string Subject { get; set; }

        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        public string Attachment { get; set; }

        public string Remarks { get; set; }

        public string UploadMemo { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
