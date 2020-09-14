using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class EmployeeCompMapping
    {
        public int Id { get; set; }

        [Required]
        public int ComponentId { get; set; }
        [ForeignKey("ComponentId")]
        public virtual PayrollComponent Component { get; set; }

        [Required]
        public int ComponentTypeId { get; set; }

        public string Formula { get; set; }

        public string Operator { get; set; }

        public int Amount { get; set; }

        public DateTime CreatedOn { get; set; }

        [Required]
        public int StaffId { get; set; }
        [ForeignKey("StaffId")]
        public virtual StaffBasicPersonalInformation Staff { get; set; }

        public int InstituteId { get; set; }
    }
}
