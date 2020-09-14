using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class VehicleAccident : BaseModel
    {
        [Required]
        public string Code { get; set; }

        public DateTime AccidentDate { get; set; }

        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual VehicleMaster Vehicle { get; set; }

        [Required]
        public double EstimateCost { get; set; }

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
