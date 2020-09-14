using IMS.DomainModel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class AutoSequenceGenerator : BaseModel
    {
        public AutoSequenceGeneratorTypeEnum AutoSequenceGeneratorType { get; set; }

        public AutoSequenceGeneratorSeperatorEnum Seperator { get; set; }

        public string CustomText { get; set; }

        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public string CreatedById { get; set; }
        [ForeignKey("CreatedById")]
        public virtual ApplicationUser CreatedBy { get; set; }

        public string UpdateById { get; set; }
        [ForeignKey("UpdateById")]
        public virtual ApplicationUser UpdateBy { get; set; }

        public DateTime UpdateDate { get; set; }

        [NotMapped]
        public string SeperatorDescription { get; set; }

        public virtual ICollection<AutoSequenceGeneratorDataType> AutoSequenceGeneratorDataTypes { get; set; }
    }
}
