using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteSubjectManagement
{
    public class AddInstituteSubjectManagementAc
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public bool IsGroup { get; set; }

        public string Description { get; set; }
    }
}
