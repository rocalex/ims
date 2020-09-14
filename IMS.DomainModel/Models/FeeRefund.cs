using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class FeeRefund : BaseModel
    {
        [Required]
        public string RefundNumber { get; set; }

        [Required]
        public string ChallanNumber { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public DateTime RefundDate { get; set; }

        [Required]
        public string IssuedById { get; set; }
        [ForeignKey("IssuedById")]
        public virtual ApplicationUser IssuedBy { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public string ChequeNumber { get; set; }

        public DateTime ChequeDate { get; set; }

        [Required]
        public string BankName { get; set; }

        public string Remark { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
