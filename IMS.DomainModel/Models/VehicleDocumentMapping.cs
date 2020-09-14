using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class VehicleDocumentMapping : BaseModel
    {
        [Required]
        public string FileUrl { get; set; }

        public string Name { get; set; }

        public DateTime? ExpiredDate { get; set; }

        public string MetaData { get; set; }

        public FileTypeEnum FileType { get; set; }

        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual VehicleMaster Vehicle { get; set; }
    }
}
