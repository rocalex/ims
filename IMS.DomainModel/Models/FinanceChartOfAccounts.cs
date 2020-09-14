using IMS.DomainModel.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class FinanceChartOfAccounts : BaseModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string AliasName { get; set; }

        public int? ParentGroupId { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public bool IsParent { get; set; }

        [Required]
        public ChartOfAccountTypeEnum AccountType { get; set; }

        public string Description { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public int InstituteId { get; set; }

        #region Navigational properties

        [ForeignKey("ParentGroupId")]
        public virtual FinanceChartOfAccounts ParentChartOfAccount { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public virtual ICollection<FinanceChartOfAccounts> ChildChartOfAccounts { get; set; }

        #endregion
    }
}
