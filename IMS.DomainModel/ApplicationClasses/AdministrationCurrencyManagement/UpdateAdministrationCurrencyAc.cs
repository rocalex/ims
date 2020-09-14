using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.AdministrationCurrencyManagement
{
    public class UpdateAdministrationCurrencyAc
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }

        public int CurrencyId { get; set; }
    }
}
