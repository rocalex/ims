using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Bed
    {
        public int Id { get; set; }

        [Required]
        public int RoomId { get; set; }
        [ForeignKey("RoomId")]
        public virtual FloorRoom Room { get; set; }

        [Required]
        public string BedNo { get; set; }

        [Required]
        public int Status { get; set; }

        public int InstituteId { get; set; }
    }
}
