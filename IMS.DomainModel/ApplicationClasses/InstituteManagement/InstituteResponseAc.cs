namespace IMS.DomainModel.ApplicationClasses.InstituteManagement
{
    public class InstituteResponseAc
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public InstituteResponseType ErrorType { get; set; }
    }

    public enum InstituteResponseType
    {
        InstituteName,
        Code,
        InstituteAdminEmail,
        Id
    }
}
