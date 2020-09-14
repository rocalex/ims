using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteCountryStateCityManagement
{
    public class UpdateAdministrationStateAc
    {
        [Required]
        public string Name { get; set; }

        public int StateId { get; set; }

        public int CountryId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
