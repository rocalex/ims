using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.UserManagement
{
    public class AddUserAc
    {
        [Required]
        public string Name { get; set; }

        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public int InstituteId { get; set; }

        public List<int> UserGroupIdList { get; set; }
    }
}
