using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class AdministrationCity : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }

        public int StateId { get; set; }
        [ForeignKey("StateId")]
        public virtual AdministrationState State { get; set; }
    }
}
