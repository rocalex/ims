using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.SportDetailManagement
{
    public class UpdateSportDetailManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int SportDetailId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
