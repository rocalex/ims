using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class AutoSequenceGeneratorDataType : BaseModel
    {
        [Required]
        public string Name { get; set; }

        public bool IsSelected { get; set; }

        public int OrderId { get; set; }

        public int Length { get; set; }

        public int AutoSequenceGeneratorId { get; set; }
        [ForeignKey("AutoSequenceGeneratorId")]
        public virtual AutoSequenceGenerator AutoSequenceGenerator { get; set; }
    }
}
