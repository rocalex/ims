using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class VehicleMaintenance : BaseModel
    {
        [Required]
        public string Code { get; set; }

        public DateTime MaintenanceDate { get; set; }

        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual VehicleMaster Vehicle { get; set; }

        public DateTime NextMaintenanceDate { get; set; }

        public string MaintenanceDoneBy { get; set; }

        [Required]
        public double EstimateCost { get; set; }

        [Required]
        public string ActionTaken { get; set; }

        public string Remark { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
