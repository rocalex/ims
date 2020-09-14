using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class UserGroup : BaseModel
    {
        [MaxLength(25)]
        [Required]
        public string Code { get; set; }

        [MaxLength(50)]
        [Required]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }

        public int? CompanyWbs { get; set; }

        public DateTime? LastUpdatedDate { get; set; }

        public string LastUpdatedUserId { get; set; }

        public string CreatedByUserId { get; set; }

        public int InstituteId { get; set; }

        public bool CanDelete { get; set; }

        #region Navigational Properties

        [ForeignKey("CreatedByUserId")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public virtual ICollection<UserGroupFeature> UserGroupFeatures { get; set; }

        #endregion
    }
}
