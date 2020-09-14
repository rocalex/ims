using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Inventory.Lookup.UOMManagement
{
    public class UpdateUOM
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }

        public DateTime CreatedOn { get; set; }
        public string Description { get; set; }

        public bool Status { get; set; }

        [Required]
        public int InstituteId { get; set; }
    }
}
