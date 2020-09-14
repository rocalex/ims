using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.VehicleBreakDownManagement
{
    public class AddVehicleBreakDownManagementAc
    {
        [Required]
        public string Code { get; set; }

        public DateTime BreakDownDate { get; set; }

        public int VehicleId { get; set; }

        public DateTime BreakDownDuration { get; set; }

        public int DriverId { get; set; }

        public string Address { get; set; }
    }
}
