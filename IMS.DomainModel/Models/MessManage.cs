using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class MessManage
    {
        public int Id { get; set; }

        [Required]
        public int HostelId { get; set; }
        [ForeignKey("HostelId")]
        public virtual Hostel Hostel { get; set; }

        [Required]
        public DateTime FromDate { get; set; }
        [Required]
        public DateTime ToDate { get; set; }

        public string Name { get; set; }

        public int InstituteId { get; set; }
    }
}
