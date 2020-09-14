using System;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.FeeReceiptManagement
{
    public class AddFeeReceiptManagementAc
    {
        public AddFeeReceiptManagementAc()
        {
            FeeReceiptComponents = new List<FeeReceiptComponents>();
        }
        public int StudentId { get; set; }

        public string ReceiptNumber { get; set; }

        public string ChallanNumber { get; set; }

        public DateTime ReceiptDate { get; set; }

        public string ReceiptType { get; set; }

        public string ChequeNumber { get; set; }

        public DateTime? ChequeDate { get; set; }

        public string BankName { get; set; }

        public double Amount { get; set; }

        public double LateFee { get; set; }

        public double PreviousAmountPaid { get; set; }

        public double Total { get; set; }

        public bool IsNewAdmission { get; set; }

        public int ClassId { get; set; }

        public List<FeeReceiptComponents> FeeReceiptComponents { get; set; }

        public int Term { get; set; }
    }

    public class FeeReceiptComponents
    {
        public string Name { get; set; }

        public double Amount { get; set; }
    }
}
