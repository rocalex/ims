using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class VehicleRepair : BaseModel
    {
        [Required]
        public string Code { get; set; }

        public DateTime RepairDate { get; set; }

        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual VehicleMaster Vehicle { get; set; }

        [Required]
        public double RepairCost { get; set; }

        public string Remarks { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
