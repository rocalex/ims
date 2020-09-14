namespace IMS.DomainModel.ApplicationClasses.InstituteClassManagement
{
    public class InstituteClassResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public InstituteClassResponseType ErrorType { get; set; }
    }

    public enum InstituteClassResponseType
    {
        GroupCode,
        Name,
        Duration,
        ClassOrder,
        NumberOfFeeTerms,
        Other,
        ClassTeacherId
    }
}
