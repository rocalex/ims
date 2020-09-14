using IMS.DomainModel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class CircularNotice : BaseModel
    {
        [Required]
        public DateTime NoticeDate { get; set; }

        [Required]
        public NoticeToEnum NoticeTo { get; set; }

        [Required]
        public NoticeTypeEnum NoticeType { get; set; }

        public string Message { get; set; }

        public string Description { get; set; }

        [Required]
        public string CreatedById { get; set; }

        public string UpdatedById { get; set; }

        [Required]
        public int InstituteId { get; set; }

        #region Navigation Properties

        [ForeignKey("CreatedById")]
        public virtual ApplicationUser CreatedBy { get; set; }

        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public virtual ICollection<CircularNoticeRecipient> CircularNoticeRecipients { get; set; }

        #endregion
    }
}
