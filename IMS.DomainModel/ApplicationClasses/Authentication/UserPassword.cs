using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Authentication
{
    public class UserPassword
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
