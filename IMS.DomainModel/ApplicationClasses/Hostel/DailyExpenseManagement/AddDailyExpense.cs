using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.ApplicationClasses.Hostel.DailyExpenseManagement
{
    public class AddDailyExpense
    {
        [Required]
        public int MessManageId { get; set; }

        [Required]
        public int ExpenseTypeId { get; set; }

        public DateTime Date { get; set; }
        public string BillNo { get; set; }
        public string Particulars { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public string ProofUrl { get; set; }
    }
}
