using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.MaritalStatusManagement
{
    public class UpdateMaritalStatusManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int MaritalStatusId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
