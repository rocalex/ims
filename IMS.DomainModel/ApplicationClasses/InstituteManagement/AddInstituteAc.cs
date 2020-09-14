using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.InstituteManagement
{
    public class AddInstituteAc
    {
        public AddInstituteAc()
        {
            Bcc = new List<string>();
            Cc = new List<string>();
            Users = new List<string>();
        }
        [Required]
        public string InstituteName { get; set; }

        [Required]
        public string InstituteAdminEmail { get; set; }

        public List<string> Bcc { get; set; }

        public List<string> Cc { get; set; }

        [Required]
        public string Code { get; set; }

        public string Address { get; set; }

        public string Location { get; set; }

        public List<string> Users { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }
    }
}
