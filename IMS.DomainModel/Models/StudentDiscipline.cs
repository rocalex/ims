using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
	public class StudentDiscipline : BaseModel
	{
		public DateTime DisciplineDate { get; set; }

		[Required]
		public string Descriptiom { get; set; }

		public int StudentId { get; set; }
		[ForeignKey("StudentId")]
		public virtual StudentBasicInformation Student { get; set; }
	}
}
