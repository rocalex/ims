namespace IMS.DomainModel.ApplicationClasses.VehicleDriverMapping
{
    public class VehicleDriverMappingResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public VehicleDriverMappingResponseType ErrorType { get; set; }
    }

    public enum VehicleDriverMappingResponseType
    {
        VehicleId,
        DriverId
    }
}
