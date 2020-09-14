namespace IMS.DomainModel.ApplicationClasses.TransportationStageManagement
{
    public class TransportationStageManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public TransportationStageManagementResponseType ErrorType { get; set; }
    }

    public enum TransportationStageManagementResponseType
    {
        Name,
        Code,
        Id
    }
}
