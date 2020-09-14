using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class CourseFeeTermDetails : BaseModel
    {
        [Required]
        public int CourseFeeTermId { get; set; }

        [Required]
        public int FeeComponentId { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public int Term { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        #region Navigational properties

        [ForeignKey("CourseFeeTermId")]
        public virtual CourseFeeTerm CourseFeeTerm { get; set; }

        [ForeignKey("FeeComponentId")]
        public virtual FeeComponent FeeComponent { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual ApplicationUser CreatedByUser { get; set; }

        #endregion
    }
}
