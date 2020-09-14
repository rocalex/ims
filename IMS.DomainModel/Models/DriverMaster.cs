using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class DriverMaster : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public double Salary { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string MobileNumber { get; set; }

        public bool IsDriver { get; set; }

        public string Address { get; set; }

        [Required]
        public string LicenseNumber { get; set; }

        [Required]
        public string LicenseType { get; set; }

        [Required]
        public DateTime DateOfIssue { get; set; }

        [Required]
        public string PlaceOfIssue { get; set; }

        [Required]
        public DateTime ValidityTill { get; set; }

        [Required]
        public string IssuingAuthority { get; set; }

        public string LicensePhoto { get; set; }

        [Required]
        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
    }
}
