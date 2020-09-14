using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class CourseFeeTerm : BaseModel
    {
        [Required]
        public int ClassId { get; set; }

        [Required]
        public int AcademicYearId { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public double LateFee { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public int ReligionId { get; set; }

        [Required]
        public int InstituteId { get; set; }

        #region Navigational properties

        [ForeignKey("ClassId")]
        public virtual InstituteClass InstituteClass { get; set; }

        [ForeignKey("AcademicYearId")]
        public virtual InstituteAcademicYear AcademicYear { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        [ForeignKey("ReligionId")]
        public virtual Religion Religion { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        #endregion
    }
}
