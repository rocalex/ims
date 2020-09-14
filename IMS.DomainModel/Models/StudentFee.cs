using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentFee : BaseModel
    {
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public virtual StudentBasicInformation Student { get; set; }

        public int ClassId { get; set; }
        [ForeignKey("ClassId")]
        public virtual InstituteClass Class { get; set; }

        public virtual ICollection<StudentFeeComponent> StudentFeeComponents { get; set; }

        public string UpdatedById { get; set; }
        [ForeignKey("UpdatedById")]
        public virtual ApplicationUser UpdatedBy { get; set; }

        public DateTime UpdatedOn { get; set; }
    }
}
