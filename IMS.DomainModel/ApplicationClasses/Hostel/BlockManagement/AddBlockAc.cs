using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Hostel.BlockManagement
{
    public class AddBlockAc
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int HostelId { get; set; }

        public int FloorAmount { get; set; }

        public bool Status { get; set; }
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }
        public int InstituteId { get; set; }
    }
}
