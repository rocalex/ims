namespace IMS.DomainModel.ApplicationClasses.VehicleAccidentManagement
{
    public class VehicleAccidentManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public VehicleAccidentManagementResponseType ErrorType { get; set; }
    }

    public enum VehicleAccidentManagementResponseType
    {
        Code,
        VehicleId,
        DriverId,
        Id
    }
}
