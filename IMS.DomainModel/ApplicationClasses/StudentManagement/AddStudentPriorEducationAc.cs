using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.StudentManagement
{
	public class AddStudentPriorEducationAc
	{
		[Required]
		public string InstituteName { get; set; }

		public DateTime FromDate { get; set; }

		public DateTime ToDate { get; set; }
	}
}
