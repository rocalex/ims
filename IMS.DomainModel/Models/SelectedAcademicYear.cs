using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class SelectedAcademicYear : BaseModel
    {
        public int AcademicYearId { get; set; }
        [ForeignKey("AcademicYearId")]
        public virtual InstituteAcademicYear AcademicYear { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
    }
}
