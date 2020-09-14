using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.ApiService.Authentication
{
    public class UserPasswordLogIn
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
