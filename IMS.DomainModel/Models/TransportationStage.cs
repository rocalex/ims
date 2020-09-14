using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class TransportationStage : BaseModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public string Address { get; set; }

        public int SlabId { get; set; }
        [ForeignKey("SlabId")]
        public virtual Slab Slab { get; set; }

        public double Term1 { get; set; }

        public double Term2 { get; set; }

        public double Term3 { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }

        [Required]
        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
