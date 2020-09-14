namespace IMS.DomainModel.ApplicationClasses.DriverMasterManagement
{
    public class DriverMasterManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public DriverMasterManagementResponseType ErrorType { get; set; }

        public object Data { get; set; }
    }

    public enum DriverMasterManagementResponseType
    {
        Name,
        MobileNumber,
        LicenseNumber,
        LicenseType,
        PlaceOfIssue,
        IssuingAuthority,
        Id
    }
}
