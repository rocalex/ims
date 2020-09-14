using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class LookUp : BaseModel
    {
        [Required]
        public string Name { get; set; }

        public bool Status { get; set; }

        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public virtual ICollection<LookUpMapping> LookUpMappings { get; set; }
    }
}
