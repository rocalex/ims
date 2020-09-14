using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentFeeComponent : BaseModel
    {
        public int StudentFeeId { get; set; }
        [ForeignKey("StudentFeeId")]
        public virtual StudentFee StudentFee { get; set; }

        public int IndividualOrDiscountFeeComponentId { get; set; }
        [ForeignKey("IndividualOrDiscountFeeComponentId")]
        public virtual FeeComponent IndividualOrDiscountFeeComponent { get; set; }

        public int TermOrderId { get; set; }

        [Required]
        public double Amount { get; set; }
    }
}
