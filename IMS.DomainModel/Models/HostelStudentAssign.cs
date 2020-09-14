using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class HostelStudentAssign
    {
        public int Id { get; set; }

        public int HostelId { get; set; }
        [ForeignKey("HostelId")]
        public virtual Hostel Hostel { get; set; }

        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }
    }
}
