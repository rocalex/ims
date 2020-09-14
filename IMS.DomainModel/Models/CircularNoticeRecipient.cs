using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class CircularNoticeRecipient : BaseModel
    {
        [Required]
        public int CircularNoticeId { get; set; }

        [Required]
        public string RecipientId { get; set; }

        [Required]
        public NoticeToEnum RecipientType { get; set; }

        #region Navigational properties

        [ForeignKey("CircularNoticeId")]
        public virtual CircularNotice CircularNotice { get; set; }

        [ForeignKey("RecipientId")]
        public virtual ApplicationUser Recipient { get; set; }

        #endregion
    }
}
