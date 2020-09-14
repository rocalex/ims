using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.ApplicationClasses.Hostel.DailyExpenseManagement
{
    public class SearchDailyExpenseRequest
    {
        [Required]
        public int MessManageId { get; set; }

        [Required]
        public int ExpenseTypeId { get; set; }
    }
}
