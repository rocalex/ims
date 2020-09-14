using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.Models
{
    public class Timesheet
    {
        public int Id { get; set; }

        [Required]
        public int StaffId { get; set; }
        [ForeignKey("StaffId")]
        public virtual StaffBasicPersonalInformation Staff { get; set; }

        [Required]
        public DateTime PresenceDate { get; set; }
        [Required]
        public int PresenceType { get; set; }

        public int InstituteId { get; set; }
    }
}
