using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Inventory.Location
{
    public class AddLocation
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Alias { get; set; }

        public bool Status { get; set; }
        public bool IsParent { get; set; }

        public int BillingAddressId { get; set; }

        public int ShippingAddressId { get; set; }
    }
}
