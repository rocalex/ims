namespace IMS.DomainModel.ApplicationClasses.VehicleRepairManagement
{
    public class VehicleRepairManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public VehicleRepairManagementResponseType ErrorType { get; set; }
    }

    public enum VehicleRepairManagementResponseType
    {
        Code,
        VehicleId,
        Id
    }
}
