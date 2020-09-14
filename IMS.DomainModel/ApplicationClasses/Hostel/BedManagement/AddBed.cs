using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Hostel.BedManagement
{
    public class AddBed
    {
        [Required]
        public int RoomId { get; set; }

        [Required]
        public string BedNo { get; set; }

        [Required]
        public int Status { get; set; }
    }
}
