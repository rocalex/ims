using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class InstituteSubject : BaseModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public bool IsGroup { get; set; }

        public string Description { get; set; }

        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }
    }
}
