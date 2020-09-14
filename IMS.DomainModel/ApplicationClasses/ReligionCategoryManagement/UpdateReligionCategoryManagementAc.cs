using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.ReligionCategoryManagement
{
    public class UpdateReligionCategoryManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int ReligionCategoryId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
