using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.BloodGroupManagement
{
    public class UpdateBloodGroupManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int BloodGroupId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
