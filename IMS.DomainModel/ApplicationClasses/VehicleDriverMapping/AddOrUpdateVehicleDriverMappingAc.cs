using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.VehicleDriverMapping
{
    public class AddOrUpdateVehicleDriverMappingAc
    {
        public AddOrUpdateVehicleDriverMappingAc()
        {
            Drivers = new List<DriverMappingAc>();
        }
        public int VehicleId { get; set; }
        
        public List<DriverMappingAc> Drivers { get; set; }
    }

    public class DriverMappingAc
    {
        public int DriverId { get; set; }

        public bool IsPrimary { get; set; }
    }
}
