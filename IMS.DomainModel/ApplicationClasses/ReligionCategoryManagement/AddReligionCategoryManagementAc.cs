using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.ReligionCategoryManagement
{
    public class AddReligionCategoryManagementAc
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
