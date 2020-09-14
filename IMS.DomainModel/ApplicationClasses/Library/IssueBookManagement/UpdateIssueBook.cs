using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.ApplicationClasses.Library.IssueBookManagement
{
    public class UpdateIssueBook
    {
        public int Id { get; set; }

        [Required]
        public int UserType { get; set; }

        public int? StudentId { get; set; }

        public int? StaffId { get; set; }

        [Required]
        public int BookId { get; set; }

        [Required]
        public DateTime IssueDate { get; set; }

        [Required]
        public string RefNo { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int InstituteId { get; set; }
    }
}
