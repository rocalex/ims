using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.VehicleMasterManagement
{
    public class AddVehicleMasterManagementAc
    {
        [Required]
        public string VehicleCode { get; set; }

        [Required]
        public string VehicleType { get; set; }

        [Required]
        public string FuelType { get; set; }

        [Required]
        public string VehicleRegistrationNumber { get; set; }

        [Required]
        public string EngineNumber { get; set; }

        public string ChasisNumber { get; set; }

        [Required]
        public decimal AverageKMPL { get; set; }

        public string InsuranceNumber { get; set; }

        public DateTime? InsuranceDate { get; set; }

        public DateTime? InsuranceExpDate { get; set; }

        [Required]
        public DateTime NextMaintenanceDate { get; set; }

        public DateTime? PermitValidityDate { get; set; }

        public DateTime? FitnessExpDate { get; set; }

        public string ExtraFittings { get; set; }
    }
}
