using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteCountryStateCityManagement
{
    public class UpdateAdministrationCityAc
    {
        [Required]
        public string Name { get; set; }

        public int StateId { get; set; }

        public int CityId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
