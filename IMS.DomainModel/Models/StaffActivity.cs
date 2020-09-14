using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StaffActivity : BaseModel
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public int InstituteId { get; set; }

        [Required]
        public int MeetingAgendaId { get; set; }

        [Required]
        public int ActivityStatusId { get; set; }

        public string Location { get; set; }

        [Required]
        public string StartTime { get; set; }

        [Required]
        public string EndTime { get; set; }

        #region Navigational properties

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        [ForeignKey("MeetingAgendaId")]
        public virtual MeetingAgenda MeetingAgenda { get; set; }

        [ForeignKey("ActivityStatusId")]
        public virtual ActivityStatus ActivityStatus { get; set; }

        public virtual ICollection<ActivityAttendeeMapping> ActivityAttendeeMappings { get; set; }

        #endregion
    }
}
