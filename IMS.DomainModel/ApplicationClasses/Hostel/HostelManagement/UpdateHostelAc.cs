using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Hostel.HostelManagement
{
    public class UpdateHostelAc
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public int HostelType { get; set; }

        public string ContactPerson { get; set; }
        public string ContactMobile { get; set; }

        [Required]
        public int CountryId { get; set; }

        [Required]
        public int StateId { get; set; }

        [Required]
        public int CityId { get; set; }

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
        [Required]
        public int[] AssignMembers { get; set; }
    }
}
