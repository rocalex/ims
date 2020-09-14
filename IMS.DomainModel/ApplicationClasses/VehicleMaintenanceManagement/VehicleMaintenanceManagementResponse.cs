namespace IMS.DomainModel.ApplicationClasses.VehicleMaintenanceManagement
{
    public class VehicleMaintenanceManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public VehicleMaintenanceManagementResponseType ErrorType { get; set; }
    }

    public enum VehicleMaintenanceManagementResponseType
    {
        Code,
        VehicleId,
        ActionTaken,
        Id
    }
}
