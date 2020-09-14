using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Contracts;

namespace IMS.DomainModel.Models
{
    public class DailyExpense
    {
        public int Id { get; set; }

        [Required]
        public int MessManageId { get; set; }
        [ForeignKey("MessManageId")]
        public virtual MessManage MessManage { get; set; }

        [Required]
        public int ExpenseTypeId { get; set; }
        [ForeignKey("ExpenseTypeId")]
        public virtual ExpenseType ExpenseType { get; set; }

        public DateTime Date { get; set; }
        public string BillNo { get; set; }
        public string Particulars { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public string ProofUrl { get; set; }

        public int InstituteId { get; set; }
    }
}
