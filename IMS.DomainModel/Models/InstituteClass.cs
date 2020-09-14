using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class InstituteClass : BaseModel
    {
        [Required]
        public string GroupCode { get; set; }

        [Required]
        public string Name { get; set; }

        public InstituteClassDurationUnitEnum DurationUnit { get; set; }

        public double Duration { get; set; }

        public bool IsGroup { get; set; }

        public int ClassOrder { get; set; }

        public int NumberOfFeeTerms { get; set; }

        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public int? ClassTeacherId { get; set; }
        [ForeignKey("ClassTeacherId")]
        public virtual StaffBasicPersonalInformation ClassTeacher { get; set; }
    }
}
