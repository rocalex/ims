using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.VehicleRepairManagement
{
    public class AddVehicleRepairManagementAc
    {
        [Required]
        public string Code { get; set; }

        public DateTime RepairDate { get; set; }

        public int VehicleId { get; set; }

        [Required]
        public double RepairCost { get; set; }

        public string Remarks { get; set; }
    }
}
