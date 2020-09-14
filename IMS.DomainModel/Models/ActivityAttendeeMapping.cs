using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class ActivityAttendeeMapping : BaseModel
    {
        [Required]
        public int ActivityId { get; set; }

        [Required]
        public string AttendeeId { get; set; }

        [Required]
        public ActivityAttendeeTypeEnum ActivityAttendeeType { get; set; }

        #region Navigational properties

        [ForeignKey("ActivityId")]
        public virtual StaffActivity Activity { get; set; }

        [ForeignKey("AttendeeId")]
        public virtual ApplicationUser Attendee { get; set; }

        #endregion
    }
}
