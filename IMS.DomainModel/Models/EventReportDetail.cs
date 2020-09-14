using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class EventReportDetail : BaseModel
    {
        [Required]
        public TemplateFormatEnum TemplateFormat { get; set; }

        public string To { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }

        [Required]
        public DateTime SentOn { get; set; }

        [Required]
        public int InstituteId { get; set; }

        #region Navigational properties

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        #endregion
    }
}
