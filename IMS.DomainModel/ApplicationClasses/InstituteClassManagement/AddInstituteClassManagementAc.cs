using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteClassManagement
{
    public class AddInstituteClassManagementAc
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

        public int ClassTeacherId { get; set; }
    }
}
