using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
	public class StudentAward : BaseModel
	{
		[Required]
		public string AwardName { get; set; }

		[Required]
		public string InstituteName { get; set; }

		public int StudentId { get; set; }
		[ForeignKey("StudentId")]
		public virtual StudentBasicInformation Student { get; set; }
	}
}
