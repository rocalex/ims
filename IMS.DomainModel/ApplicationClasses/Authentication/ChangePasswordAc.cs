using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Authentication
{
    public class ChangePasswordAc
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
