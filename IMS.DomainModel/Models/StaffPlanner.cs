using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StaffPlanner : BaseModel
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime DateOfPlan { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public int StaffId { get; set; }

        [Required]
        public int InstituteId { get; set; }

        #region Navigational properties

        [ForeignKey("StaffId")]
        public virtual StaffBasicPersonalInformation Staff { get; set; }

        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public virtual ICollection<PlannerAttendeeMapping> PlannerAttendeeMappings { get; set; }

        #endregion
    }
}