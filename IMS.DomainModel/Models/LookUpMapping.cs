using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class LookUpMapping : BaseModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }

        public bool IsDefault { get; set; }

        public bool IsSystemRow { get; set; }

        public bool IsDeleted { get; set; }

        public int LookUpId { get; set; }
        [ForeignKey("LookUpId")]
        public virtual LookUp LookUp { get; set; }
    }
}
