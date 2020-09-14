using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Hostel.ExpenseTypeManagement
{
    public class UpdateExpenseType
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

        public int InstituteId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
