using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentNotificationDetails : BaseModel
    {
        [Required]
        public int StudentId { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        [Required]
        public TemplateFormatEnum NotificationType { get; set; }

        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }

        public string SentBy { get; set; }

        public int InstituteId { get; set; }

        public DateTime SentAt { get; set; }

        #region Navigational properties

        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        [ForeignKey("SentBy")]
        public virtual ApplicationUser SentByUser { get; set; }

        #endregion
    }
}
