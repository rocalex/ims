using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class IssueBook
    {
        public int Id { get; set; }

        [Required]
        public int UserType { get; set; }

        public int? StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public int? StaffId { get; set; }
        [ForeignKey("StaffId")]
        public virtual StaffBasicPersonalInformation Staff { get; set; }

        [Required]
        public int BookId { get; set; }
        [ForeignKey("BookId")]
        public virtual Book Book { get; set; }

        [Required]
        public DateTime IssueDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public int Fine { get; set; }

        [Required]
        public string RefNo { get; set; }

        [Required]
        public string Description { get; set; }

        public int Status { get; set; }

        [Required]
        public int InstituteId { get; set; }
    }
}
