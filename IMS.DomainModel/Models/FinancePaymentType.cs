using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class FinancePaymentType : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }

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
