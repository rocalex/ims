using IMS.DomainModel.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Notification : BaseModel
    {
        [Required]
        public string NotificationMessage { get; set; }

        public string NotificationDetails { get; set; }

        [Required]
        public string CreatedById { get; set; }

        [Required]
        public int InstituteId { get; set; }

        #region Navigation Properties

        [ForeignKey("CreatedById")]
        public virtual ApplicationUser CreatedBy { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public virtual ICollection<NotificationUserMapping> NotificationUserMappings { get; set; }

        #endregion
    }
}
