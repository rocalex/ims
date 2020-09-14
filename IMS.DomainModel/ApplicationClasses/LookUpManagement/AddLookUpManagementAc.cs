using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.LookUpManagement
{
    public class AddLookUpManagementAc
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }

        public bool IsDefault { get; set; }

        public bool IsSystemRow { get; set; }

        public bool IsDeleted { get; set; }

        public int LookUpId { get; set; }
    }
}
