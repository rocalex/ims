using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class FinanceReceipt : BaseModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public DateTime ReceiptDate { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public int ReceivedFrom { get; set; }

        [Required]
        public string ReceivedBy { get; set; }

        public string Remarks { get; set; }

        [Required]
        public int InstituteId { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        #region Navigational properties

        [ForeignKey("ReceivedFrom")]
        public virtual FinanceChartOfAccounts ReceivedFromChartOfAccount { get; set; }

        [ForeignKey("ReceivedBy")]
        public virtual ApplicationUser ReceivedByUser { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        #endregion
    }
}
