using System;
using System.ComponentModel.DataAnnotations;


namespace IMS.DomainModel.ApplicationClasses.Inventory.Lookup.ItemTypeManagement
{
    public class AddItemType
    {
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
