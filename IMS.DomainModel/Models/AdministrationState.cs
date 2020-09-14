using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class AdministrationState : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }

        public int CountryId { get; set; }
        [ForeignKey("CountryId")]
        public virtual AdministrationCountry Country { get; set; }

        public virtual ICollection<AdministrationCity> Cities { get; set; }
    }
}
