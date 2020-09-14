using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.GenderManagement
{
    public class UpdateGenderManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int GenderId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
