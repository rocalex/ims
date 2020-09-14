using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.RoleManagement
{
    public class AddRoleAc
    {
        [Required]
        public string RoleName { get; set; }
    }
}
