using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class FeeReceiptComponent : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public double Amount { get; set; }

        public int OrderId { get; set; }

        public int FeeReciptId { get; set; }
        [ForeignKey("FeeReciptId")]
        public virtual FeeReceipt FeeReceipt { get; set; }
    }
}
