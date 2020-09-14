using IMS.DomainModel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class VehicleMaster : BaseModel
    {
        [Required]
        public string VehicleCode { get; set; }

        [Required]
        public VehicleMasterTypeEnum VehicleType { get; set; }

        [Required]
        public VehicleMasterFuelTypeEnum FuelType { get; set; }

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

        public string VehiclePhoto { get; set; }

        public string RegistrationCopyPhoto { get; set; }

        public string InsuranceCopyPhoto { get; set; }

        [Required]
        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        [NotMapped]
        public string VehicleTypeDescription { get; set; }

        [NotMapped]
        public string FuelTypeDescription { get; set; }

        public virtual ICollection<VehicleDocumentMapping> VehicleDocumentMappings { get; set; }
    }
}
