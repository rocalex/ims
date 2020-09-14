using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class PayrollComponent
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string ShortName { get; set; }

        [Required]
        public string SequenceNo { get; set; }

        [Required]
        public int GroupId { get; set; }
        [ForeignKey("GroupId")]
        public virtual ComponentGroup Group { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool Status { get; set; }
        public string Description { get; set; }

        public bool IsPayslip { get; set; }
        public bool IsBasic { get; set; }
        public bool Others { get; set; }

        [Required]
        public int InstituteId { get; set; }
    }
}
