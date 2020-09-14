using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class FeeComponent : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public FeeComponentTypeEnum FeeComponentType { get; set; }

        [Required]
        public int Priority { get; set; }

        [Required]
        public int InstituteId { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }
    }
}
