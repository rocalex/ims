using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Payroll.ComponentGroupManagement
{
    public class UpdateComponentGroupAc
    {
        [Required]
        public string Name { get; set; }

        public int Id { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
