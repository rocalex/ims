using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.UserGroup
{
    public class AddUserGroupAc
    {
        [MaxLength(25)]
        [Required]
        public string Code { get; set; }

        [MaxLength(50)]
        [Required]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }
    }
}
