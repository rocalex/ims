using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.MaritalStatusManagement
{
    public class AddMaritalStatusManagementAc
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
