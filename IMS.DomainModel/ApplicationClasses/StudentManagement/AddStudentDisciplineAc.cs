using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.StudentManagement
{
	public class AddStudentDisciplineAc
	{
        public int StatusId { get; set; }

        [Required]
        public string Subject { get; set; }

        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        public string Remarks { get; set; }
    }
}
