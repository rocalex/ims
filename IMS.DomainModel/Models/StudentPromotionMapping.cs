using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentPromotionMapping : BaseModel
    {
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public int CurrentClassId { get; set; }
        [ForeignKey("CurrentClassId")]
        public virtual InstituteClass CurrentClass { get; set; }

        public int CurrentSectionId { get; set; }
        [ForeignKey("CurrentSectionId")]
        public virtual Section CurrentSection { get; set; }

        public int PromotedToClassId { get; set; }
        [ForeignKey("PromotedToClassId")]
        public virtual InstituteClass PromotedToClass { get; set; }

        public int PromotedToSectionId { get; set; }
        [ForeignKey("PromotedToSectionId")]
        public virtual Section PromotedToSection { get; set; }

        public string Remark { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
