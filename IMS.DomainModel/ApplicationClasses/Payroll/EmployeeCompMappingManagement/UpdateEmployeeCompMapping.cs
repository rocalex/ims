using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Payroll.EmployeeCompMappingManagement
{
    public class UpdateEmployeeCompMapping
    {
        public int Id { get; set; }

        [Required]
        public int ComponentId { get; set; }

        [Required]
        public int ComponentTypeId { get; set; }

        public string Formula { get; set; }

        public string Operator { get; set; }

        public int Amount { get; set; }

        public int StaffId { get; set; }
    }
}
