using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteCountryStateCityManagement
{
    public class AddAdministrationCountryAc
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
