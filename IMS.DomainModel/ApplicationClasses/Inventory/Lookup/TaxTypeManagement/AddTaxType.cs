using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Inventory.Lookup.TaxTypeManagement
{
    public class AddTaxType
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }

        public DateTime CreatedOn { get; set; }
        [Required]
        public int Type { get; set; }

        [Required]
        public int Value { get; set; }

        public bool Status { get; set; }

        [Required]
        public int InstituteId { get; set; }
    }
}
