using IMS.DomainModel.Models;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.FinanceManagement
{
    public class AddUpdateFinanceChartOfAccountsAC
    {
        public List<FinanceChartOfAccounts> AddedChartOfAccountsList { get; set; }

        public List<FinanceChartOfAccounts> UpdatedChartOfAccountsList { get; set; }
    }
}
