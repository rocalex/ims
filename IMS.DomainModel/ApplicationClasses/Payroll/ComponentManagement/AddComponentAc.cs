using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Payroll.ComponentManagement
{
    public class AddComponentAc
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string ShortName { get; set; }

        [Required]
        public string SequenceNo { get; set; }

        [Required]
        public int GroupId { get; set; }

        public bool Status { get; set; }
        public string Description { get; set; }

        public bool IsPayslip { get; set; }
        public bool IsBasic { get; set; }
        public bool Others { get; set; }
    }
}
