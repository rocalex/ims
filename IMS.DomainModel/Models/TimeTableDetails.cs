using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class TimeTableDetails : BaseModel
    {
        [Required]
        public int TimeTableId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Required]
        public WeekDaysEnum WeekDaysEnum { get; set; }

        [Required]
        public int PeriodNumber { get; set; }

        #region Navigational properties

        [ForeignKey("TimeTableId")]
        public virtual TimeTable TimeTable { get; set; }

        [ForeignKey("SubjectId")]
        public virtual InstituteSubject Subject { get; set; }

        #endregion
    }
}
