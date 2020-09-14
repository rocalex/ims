using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.ApplicationClasses.Hostel.MessManagement
{
    public class AddMessManage
    {
        [Required]
        public int HostelId { get; set; }

        [Required]
        public DateTime FromDate { get; set; }
        [Required]
        public DateTime ToDate { get; set; }

        [Required]
        public int StudentId { get; set; }

        [Required]
        public string CardNumber { get; set; }

        [Required]
        public string Duration { get; set; }
    }
}
