using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class FinancePayment : BaseModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }

        [Required]
        public int PaymentTypeId { get; set; }

        [Required]
        public FinancePaymentReferenceEnum PaymentReference { get; set; }

        public string ReferenceCode { get; set; }

        public DateTime? ReferenceDate { get; set; }

        [Required]
        public string PaymentById { get; set; }

        [Required]
        public int PaidToId { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public int InstituteId { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        #region Navigational properties

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        [ForeignKey("PaymentById")]
        public virtual ApplicationUser PaymentByUser { get; set; }

        [ForeignKey("PaidToId")]
        public virtual FinanceChartOfAccounts PaidToChartOfAccounts { get; set; }

        [ForeignKey("PaymentTypeId")]
        public virtual FinancePaymentType FinancePaymentType { get; set; }

        #endregion
    }
}
