using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class FloorRoom
    {
        public int Id { get; set; }

        [Required]
        public int FloorNo { get; set; }

        [Required]
        public int BlockId { get; set; }
        [ForeignKey("BlockId")]
        public virtual HostelBlock Block { get; set; }

        [Required]
        public string RoomNo { get; set; }

        [Required]
        public int RoomType { get; set; }
        [ForeignKey("RoomType")]
        public virtual RoomType RoomTypeInstance { get; set; }

        [Required]
        public int BedAmount { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool Status { get; set; }
    }
}
