using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.SectionManagement
{
    public class UpdateSectionManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int SectionId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
