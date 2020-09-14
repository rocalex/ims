using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Hostel.Lookup.BedStatusManagement
{
    public class AddBedStatus
    {
        [Required]
        public string Name { get; set; }
    }
}
