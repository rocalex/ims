namespace IMS.DomainModel.ApplicationClasses.FeeRefundManagement
{
    public class FeeRefundManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public FeeRefundManagementErrorType ErrorType { get; set; }
    }

    public enum FeeRefundManagementErrorType
    {
        StudentId,
        IssuedById,
        RefundNumber,
        ChallanNumber,
        ChequeNumber,
        BankName,
        Amount,
        Id
    }
}
