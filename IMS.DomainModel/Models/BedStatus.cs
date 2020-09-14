using System.ComponentModel.DataAnnotations;
using System.Data;

namespace IMS.DomainModel.Models
{
    public class BedStatus : BaseModel
    {
        [Required]
        public string Name { get; set; }

        public int InstituteId { get; set; }
    }
}
