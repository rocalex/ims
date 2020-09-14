using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.StudentManagement
{
	public class AddStudentAwardAc
	{
		[Required]
		public string AwardName { get; set; }

		[Required]
		public string InstituteName { get; set; }
	}
}
