using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.VehicleAccidentManagement
{
    public class AddVehicleAccidentManagementAc
    {
        [Required]
        public string Code { get; set; }

        public DateTime AccidentDate { get; set; }

        public int VehicleId { get; set; }

        [Required]
        public double EstimateCost { get; set; }

        public int DriverId { get; set; }

        public string Address { get; set; }
    }
}
