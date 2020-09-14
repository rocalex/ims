namespace IMS.DomainModel.ApplicationClasses.VehicleBreakDownManagement
{
    public class VehicleBreakDownManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public VehicleBreakDownManagementResponseType ErrorType { get; set; }
    }

    public enum VehicleBreakDownManagementResponseType
    {
        Code,
        VehicleId,
        DriverId,
        Id
    }
}
