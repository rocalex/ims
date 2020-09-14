using IMS.DomainModel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class FeeReceipt : BaseModel
    {
        [Required]
        public string ReceiptNumber { get; set; }

        public DateTime ReceiptDate { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public ReceiptTypeEnum ReceiptType { get; set; }

        [Required]
        public string ChallanNumber { get; set; }

        public string ChequeNumber { get; set; }

        public DateTime? ChequeDate { get; set; }

        public string BankName { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public double LateFee { get; set; }

        [Required]
        public double PreviousAmountPaid { get; set; }

        [Required]
        public double Total { get; set; }

        public int ClassId { get; set; }
        [ForeignKey("ClassId")]
        public virtual InstituteClass Class { get; set; }

        public bool IsNewAdmission { get; set; }

        public ICollection<FeeReceiptComponent> FeeReceiptComponents { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        [NotMapped]
        public string ReceiptTypeDescription { get; set; }

        public int Term { get; set; }
    }
}
