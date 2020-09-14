using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum AutoSequenceGeneratorTypeEnum
    {
        [Description("Roll Number")]
        RollNumber,
        [Description("Employee Id")]
        EmployeeId,
        [Description("Refund Number")]
        RefundNumber,
        [Description("Receipt Number")]
        ReceiptNumber,
        [Description("Chart of Accounts Code")]
        ChartOfAccountsCode
    }
}
