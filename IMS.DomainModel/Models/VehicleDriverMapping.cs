using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class VehicleDriverMapping : BaseModel
    {
        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual VehicleMaster Vehicle { get; set; }

        public int DriverId { get; set; }
        [ForeignKey("DriverId")]
        public virtual DriverMaster Driver { get; set; }

        public bool IsPrimary { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }
    }
}
