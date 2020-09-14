using IMS.DomainModel.Enums;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.FinanceManagement
{
    public class ChartOfAccountsAC
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string AliasName { get; set; }

        public int? ParentGroupId { get; set; }

        public string ParentChartOfAccountName { get; set; }

        public bool IsActive { get; set; }

        public bool IsParent { get; set; }
        
        public ChartOfAccountTypeEnum AccountType { get; set; }

        public string AccountTypeName { get; set; }

        public string Description { get; set; }

        public string CreatedBy { get; set; }

        public int InstituteId { get; set; }

        public List<ChartOfAccountsAC> ChildChartOfAccounts { get; set; }
    }
}
