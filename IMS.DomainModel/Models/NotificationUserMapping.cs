using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class NotificationUserMapping : BaseModel
    {
        [Required]
        public int NotificationId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public bool IsNotificationRead { get; set; }

        #region Navigational properties

        [ForeignKey("NotificationId")]
        public virtual Notification Notification { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser NotificationToUser { get; set; }

        #endregion
    }
}
