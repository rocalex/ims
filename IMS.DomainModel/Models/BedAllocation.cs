using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;
using System.Text;

namespace IMS.DomainModel.Models
{
    public class BedAllocation
    {
        public int Id { get; set; }

        public int BedId { get; set; }
        [ForeignKey("BedId")]
        public virtual Bed Bed { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public int Status { get; set; }

        public int InstituteId { get; set; }
    }
}
