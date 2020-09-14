using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
	public class StudentSport : BaseModel
	{
		public int SportId { get; set; }
		[ForeignKey("SportId")]
		public virtual SportDetail Sport { get; set; }

		public int LevelId { get; set; }
		[ForeignKey("LevelId")]
		public virtual Level Level { get; set; }

		public int StudentId { get; set; }
		[ForeignKey("StudentId")]
		public virtual StudentBasicInformation Student { get; set; }
	}
}
