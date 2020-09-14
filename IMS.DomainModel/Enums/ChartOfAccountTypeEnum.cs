using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum ChartOfAccountTypeEnum
    {
        [Description("Assets")]
        Assets,

        [Description("Liabilities")]
        Liabilities,

        [Description("Income")]
        Income,

        [Description("Expense")]
        Expense
    }
}
