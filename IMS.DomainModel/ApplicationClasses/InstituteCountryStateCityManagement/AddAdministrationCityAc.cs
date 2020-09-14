using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteCountryStateCityManagement
{
    public class AddAdministrationCityAc
    {
        [Required]
        public string Name { get; set; }

        public int StateId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
