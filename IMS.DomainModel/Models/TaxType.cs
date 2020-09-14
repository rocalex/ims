using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.Models
{
    public class TaxType
    {
        public int Id { get; set; }

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
