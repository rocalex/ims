using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class InstituteAcademicYear : BaseModel
    {
        [Required]
        public string AcademicYearCode { get; set; }

        [Required]
        [MaxLength(200)]
        public string ChallanStartingNumber { get; set; }

        [Required]
        public DateTime FromDate { get; set; }

        [Required]
        public DateTime ToDate { get; set; }

        [Required]
        public int InstituteId { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public string UpdatedBy { get; set; }

        public int? CompanyWbs { get; set; }

        [Required]
        public bool IsActive { get; set; }

        #region Navigational properties

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        [ForeignKey("CreatedByUserId")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        #endregion
    }
}
