using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class AddStaffExperienceMappingAc
    {
        [Required]
        public string InstituteName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
