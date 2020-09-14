using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class UserGroupFeature : BaseModel
    {
        public bool CanView { get; set; }

        public bool CanAdd { get; set; }

        public bool CanEdit { get; set; }

        public bool CanDelete { get; set; }

        public int UserGroupId { get; set; }
        [ForeignKey("UserGroupId")]
        public virtual UserGroup UserGroup { get; set; }

        public UserGroupFeatureParentEnum UserGroupFeatureParent { get; set; }

        public UserGroupFeatureChildEnum UserGroupFeatureChild { get; set; }

        [NotMapped]
        public string UserGroupFeatureChildDescription { get; set; }

        [NotMapped]
        public string UserGroupFeatureParentDescription { get; set; }
    }
}
