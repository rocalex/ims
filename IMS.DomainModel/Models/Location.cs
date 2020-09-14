using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.Models
{
    public class Location
    {
        public int Id { get; set; }
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Alias { get; set; }

        public bool Status { get; set; }
        public bool IsParent { get; set; }

        public int? BillingAddressId { get; set; }
        [ForeignKey("BillingAddressId")]
        public virtual LocationAddressModel BillingAddress { get; set; }

        public int? ShippingAddressId { get; set; }
        [ForeignKey("ShippingAddressId")]
        public virtual LocationAddressModel ShippingAddress { get; set; }

        public int InstituteId { get; set; }
    }
}
