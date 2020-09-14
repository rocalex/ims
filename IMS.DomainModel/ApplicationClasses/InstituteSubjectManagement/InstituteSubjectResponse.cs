namespace IMS.DomainModel.ApplicationClasses.InstituteSubjectManagement
{
    public class InstituteSubjectResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public InstituteSubjectResponseType ErrorType { get; set; }
    }

    public enum InstituteSubjectResponseType
    {
        Code,
        Name,
        Other
    }
}
