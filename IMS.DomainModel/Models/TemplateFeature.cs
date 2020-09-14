using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class TemplateFeature : BaseModel
    {
        [Required]
        public string Name { get; set; }

        public int InstituteId { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }
    }
}
