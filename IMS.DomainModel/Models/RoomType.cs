using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.Models
{
    public class RoomType : BaseModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
        public int InstituteId { get; set; }
    }
}
