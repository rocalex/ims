using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Authentication
{
    public class ForgotPasswordResetAc
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string PasswordGenerationToken { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "Password should be of at least 6 digits")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "Password should be of at least 6 digits")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
