using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.ReligionManagement
{
    public class UpdateReligionManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int ReligionId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
