using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
	public class StudentPriorEducation : BaseModel
	{
		[Required]
		public string InstituteName { get; set; }

		public DateTime FromDate { get; set; }

		public DateTime ToDate { get; set; }

		public int StudentId { get; set; }
		[ForeignKey("StudentId")]
		public virtual StudentBasicInformation Student { get; set; }
	}
}
