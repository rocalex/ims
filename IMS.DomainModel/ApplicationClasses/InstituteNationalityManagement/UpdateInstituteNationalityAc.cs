using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteNationalityManagement
{
    public class UpdateInstituteNationalityAc
    {
        [Required]
        public string Name { get; set; }

        public int NationalityId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
