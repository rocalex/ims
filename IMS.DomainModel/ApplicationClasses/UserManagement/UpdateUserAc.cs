using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.UserManagement
{
    public class UpdateUserAc
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int InstituteId { get; set; }

        public List<int> UserGroupIdList { get; set; }
    }
}
