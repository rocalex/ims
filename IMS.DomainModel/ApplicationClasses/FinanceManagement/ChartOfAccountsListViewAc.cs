using IMS.DomainModel.Enums;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.FinanceManagement
{
    public class ChartOfAccountsListViewAC
    {
        public ChartOfAccountTypeEnum ChartOfAccountTypeEnum { get; set; }

        public string ChartOfAccountTypeEnumString { get; set; }

        public List<ChartOfAccountsAC> ParentChartOfAccounts { get; set; }
    }
}
