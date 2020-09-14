namespace IMS.DomainModel.ApplicationClasses.FeeReceiptManagement
{
    public class FeeReceiptManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public FeeReceiptManagementType ErrorType { get; set; }

        public int OrderId { get; set; }
    }

    public enum FeeReceiptManagementType
    {
        ReceiptNumber,
        ChallanNumber,
        StudentId
    }
}
