using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class VehicleBreakDown : BaseModel
    {
        [Required]
        public string Code { get; set; }

        public DateTime BreakDownDate { get; set; }

        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual VehicleMaster Vehicle { get; set; }

        public DateTime BreakDownDuration { get; set; }

        public int DriverId { get; set; }
        [ForeignKey("DriverId")]
        public virtual DriverMaster Driver { get; set; }

        public string Address { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
