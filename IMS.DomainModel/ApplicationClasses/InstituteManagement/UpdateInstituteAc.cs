using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteManagement
{
    public class UpdateInstituteAc
    {
        public int Id { get; set; }

        public string Address { get; set; }

        public string Location { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }
    }
}
