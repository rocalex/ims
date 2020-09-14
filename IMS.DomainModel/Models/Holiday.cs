using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Holiday : BaseModel
    {
        [Required]
        public int InstitutionId { get; set; }

        [Required]
        public int AcademicYearId { get; set; }

        public int? CompanyWbs { get; set; }

        public HolidayOccuranceTypeEnum OccuranceType { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime HolidayDate { get; set; }

        public DateTime? HolidayToDate { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public string UpdatedBy { get; set; }

        #region Navigational properties

        [ForeignKey("AcademicYearId")]
        public virtual Institute AcademicYear { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        #endregion
    }
}
