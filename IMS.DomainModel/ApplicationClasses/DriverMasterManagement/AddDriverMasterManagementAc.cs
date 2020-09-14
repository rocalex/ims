using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.DriverMasterManagement
{
    public class AddDriverMasterManagementAc
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public double Salary { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string MobileNumber { get; set; }

        public bool IsDriver { get; set; }

        public string Address { get; set; }

        [Required]
        public string LicenseNumber { get; set; }

        [Required]
        public string LicenseType { get; set; }

        [Required]
        public DateTime DateOfIssue { get; set; }

        [Required]
        public string PlaceOfIssue { get; set; }

        [Required]
        public DateTime ValidityTill { get; set; }

        [Required]
        public string IssuingAuthority { get; set; }
    }
}
