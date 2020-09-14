using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StaffExperienceMapping : BaseModel
    {
        [Required]
        public string InstituteName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int StaffId { get; set; }
        [ForeignKey("StaffId")]
        public virtual StaffBasicPersonalInformation Staff { get; set; }
    }
}
