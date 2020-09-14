using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class TimeTable : BaseModel
    {
        [Required]
        public int ClassId { get; set; }

        [Required]
        public int SectionId { get; set; }

        [Required]
        public int AcademicYearId { get; set; }

        [Required]
        public int PeriodCount { get; set; }

        [Required]
        public int PeriodDuration { get; set; }

        [Required]
        public string PeriodStartTime { get; set; }

        [Required]
        public int BreaksCount { get; set; }

        [Required]
        public int InstituteId { get; set; }

        #region Navigational properties

        [ForeignKey("ClassId")]
        public virtual InstituteClass Class { get; set; }

        [ForeignKey("SectionId")]
        public virtual Section Section { get; set; }

        [ForeignKey("AcademicYearId")]
        public virtual InstituteAcademicYear AcademicYear { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        #endregion
    }
}
