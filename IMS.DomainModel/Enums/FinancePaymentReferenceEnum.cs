using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum FinancePaymentReferenceEnum
    {
        [Description("Breakdown")]
        Breakdown,

        [Description("Accident")]
        Accident,

        [Description("Repair")]
        Repair,

        [Description("Maintenance")]
        Maintenance,

        [Description("Purchase Indent")]
        PurchaseIndent
    }
}
