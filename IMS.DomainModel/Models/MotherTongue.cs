using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class MotherTongue : BaseModel
    {
        [Required]
        public string Language { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }

        public int InstituteId { get; set; }

        public string CreatedBy { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }
    }
}
