using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class HostelBlock
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public int HostelId { get; set; }
        [ForeignKey("HostelId")]
        public virtual Hostel Hostel { get; set; }

        public int FloorAmount { get; set; }

        public bool Status { get; set; }
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }

        public int InstituteId { get; set; }
    }
}
