using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.Models
{
    public class ExpenseType
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Type { get; set; }

        public string Description { get; set; }
        public bool Active { get; set; }

        [Required]
        public int InstituteId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
