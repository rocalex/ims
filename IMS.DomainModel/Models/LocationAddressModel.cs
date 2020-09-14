using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class LocationAddressModel
    {
        public int Id { get; set; }

        public int CountryId { get; set; }

        public int StateId { get; set; }

        public int? CityId { get; set; }
        [ForeignKey("CityId")]
        public virtual AdministrationCity City { get; set; }

        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string ZipCode { get; set; }
        public string Description { get; set; }

        public int InstituteId { get; set; }
    }
}
