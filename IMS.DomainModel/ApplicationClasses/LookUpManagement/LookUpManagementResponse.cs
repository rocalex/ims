namespace IMS.DomainModel.ApplicationClasses.LookUpManagement
{
    public class LookUpManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public LookUpManagementResponseType ErrorType { get; set; }
    }

    public enum LookUpManagementResponseType
    {
        Code,
        Name,
        Other
    }
}
