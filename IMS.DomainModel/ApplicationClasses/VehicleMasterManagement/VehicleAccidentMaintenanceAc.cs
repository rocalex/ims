using System;

namespace IMS.DomainModel.ApplicationClasses.VehicleMasterManagement
{
    public class VehicleAccidentMaintenanceAc
    {
        public string VehicleNumber { get; set; }

        public DateTime Date { get; set; }

        public string Type { get; set; }

        public string Status { get; set; }

        public double EstimatedCost { get; set; }
    }
}
