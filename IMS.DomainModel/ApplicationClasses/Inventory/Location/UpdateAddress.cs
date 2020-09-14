using System;
using System.Collections.Generic;
using System.Text;

namespace IMS.DomainModel.ApplicationClasses.Inventory.Location
{
    public class UpdateAddress
    {
        public int Id { get; set; }

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
