using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class EventInfo : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime EventDate { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public EventManagementInfoPriorityEnum Priority { get; set; }

        [Required]
        public int InstituteId { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        #region Navigational properties

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        #endregion
    }
}
