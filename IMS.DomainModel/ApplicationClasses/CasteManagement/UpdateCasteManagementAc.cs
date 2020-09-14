using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.CasteManagement
{
    public class UpdateCasteManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int CasteId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
