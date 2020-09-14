namespace IMS.DomainModel.ApplicationClasses.ApiService.Authentication
{
    public class ResetPasswordAc
    {
        public string Username { get; set; }

        public string Code { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
