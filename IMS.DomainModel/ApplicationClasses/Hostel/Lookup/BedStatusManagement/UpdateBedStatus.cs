using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Hostel.Lookup.BedStatusManagement
{
    public class UpdateBedStatus
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
