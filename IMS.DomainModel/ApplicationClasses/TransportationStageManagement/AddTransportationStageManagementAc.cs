using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.TransportationStageManagement
{
    public class AddTransportationStageManagementAc
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public string Address { get; set; }

        public int SlabId { get; set; }

        public double Term1 { get; set; }

        public double Term2 { get; set; }

        public double Term3 { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }
    }
}
