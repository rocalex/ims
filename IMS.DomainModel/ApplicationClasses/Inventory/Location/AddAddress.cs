using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Inventory.Location
{
    public class AddAddress
    {
        public int CountryId { get; set; }

        public int StateId { get; set; }

        public int CityId { get; set; }

        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string ZipCode { get; set; }
        public string Description { get; set; }

        public int InstituteId { get; set; }
    }
}
