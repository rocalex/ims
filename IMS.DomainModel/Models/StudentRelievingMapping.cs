using IMS.DomainModel.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentRelievingMapping : BaseModel
    {
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public StudentRelievingEnum StudentRelieving { get; set; }

        public string Reason { get; set; }

        public DateTime RelievingDate { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }

        [NotMapped]
        public string StudentRelievingDescription { get; set; }
    }
}
