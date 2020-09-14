using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class AdministrationCurrency : BaseModel
    {
        [Required]
        public string CurrencyName { get; set; }

        [Required]
        public string Symbol { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }

        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }
    }
}
