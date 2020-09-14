using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class TimeTableBreakDetails : BaseModel
    {
        [Required]
        public int TimeTableId { get; set; }

        [Required]
        public int BreakDuration { get; set; }

        [Required]
        public int BreakAfterPeriod { get; set; }

        #region Navigational properties

        [ForeignKey("TimeTableId")]
        public virtual TimeTable TimeTable { get; set; }

        #endregion
    }
}
