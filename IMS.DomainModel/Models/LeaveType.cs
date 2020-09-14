using IMS.DomainModel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class LeaveType : BaseModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public double NumberOfAllowedLeave { get; set; }

        public LeaveAssignedTypeEnum LeaveAssignedTypeEnum { get; set; }

        public string Description { get; set; }

        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        public virtual ICollection<LeaveAssignedTo> LeaveAssignedTos { get; set; }

        [NotMapped]
        public string LeaveAssignedTypeEnumDescription { get; set; }
    }
}
