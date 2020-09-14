using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Hostel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public int HostelType { get; set; }

        public DateTime CreatedOn { get; set; }
        
        public string ContactPerson { get; set; }
        public string ContactMobile { get; set; }

        [Required]
        public int CountryId { get; set; }

        [Required]
        public int StateId { get; set; }

        [Required]
        public int CityId { get; set; }
        [ForeignKey("CityId")]
        public virtual AdministrationCity City { get; set; }

        public string ZipCode { get; set; }

        [Required]
        public string Address1 { get; set; }

        public string Address2 { get; set; }
        public int HostelCautionDeposit { get; set; }
        public bool Status { get; set; }

        [Required]
        public string PlaceName { get; set; }

        [Required]
        public int InstituteId { get; set; }
    }
}
