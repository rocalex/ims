using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.VehicleMaintenanceManagement
{
    public class AddVehicleMaintenanceManagementAc
    {
        [Required]
        public string Code { get; set; }

        public DateTime MaintenanceDate { get; set; }

        public int VehicleId { get; set; }

        public DateTime NextMaintenanceDate { get; set; }

        public string MaintenanceDoneBy { get; set; }

        [Required]
        public double EstimateCost { get; set; }

        [Required]
        public string ActionTaken { get; set; }

        public string Remark { get; set; }
    }
}
