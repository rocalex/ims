using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Designation : BaseModel
    {
        [Required]
        public string DesignationName { get; set; }

        [Required]
        public string Code { get; set; }

        public string Description { get; set; }

        public int InstituteId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        [ForeignKey("UpdatedBy")]
        public virtual ApplicationUser UpdatedByuser { get; set; }
    }
}
