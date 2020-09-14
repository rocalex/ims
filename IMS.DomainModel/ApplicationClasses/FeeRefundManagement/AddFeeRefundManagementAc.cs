using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.FeeRefundManagement
{
    public class AddFeeRefundManagementAc
    {
        [Required]
        public string RefundNumber { get; set; }

        [Required]
        public string ChallanNumber { get; set; }

        public int StudentId { get; set; }

        public DateTime RefundDate { get; set; }

        [Required]
        public string IssuedById { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public string ChequeNumber { get; set; }

        public DateTime ChequeDate { get; set; }

        [Required]
        public string BankName { get; set; }

        public string Remark { get; set; }
    }
}
