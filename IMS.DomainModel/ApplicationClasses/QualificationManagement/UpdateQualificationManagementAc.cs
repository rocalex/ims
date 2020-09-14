using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.QualificationManagement
{
    public class UpdateQualificationManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int QualificationId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
