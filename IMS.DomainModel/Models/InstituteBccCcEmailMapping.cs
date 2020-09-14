using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class InstituteBccCcEmailMapping : BaseModel
    {
        [Required]
        public string Email { get; set; }

        public bool IsBcc { get; set; }

        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }
    }
}
