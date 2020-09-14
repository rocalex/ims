namespace IMS.DomainModel.ApplicationClasses.LookUpManagement
{
    public class SharedLookUpResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public SharedLookUpResponseType ErrorType { get; set; }
    }

    public enum SharedLookUpResponseType
    {
        Name,
        Code,
        Other
    }
}
