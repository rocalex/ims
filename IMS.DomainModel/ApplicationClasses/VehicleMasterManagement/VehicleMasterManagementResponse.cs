namespace IMS.DomainModel.ApplicationClasses.VehicleMasterManagement
{
    public class VehicleMasterManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public VehicleMasterManagementResponseType ErrorType { get; set; }

        public object Data { get; set; }
    }

    public enum VehicleMasterManagementResponseType
    {
        VehicleCode,
        VehicleType,
        FuelType,
        VehicleRegistrationNumber,
        EngineNumber,
        Id
    }
}
