using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class PlannerAttendeeMapping : BaseModel
    {
        [Required]
        public int PlannerId { get; set; }

        [Required]
        public string AttendeeId { get; set; }

        [Required]
        public ActivityAttendeeTypeEnum ActivityAttendeeType { get; set; }

        #region Navigational properties

        [ForeignKey("PlannerId")]
        public virtual StaffPlanner Planner { get; set; }

        [ForeignKey("AttendeeId")]
        public virtual ApplicationUser Attendee { get; set; }

        #endregion
    }
}
