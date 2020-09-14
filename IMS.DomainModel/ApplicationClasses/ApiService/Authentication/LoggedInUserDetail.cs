namespace IMS.DomainModel.ApplicationClasses.ApiService.Authentication
{
    public class LoggedInUserDetail
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string UserAuthToken { get; set; }
    }
}
